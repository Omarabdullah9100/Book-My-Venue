import { cn } from "@/lib/cn"

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("bg-navy/8 animate-pulse rounded-lg motion-reduce:animate-none", className)}
    />
  )
}
