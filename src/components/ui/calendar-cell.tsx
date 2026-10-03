import { cn } from "@/lib/cn"

export type CellState = "available" | "held" | "booked" | "blocked" | "selected" | "outside"

const styles: Record<CellState, string> = {
  available: "bg-white text-ink hover:border-navy border-line",
  selected: "bg-navy text-white border-navy",
  held: "bg-amber-soft text-amber-ink border-amber-soft",
  booked: "bg-navy-soft text-muted border-navy-soft line-through",
  blocked: "bg-red-soft text-red border-red-soft",
  outside: "text-muted/60 border-transparent",
}

const labels: Record<CellState, string> = {
  available: "available",
  selected: "selected",
  held: "temporarily held",
  booked: "booked",
  blocked: "unavailable",
  outside: "outside this month",
}

export function CalendarCell({
  day,
  state,
  onSelect,
}: {
  day: number
  state: CellState
  onSelect?: () => void
}) {
  const interactive = state === "available" || state === "selected"
  return (
    <button
      type="button"
      disabled={!interactive}
      onClick={onSelect}
      aria-label={`${day}, ${labels[state]}`}
      aria-pressed={state === "selected" ? true : undefined}
      className={cn(
        "grid size-11 place-items-center rounded-lg border text-sm font-semibold transition",
        styles[state],
      )}
    >
      {day}
    </button>
  )
}
