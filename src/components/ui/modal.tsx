"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { X } from "lucide-react"

/** Accessible modal built on the native <dialog> element (focus trap, Esc to close). */
export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label={title}
      className="shadow-lift backdrop:bg-navy-deep/50 m-auto w-[min(520px,calc(100%-32px))] rounded-[var(--radius-card)] p-0"
    >
      <div className="border-line flex items-center justify-between border-b px-6 py-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="text-navy hover:bg-navy/6 grid size-11 place-items-center rounded-lg"
        >
          <X size={20} />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </dialog>
  )
}
