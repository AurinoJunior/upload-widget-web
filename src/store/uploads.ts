import { create } from "zustand"
import { uploadFileToStorage } from "../http/upload-file-to-storage"

type UploadState = {
  uploads: Map<string, File>
  addUploads: (files: File[]) => void
}

async function processUpload({
  uploadId,
  uploads,
}: {
  uploadId: string
  uploads: Map<string, File>
}) {
  const upload = uploads.get(uploadId)

  if (!upload) return

  await uploadFileToStorage({ file: upload })
}

export const useUploads = create<UploadState>((set, get) => ({
  uploads: new Map(),
  addUploads: (files: File[]) => {
    for (const file of files) {
      const uploadId = crypto.randomUUID()

      set(state => {
        return {
          uploads: new Map(state.uploads).set(uploadId, file),
        }
      })

      processUpload({
        uploadId,
        uploads: get().uploads,
      })
    }
  },
}))
