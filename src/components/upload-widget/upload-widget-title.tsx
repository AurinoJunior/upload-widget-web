import { UploadCloud } from "lucide-react"
import { usePendingUploads } from "../../store/pending-uploads"

export function UploadWidgetTitle() {
  const { globalPercentage, isThereAnyPendingUploads } = usePendingUploads()

  return (
    <div className="flex items-center gap-1.5 text-sm font-medium">
      <UploadCloud className="size-4 text-zinc-400" strokeWidth={1.5} />
      {isThereAnyPendingUploads ? (
        <span className="flex items-baseline gap-1">
          <span className="text-xs text-zinc-400 tabular-nums">
            {globalPercentage}%
          </span>
          uploading...{" "}
        </span>
      ) : (
        <span>Upload files</span>
      )}
    </div>
  )
}
