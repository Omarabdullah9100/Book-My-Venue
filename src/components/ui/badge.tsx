import type { ReactNode } from "react"
import { cn } from "@/lib/cn"

const tones = {
  green: "bg-green-soft text-green-ink",
  amber: "bg-amber-soft text-amber-ink",
  navy: "bg-navy-soft text-navy",
  red: "bg-red-soft text-red",
} as const

export function Badge({
  tone = "green",
  className,
  children,
}: {
  tone?: keyof typeof tones
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-full px-2.5 py-0.5 text-xs font-bold whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
