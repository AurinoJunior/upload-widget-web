import * as Progress from "@radix-ui/react-progress"

import { Download, ImageUp, RefreshCcw, X } from "lucide-react"
import { type Upload, useUploads } from "../../store/uploads"
import { formatBytes } from "../../utils/format-bytes"
import { Button } from "../ui/button"

interface UploadWidgetItemProps {
  uploadId: string
  upload: Upload
}

export function UploadWidgetItem({ upload, uploadId }: UploadWidgetItemProps) {
  const cancelUpload = useUploads(state => state.cancelUpload)
  const retryUpload = useUploads(state => state.retryUpload)

  const progress = Math.min(
    upload.compressedSizeInBytes
      ? Math.round(
          (upload.uploadSizeInBytes * 100) / upload.compressedSizeInBytes
        )
      : 0,
    100
  )

  const dynamicLabel = {
    success: <span>100%</span>,
    progress: <span>{progress}%</span>,
    error: <span className="text-red-400">Error</span>,
    canceled: <span className="text-yellow-400">Canceled</span>,
  }

  const compressedPercent = upload.compressedSizeInBytes
    ? `-${Math.round(
        ((upload.originalSizeInBytes - upload.compressedSizeInBytes) * 100) /
          upload.originalSizeInBytes
      )}%`
    : ""

  return (
    <div className="p-3 rounded-lg flex flex-col gap-3 shadow-shape-content bg-white/2 relative overflow-hidden">
      <div className="text-xs flex flex-col gap-1">
        <span className="font-medium flex items-center gap-1">
          <ImageUp className="size-3 text-zinc-300" strokeWidth={1.5} />
          <span
            title={upload.file.name}
            className="text-ellipsis w-25 whitespace-nowrap overflow-hidden"
          >
            {upload.file.name}
          </span>
        </span>

        <span className="text-xs text-zinc-400 flex gap-1.5 items-center">
          <span className="line-through">
            {formatBytes(upload.originalSizeInBytes)}
          </span>
          <div className="size-1 rounded-full bg-zinc-700" />
          <span>
            {formatBytes(upload.compressedSizeInBytes) ?? ""}
            {compressedPercent && (
              <span className="text-green-400 ml-1">{compressedPercent}</span>
            )}
          </span>
          <div className="size-1 rounded-full bg-zinc-700" />
          {dynamicLabel[upload.status]}
        </span>
      </div>

      <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
        <Button size="icon-sm" disabled={upload.status !== "success"} asChild>
          <a
            href={upload.remoteUrl}
            aria-disabled={upload.status !== "success"}
            target="_blank"
            rel="noreferrer"
          >
            <Download className="size-4" strokeWidth={1.5} />
            <span className="sr-only">Download compressed image</span>
          </a>
        </Button>

        <Button
          disabled={!["canceled", "error"].includes(upload.status)}
          size="icon-sm"
          onClick={() => retryUpload(uploadId)}
        >
          <RefreshCcw className="size-4" strokeWidth={1.5} />
          <span className="sr-only">Retry upload</span>
        </Button>

        <Button
          disabled={upload.status !== "progress"}
          size="icon-sm"
          onClick={() => cancelUpload(uploadId)}
        >
          <X className="size-4" strokeWidth={1.5} />
          <span className="sr-only">Cancel upload</span>
        </Button>
      </div>

      <Progress.Root
        className="bg-zinc-800 rounded-full h-1 overflow-hidden"
        value={progress}
      >
        <Progress.Indicator
          data-status={upload.status}
          className="bg-indigo-500 h-1 data-[status=success]:bg-green-400 data-[status=error]:bg-red-400 data-[status=canceled]:bg-yellow-400 transition-all"
          style={{
            width: upload.status === "progress" ? `${progress}%` : "100%",
          }}
        />
      </Progress.Root>
    </div>
  )
}
