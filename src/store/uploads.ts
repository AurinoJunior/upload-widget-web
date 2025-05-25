import { create } from "zustand"

type UploadState = {
  uploads: Map<string, File>
  addUploads: (files: File[]) => void
}

export const useUploads = create<UploadState>(set => ({
  uploads: new Map(),
  addUploads: (files: File[]) => {
    for (const file of files) {
      const uploadId = crypto.randomUUID()

      set(state => {
        return {
          uploads: state.uploads.set(uploadId, file),
        }
      })
    }
  },
}))
