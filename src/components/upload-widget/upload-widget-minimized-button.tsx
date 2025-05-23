import * as Collapsible from "@radix-ui/react-collapsible"
import { Maximize2 } from "lucide-react"
import { UploadWidgetTitle } from "./upload-widget-title"

export function UploadWidgetMinimizedButton() {
  return (
    <Collapsible.Trigger className="group h-9 w-full bg-white/2 py-2 px-4 flex items-center justify-between cursor-pointer">
      <UploadWidgetTitle />

      <Maximize2
        strokeWidth={1.5}
        className="size-4 text-zinc-400 group-hover:text-zinc-100"
      />
    </Collapsible.Trigger>
  )
}
