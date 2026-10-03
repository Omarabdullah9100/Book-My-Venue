import { Star } from "lucide-react"

export function ReviewCard({
  author,
  rating,
  date,
  comment,
  ownerResponse,
}: {
  author: string
  rating: number
  date: string
  comment: string
  ownerResponse?: string | null
}) {
  return (
    <article className="border-line rounded-[var(--radius-card)] border bg-white p-5">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-bold">{author}</h3>
          <p className="text-muted text-xs">{date}</p>
        </div>
        <p
          className="text-navy-deep flex items-center gap-1 font-bold"
          aria-label={`${rating} out of 5`}
        >
          <Star size={16} fill="currentColor" aria-hidden="true" /> {rating.toFixed(1)}
        </p>
      </header>
      <p className="text-muted mt-3 leading-relaxed">{comment}</p>
      {ownerResponse && (
        <div className="bg-navy-soft mt-4 rounded-lg p-3 text-sm">
          <strong className="text-navy">Response from the host</strong>
          <p className="text-muted mt-1">{ownerResponse}</p>
        </div>
      )}
    </article>
  )
}
