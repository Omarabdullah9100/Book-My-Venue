"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"
import { cn } from "@/lib/cn"

type ToastTone = "success" | "error" | "info"
type ToastItem = { id: number; message: string; tone: ToastTone }

const ToastContext = createContext<{ toast: (message: string, tone?: ToastTone) => void } | null>(
  null,
)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>")
  return ctx
}

const toneClass: Record<ToastTone, string> = {
  success: "bg-green-ink text-white",
  error: "bg-red text-white",
  info: "bg-navy-deep text-white",
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])

  const toast = useCallback((message: string, tone: ToastTone = "info") => {
    const id = Date.now() + Math.random()
    setItems((prev) => [...prev, { id, message, tone }])
    setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== id)), 5000)
  }, [])

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="fixed right-4 bottom-4 z-50 flex w-[min(360px,calc(100%-32px))] flex-col gap-2"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "rounded-control shadow-lift px-4 py-3 text-sm font-semibold",
              toneClass[item.tone],
            )}
          >
            {item.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
