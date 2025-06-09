import { useShallow } from "zustand/shallow"
import { useUploads } from "./uploads"

export const usePendingUploads = () => {
  return useUploads(
    useShallow(store => {
      const uploadsInProgress = Array.from(store.uploads.values()).filter(
        upload => upload.status === "progress"
      )

      const isThereAnyPendingUploads = uploadsInProgress.length > 0

      if (!isThereAnyPendingUploads) {
        return { isThereAnyPendingUploads, globalPercentage: 100 }
      }

      const { total, uploaded } = uploadsInProgress.reduce(
        (acc, upload) => {
          if (upload.compressedSizeInBytes) {
            acc.uploaded += upload.uploadSizeInBytes
          }

          acc.total +=
            upload.compressedSizeInBytes || upload.originalSizeInBytes

          return acc
        },
        { total: 0, uploaded: 0 }
      )

      const globalPercentage = Math.min(
        Math.round((uploaded * 100) / total),
        100
      )

      return { isThereAnyPendingUploads, globalPercentage }
    })
  )
}
