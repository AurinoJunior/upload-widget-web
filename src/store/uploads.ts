import { CanceledError } from "axios"
import { create } from "zustand"
import { uploadFileToStorage } from "../http/upload-file-to-storage"

export type Upload = {
  name: string
  file: File
  abortController: AbortController
  status: "progress" | "success" | "error" | "canceled"
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
      })

      set(state => ({
        uploads: new Map(state.uploads).set(uploadId, {
          ...upload,
          status: "success",
        }),
      }))
    } catch (error) {
      if (error instanceof CanceledError) {
        return console.error("Upload cancelado pelo usuário!")
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

    set(state => ({
      uploads: new Map(state.uploads).set(uploadId, {
        ...upload,
        status: "canceled",
      }),
    }))
  }

  return {
    uploads: new Map(),
    addUploads,
    cancelUpload,
  }
})
