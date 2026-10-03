import Link from "next/link"
import { VenueCard } from "@/components/ui/venue-card"
import { filterVenues } from "@/lib/venues"

type SearchState = {
  event?: string
  city?: string
  guests?: string
  maxBudget?: string
  date?: string
}

export default async function VenuesPage({
  searchParams,
}: {
  searchParams?: Promise<SearchState> | SearchState
}) {
  const params = (await Promise.resolve(searchParams ?? {})) as SearchState
  const selectedEvent = params.event && params.event !== "all" ? params.event : "all"
  const selectedCity = params.city ?? ""
  const guests = Number(params.guests ?? "") || undefined
  const maxBudget = Number(params.maxBudget ?? "") || undefined

  const venues = filterVenues({
    event: selectedEvent === "all" ? undefined : selectedEvent,
    city: selectedCity || undefined,
    guests,
    maxBudget,
  })

  return (
    <main className="container-page py-8 md:py-10">
      <div className="flex flex-col gap-4 rounded-[28px] border border-line bg-white p-4 md:p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-muted text-sm font-semibold uppercase tracking-[0.12em]">Find a venue</p>
            <h1 className="mt-2 text-4xl">Explore Kerala venues</h1>
          </div>
          <span className="text-muted text-sm">
            {venues.length} venue{venues.length === 1 ? "" : "s"} available
          </span>
        </div>

        <form method="get" className="grid gap-3 md:grid-cols-[1.3fr_1.1fr_1fr_1fr_1fr]">
          <label className="flex flex-col gap-2 rounded-xl border border-line bg-[#fbfaf7] px-3 py-2">
            <span className="text-muted text-xs font-semibold uppercase tracking-[0.12em]">Occasion</span>
            <select name="event" defaultValue={selectedEvent} className="bg-transparent text-base font-medium text-navy outline-none">
              <option value="all">All</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Community hall">Community hall</option>
              <option value="Corporate">Corporate</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 rounded-xl border border-line bg-[#fbfaf7] px-3 py-2">
            <span className="text-muted text-xs font-semibold uppercase tracking-[0.12em]">City</span>
            <select name="city" defaultValue={selectedCity || "Kochi"} className="bg-transparent text-base font-medium text-navy outline-none">
              <option value="">All cities</option>
              <option value="Kochi">Kochi</option>
              <option value="Thrissur">Thrissur</option>
              <option value="Ernakulam">Ernakulam</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 rounded-xl border border-line bg-[#fbfaf7] px-3 py-2">
            <span className="text-muted text-xs font-semibold uppercase tracking-[0.12em]">Guests</span>
            <input
              type="number"
              name="guests"
              min="10"
              defaultValue={guests ?? 200}
              className="bg-transparent text-base font-medium text-navy outline-none"
            />
          </label>

          <label className="flex flex-col gap-2 rounded-xl border border-line bg-[#fbfaf7] px-3 py-2">
            <span className="text-muted text-xs font-semibold uppercase tracking-[0.12em]">Budget</span>
            <input
              type="number"
              name="maxBudget"
              min="5000"
              defaultValue={maxBudget ?? 50000}
              className="bg-transparent text-base font-medium text-navy outline-none"
            />
          </label>

          <button type="submit" className="bg-navy text-white rounded-xl px-4 py-3 font-semibold shadow-button hover:bg-navy-deep">
            Apply filters
          </button>
        </form>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {venues.length > 0 ? (
          venues.map((venue) => (
            <VenueCard key={venue.slug} venue={{
              slug: venue.slug,
              name: venue.name,
              venueType: venue.venueType,
              area: venue.area,
              city: venue.city,
              capacity: venue.capacity,
              price: venue.fromPrice,
              rating: venue.rating,
              image: venue.image,
              verified: venue.verified,
              instant: venue.instant,
            }} wide />
          ))
        ) : (
          <div className="rounded-[24px] border border-line bg-white p-8 text-center text-lg text-navy lg:col-span-2">
            No venues match the current filters. Try widening the date range or budget.
            <div className="mt-4">
              <Link href="/venues" className="text-navy underline">Clear filters</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
