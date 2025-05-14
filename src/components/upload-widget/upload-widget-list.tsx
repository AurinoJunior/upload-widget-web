import { UploadWidgetItem } from "./upload-widget-item";

export function UploadWidgetList() {
  return (
    <div className="px-3 flex flex-col gap-3">
      <span className="text-xs font-medium">
        Uploaded files <span className="text-zinc-400">(2)</span>
      </span>

      <div className="flex flex-col gap-2">
        <UploadWidgetItem />
        <UploadWidgetItem />
      </div>
    </div>
  );
}
