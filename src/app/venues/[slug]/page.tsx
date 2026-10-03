import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { ButtonLink } from "@/components/ui/button"
import { ReviewCard } from "@/components/ui/review-card"
import { PriceBreakdown } from "@/components/ui/price-breakdown"
import { VenueCard } from "@/components/ui/venue-card"
import { formatINR, rupeesToPaise } from "@/lib/money"
import { getVenueBySlug, filterVenues } from "@/lib/venues"

export default function VenueDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return <VenueDetailBody params={params} />
}

async function VenueDetailBody({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const venue = getVenueBySlug(slug)

  if (!venue) {
    notFound()
  }

  const related = filterVenues({ event: venue.eventTypes[0], city: venue.city }).filter(
    (item) => item.slug !== venue.slug,
  )
  const total = venue.fromPrice
  const deposit = Math.round(total * 0.2)
  const balance = total - deposit

  return (
    <main className="container-page py-8 md:py-10">
      <div className="rounded-[28px] border border-line bg-white p-4 md:p-6">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {venue.verified && <Badge>Idam Verified</Badge>}
              {venue.instant ? <Badge tone="green">Instant booking</Badge> : <Badge tone="amber">Request to book</Badge>}
            </div>
            <h1 className="text-4xl md:text-5xl">{venue.name}</h1>
            <p className="text-muted mt-2 text-lg">
              {venue.area}, {venue.city} · Up to {venue.capacity} guests
            </p>

            <div className="mt-6 overflow-hidden rounded-[20px]">
              <Image
                src={venue.image}
                alt={venue.name}
                width={1200}
                height={820}
                className="h-[420px] w-full object-cover"
              />
            </div>
          </div>

          <aside className="rounded-[22px] border border-line bg-[#faf9f6] p-4 md:p-5">
            <p className="text-muted text-sm uppercase tracking-[0.12em]">Starting from</p>
            <p className="mt-2 text-3xl font-bold text-navy">{formatINR(venue.fromPrice)}</p>
            <p className="text-muted mt-2 text-sm">Per day / full-day venue rental</p>

            <div className="mt-5 space-y-3">
              <ButtonLink href={`/venues/${venue.slug}/book`} className="w-full">
                Book this venue
              </ButtonLink>
              <ButtonLink href="/venues" variant="secondary" className="w-full">
                Back to results
              </ButtonLink>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted">Venue type</span>
                <strong>{venue.venueType}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Rating</span>
                <strong>{venue.rating?.toFixed(1) ?? "New"}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Event types</span>
                <strong>{venue.eventTypes[0]}</strong>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <section className="space-y-8">
          <div className="rounded-[24px] border border-line bg-white p-5 md:p-6">
            <h2 className="text-2xl">About this venue</h2>
            <p className="text-muted mt-3 leading-relaxed">{venue.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {venue.eventTypes.map((eventType) => (
                <Badge key={eventType} tone="navy">{eventType}</Badge>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-line bg-white p-5 md:p-6">
            <h2 className="text-2xl">Amenities</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {venue.amenities.map((amenity) => (
                <span key={amenity} className="rounded-full border border-line bg-[#f8f6f2] px-3 py-2 text-sm font-medium text-navy">
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-line bg-white p-5 md:p-6">
            <h2 className="text-2xl">Rules</h2>
            <ul className="text-muted mt-4 space-y-2 leading-relaxed">
              {venue.rules.map((rule) => (
                <li key={rule} className="flex gap-2">
                  <span className="mt-1 inline-block size-2 rounded-full bg-amber" aria-hidden="true" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[24px] border border-line bg-white p-5 md:p-6">
            <h2 className="text-2xl">Guest reviews</h2>
            <div className="mt-5 space-y-4">
              <ReviewCard
                author="Anjali M."
                rating={4.9}
                date="March 2026"
                comment="Beautiful venue and a very easy planning process. The team helped us adjust the layout for our function."
                ownerResponse="Thank you, Anjali. We loved hosting your celebrations."
              />
              <ReviewCard
                author="Anoop K."
                rating={4.7}
                date="January 2026"
                comment="Good lighting, smooth entry flow, and plenty of parking for guests."
              />
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-[24px] border border-line bg-white p-5 md:p-6">
            <h2 className="text-2xl">Price breakdown</h2>
            <div className="mt-4">
              <PriceBreakdown
                lines={[
                  { label: "Venue rent (full day)", amount: venue.fromPrice },
                  { label: "Sound system", amount: rupeesToPaise(3500), included: false },
                  { label: "Power backup", amount: rupeesToPaise(0), included: true },
                ]}
                total={venue.fromPrice + rupeesToPaise(3500)}
                deposit={deposit}
                balance={balance}
              />
            </div>
          </div>

          <div className="rounded-[24px] border border-line bg-white p-5 md:p-6">
            <h2 className="text-2xl">Similar venues</h2>
            <div className="mt-4 space-y-4">
              {related.slice(0, 2).map((item) => (
                <div key={item.slug}>
                  <VenueCard
                    venue={{
                      slug: item.slug,
                      name: item.name,
                      venueType: item.venueType,
                      area: item.area,
                      city: item.city,
                      capacity: item.capacity,
                      price: item.fromPrice,
                      rating: item.rating,
                      image: item.image,
                      verified: item.verified,
                      instant: item.instant,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
