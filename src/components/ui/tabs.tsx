"use client"

import { useId, useState, type ReactNode } from "react"
import { cn } from "@/lib/cn"

export type TabItem = { key: string; label: string; content: ReactNode }

/** Accessible tabs: arrow keys move between tabs, Home/End jump. */
export function Tabs({ items, defaultKey }: { items: TabItem[]; defaultKey?: string }) {
  const [active, setActive] = useState(defaultKey ?? items[0]?.key)
  const base = useId()

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    const last = items.length - 1
    const next =
      e.key === "ArrowRight"
        ? (index + 1) % items.length
        : e.key === "ArrowLeft"
          ? (index - 1 + items.length) % items.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null
    if (next === null) return
    e.preventDefault()
    const item = items[next]
    if (!item) return
    setActive(item.key)
    document.getElementById(`${base}-tab-${item.key}`)?.focus()
  }

  return (
    <div>
      <div role="tablist" className="border-line flex gap-1 overflow-x-auto border-b">
        {items.map((item, i) => {
          const selected = item.key === active
          return (
            <button
              key={item.key}
              id={`${base}-tab-${item.key}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${base}-panel-${item.key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(item.key)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "min-h-11 border-b-2 px-4 text-sm font-semibold whitespace-nowrap",
                selected
                  ? "border-navy text-navy"
                  : "text-muted hover:text-navy border-transparent",
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.key}
          id={`${base}-panel-${item.key}`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${item.key}`}
          hidden={item.key !== active}
          className="pt-6"
        >
          {item.key === active && item.content}
        </div>
      ))}
    </div>
  )
}
