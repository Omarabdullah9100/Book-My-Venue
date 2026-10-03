import Image from "next/image"
import Link from "next/link"
import { Heart, MapPin, ShieldCheck, Star } from "lucide-react"
import { cn } from "@/lib/cn"
import { formatINR, type Paise } from "@/lib/money"
import { t } from "@/lib/strings"

export type VenueCardData = {
  slug: string
  name: string
  venueType: string
  area: string
  city: string
  capacity: number
  /** Starting full-day price, in paise */
  price: Paise
  rating: number | null
  image: string
  verified: boolean
  instant: boolean
}

export function VenueCard({ venue, wide = false }: { venue: VenueCardData; wide?: boolean }) {
  const href = `/venues/${venue.slug}`
  return (
    <article
      className={cn(
        "border-line hover:shadow-lift group relative overflow-hidden rounded-[var(--radius-card)] border bg-white transition duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        wide && "grid sm:grid-cols-[260px_1fr]",
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:min-h-52">
        <Image
          src={venue.image}
          alt={`${venue.name} event space`}
          fill
          sizes="(min-width: 1024px) 380px, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.025] motion-reduce:transition-none"
        />
        <span className="text-navy absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-white/90">
          <Heart size={18} aria-hidden="true" />
        </span>
        {venue.instant && (
          <span className="bg-amber text-navy-deep absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs font-bold">
            {t.venue.instantBooking}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 p-5">
        <div className="text-muted flex items-center justify-between text-xs font-semibold">
          <span>{venue.venueType}</span>
          {venue.rating !== null && (
            <span className="text-navy-deep flex items-center gap-1">
              <Star size={14} fill="currentColor" aria-hidden="true" /> {venue.rating.toFixed(1)}
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold">
          {/* Stretched link: whole card is one tap target, one tab stop */}
          <Link
            href={href}
            className="after:absolute after:inset-0 focus-visible:outline-offset-[-3px]"
          >
            {venue.name}
          </Link>
        </h3>
        <p className="text-muted flex items-center gap-1.5 text-sm">
          <MapPin size={15} aria-hidden="true" /> {venue.area}, {venue.city} · {t.venue.upTo}{" "}
          {venue.capacity}
        </p>
        <div className="border-line mt-2 flex items-center justify-between border-t pt-3 text-sm">
          <span className="text-green-ink flex items-center gap-1 font-semibold">
            {venue.verified && (
              <>
                <ShieldCheck size={16} aria-hidden="true" /> {t.venue.verified}
              </>
            )}
          </span>
          <span>
            <strong>{formatINR(venue.price)}</strong> {t.venue.perDay}
          </span>
        </div>
      </div>
    </article>
  )
}
