import * as Collapsible from "@radix-ui/react-collapsible"
import { motion, useCycle } from "motion/react"
import { UploadWidgetDropzone } from "./upload-widget-dropzone"
import { UploadWidgetHeader } from "./upload-widget-header"
import { UploadWidgetList } from "./upload-widget-list"
import { UploadWidgetMinimizedButton } from "./upload-widget-minimized-button"

export const UploadWidget = () => {
  const [isWidgetOpen, toggleWidgetOpen] = useCycle(false, true)

  return (
    <Collapsible.Root
      className="w-full flex items-center justify-center"
      onOpenChange={() => {
        toggleWidgetOpen()
      }}
    >
      <motion.div
        initial={false}
        animate={isWidgetOpen ? "open" : "closed"}
        variants={{
          open: { height: "auto" },
          closed: { height: 36 },
        }}
        className="bg-zinc-900 w-full max-w-[360px] overflow-hidden rounded-xl shadow-shape"
      >
        {!isWidgetOpen && <UploadWidgetMinimizedButton />}

        <Collapsible.Content>
          <UploadWidgetHeader />
          <div className="flex flex-col gap-4 py-3">
            <UploadWidgetDropzone />
            <div className="h-px bg-zinc-800/75" />
            <UploadWidgetList />
          </div>
        </Collapsible.Content>
      </motion.div>
    </Collapsible.Root>
  )
}
