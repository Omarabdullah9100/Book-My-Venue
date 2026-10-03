import type { ReactNode } from "react"

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="border-line flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed bg-white px-6 py-14 text-center">
      <h3 className="text-lg font-bold">{title}</h3>
      {description && <p className="text-muted max-w-md leading-relaxed">{description}</p>}
      {action}
    </div>
  )
}
