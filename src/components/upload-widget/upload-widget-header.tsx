import * as Collapsible from "@radix-ui/react-collapsible"

import { Minimize2 } from "lucide-react"
import { Button } from "../ui/button"
import { UploadWidgetTitle } from "./upload-widget-title"

export function UploadWidgetHeader() {
  return (
    <div className="w-full px-4 py-2 bg-white/2 border-zinc-800 border-b flex items-center justify-between">
      <UploadWidgetTitle />

      {/* Faz com que o não seja criado outro button mas utilize o componente filho */}
      <Collapsible.Trigger asChild>
        <Button size="icon" className="-mr-2">
          <Minimize2 strokeWidth={1.5} className="size-4" />
        </Button>
      </Collapsible.Trigger>
    </div>
  )
}
