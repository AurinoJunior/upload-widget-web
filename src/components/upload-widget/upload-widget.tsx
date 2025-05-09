import { UploadWidgetDropzone } from "./upload-widget-dropzone";
import { UploadWidgetHeader } from "./upload-widget-header";
import { UploadWidgetList } from "./upload-widget-list";

export const UploadWidget = () => {
  return (
    <div className="bg-zinc-900 w-full overflow-hidden max-w-[360px] rounded-xl shadow-shape">
      <UploadWidgetHeader />

      <div className="flex flex-col gap-4 py-3">
        <UploadWidgetDropzone />

        <div className="h-px bg-zinc-800/75" />

        <UploadWidgetList />
      </div>
    </div>
  );
};
