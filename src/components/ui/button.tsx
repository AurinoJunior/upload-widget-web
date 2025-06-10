import { Slot } from "@radix-ui/react-slot"
import type { ButtonHTMLAttributes } from "react"
import { type VariantProps, tv } from "tailwind-variants"

const buttonVariants = tv({
  base: "text-zinc-400 rounded-lg hover:text-zinc-100 hover:bg-zinc-800 cursor-pointer disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none",
  variants: {
    size: {
      default: "px-3 py-2",
      icon: "p-2",
      "icon-sm": "p-1",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export function Button({ size, className, asChild, ...props }: TButtonProps) {
  const Component = asChild ? Slot : "button"

  return (
    <Component className={buttonVariants({ size, className })} {...props} />
  )
}
