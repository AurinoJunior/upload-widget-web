import { CanceledError } from "axios"
import { create } from "zustand"
import { uploadFileToStorage } from "../http/upload-file-to-storage"
import { compressImage } from "../utils/compressed-image"

export type Upload = {
  name: string
  file: File
  abortController: AbortController
  status: "progress" | "success" | "error" | "canceled"
  originalSizeInBytes: number
  uploadSizeInBytes: number
  compressedSizeInBytes?: number
  remoteUrl?: string
}

type UploadState = {
  uploads: Map<string, Upload>
  addUploads: (files: File[]) => void
  cancelUpload: (uploadId: string) => void
}

export const useUploads = create<UploadState>((set, get) => {
  function updateUpload(uploadId: string, data: Partial<Upload>) {
    const { uploads } = get()
    const upload = uploads.get(uploadId)

    if (!upload) return

    set(state => ({
      uploads: new Map(state.uploads).set(uploadId, {
        ...upload,
        ...data,
      }),
    }))
  }

  async function processUpload({ uploadId }: { uploadId: string }) {
    const { uploads } = get()
    const upload = uploads.get(uploadId)

    if (!upload) return
    try {
      const compressedFile = await compressImage({
        file: upload.file,
        maxWidth: 1000,
        maxHeight: 1000,
        quality: 0.8,
      })

      updateUpload(uploadId, {
        compressedSizeInBytes: compressedFile.size,
      })

      const { url } = await uploadFileToStorage({
        file: compressedFile,
        signal: upload.abortController.signal,
        onProgress(sizeInBytes) {
          updateUpload(uploadId, {
            uploadSizeInBytes: sizeInBytes,
          })
        },
      })

      updateUpload(uploadId, {
        status: "success",
        remoteUrl: url,
      })
    } catch (error) {
      if (error instanceof CanceledError) {
        updateUpload(uploadId, {
          status: "canceled",
        })
        return
      }

      updateUpload(uploadId, {
        status: "error",
      })
    }
  }

  function addUploads(files: File[]) {
    for (const file of files) {
      const uploadId = crypto.randomUUID()

      set(state => ({
        uploads: new Map(state.uploads).set(uploadId, {
          file,
          name: file.name,
          abortController: new AbortController(),
          status: "progress",
          originalSizeInBytes: file.size,
          uploadSizeInBytes: 0,
        }),
      }))

      processUpload({
        uploadId,
      })
    }
  }

  function cancelUpload(uploadId: string) {
    const { uploads } = get()
    const upload = uploads.get(uploadId)

    if (!upload) return

    upload.abortController.abort()
  }

  return {
    uploads: new Map(),
    addUploads,
    cancelUpload,
  }
})
