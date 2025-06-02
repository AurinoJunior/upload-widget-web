import { CanceledError } from "axios"
import { create } from "zustand"
import { uploadFileToStorage } from "../http/upload-file-to-storage"

export type Upload = {
  name: string
  file: File
  abortController: AbortController
  status: "progress" | "success" | "error" | "canceled"
  originalSizeInBytes: number
  uploadSizeInBytes: number
}

type UploadState = {
  uploads: Map<string, Upload>
  addUploads: (files: File[]) => void
  cancelUpload: (uploadId: string) => void
}

export const useUploads = create<UploadState>((set, get) => {
  async function processUpload({
    uploadId,
  }: {
    uploadId: string
  }) {
    const { uploads } = get()
    const upload = uploads.get(uploadId)

    if (!upload) return

    try {
      await uploadFileToStorage({
        file: upload.file,
        signal: upload.abortController.signal,
        onProgress(sizeInBytes) {
          set(state => ({
            uploads: new Map(state.uploads).set(uploadId, {
              ...upload,
              uploadSizeInBytes: sizeInBytes,
            }),
          }))
        },
      })

      set(state => ({
        uploads: new Map(state.uploads).set(uploadId, {
          ...upload,
          status: "success",
        }),
      }))
    } catch (error) {
      if (error instanceof CanceledError) {
        set(state => ({
          uploads: new Map(state.uploads).set(uploadId, {
            ...upload,
            status: "canceled",
          }),
        }))
        return
      }

      set(state => ({
        uploads: new Map(state.uploads).set(uploadId, {
          ...upload,
          status: "error",
        }),
      }))
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
