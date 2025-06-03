import { useUploads } from "../../store/uploads"
import { UploadWidgetItem } from "./upload-widget-item"

export function UploadWidgetList() {
  const uploads = useUploads(state => state.uploads)
  const amountOfUploads = useUploads(store => store.uploads.size)

  const isUploadListEmpty = false

  return (
    <div className="px-3 flex flex-col gap-3">
      <span className="text-xs font-medium">
        Uploaded files{" "}
        {!!amountOfUploads && (
          <span className="text-zinc-400">({amountOfUploads})</span>
        )}
      </span>

      {isUploadListEmpty ? (
        <span className="text-xs text-zinc-400">No uploads added</span>
      ) : (
        <div className="flex flex-col gap-2">
          {Array.from(uploads).map(([uploadId, upload]) => {
            return (
              <UploadWidgetItem
                key={uploadId}
                upload={upload}
                uploadId={uploadId}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
