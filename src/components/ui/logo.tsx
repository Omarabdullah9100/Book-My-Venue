import Link from "next/link"
import { cn } from "@/lib/cn"

export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Idam home"
      className={cn(
        "font-display inline-flex min-h-11 items-center gap-2 p-1 text-[1.65rem] font-bold",
        light ? "text-white" : "text-navy",
        className,
      )}
    >
      <span className="grid h-8 w-7 place-items-end justify-center rounded-t-[14px] rounded-b-[5px] border-2 border-current pb-[5px]">
        <span className="bg-amber size-1.5 rounded-full" />
      </span>
      <span>idam</span>
    </Link>
  )
}
