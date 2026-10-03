import type { ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/cn"

export function Chip({
  selected = false,
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        "min-h-11 rounded-full border px-4 text-sm font-semibold transition",
        selected
          ? "border-navy bg-navy text-white"
          : "border-line text-navy hover:border-navy bg-white",
        className,
      )}
      {...props}
    />
  )
}
