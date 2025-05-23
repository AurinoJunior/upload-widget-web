import * as Collapsible from "@radix-ui/react-collapsible"
import { useState } from "react"
import { UploadWidgetDropzone } from "./upload-widget-dropzone"
import { UploadWidgetHeader } from "./upload-widget-header"
import { UploadWidgetList } from "./upload-widget-list"
import { UploadWidgetMinimizedButton } from "./upload-widget-minimized-button"

export const UploadWidget = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false)

  return (
    <Collapsible.Root
      onOpenChange={setIsWidgetOpen}
      className="w-full flex items-center justify-center"
    >
      <div className="bg-zinc-900 w-full overflow-hidden max-w-[360px] rounded-xl shadow-shape">
        {!isWidgetOpen && <UploadWidgetMinimizedButton />}

        <Collapsible.Content>
          <UploadWidgetHeader />
          <div className="flex flex-col gap-4 py-3">
            <UploadWidgetDropzone />
            <div className="h-px bg-zinc-800/75" />
            <UploadWidgetList />
          </div>
        </Collapsible.Content>
      </div>
    </Collapsible.Root>
  )
}
