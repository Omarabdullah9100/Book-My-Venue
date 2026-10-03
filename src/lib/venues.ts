import { venueSeed, type VenueSeed } from "@/data/venues"

export type VenueFilters = {
  event?: string
  city?: string
  maxBudget?: number
  guests?: number
}

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-")
}

export function filterVenues(filters: VenueFilters = {}) {
  const event = filters.event ? normalize(filters.event) : ""
  const city = filters.city ? normalize(filters.city) : ""
  const budget = typeof filters.maxBudget === "number" ? filters.maxBudget * 100 : undefined
  const guests = filters.guests ?? 0

  let results: VenueSeed[] = [...venueSeed]

  if (event && event !== "all") {
    results = results.filter((venue) =>
      venue.eventTypes.some((type) => normalize(type).includes(event) || event.includes(normalize(type))),
    )
  }

  if (city) {
    results = results.filter(
      (venue) =>
        normalize(venue.city).includes(city) ||
        normalize(venue.area).includes(city) ||
        normalize(venue.district).includes(city),
    )
  }

  if (guests > 0) {
    results = results.filter((venue) => venue.capacity >= guests)
  }

  if (typeof budget === "number") {
    results = results.filter((venue) => venue.fromPrice <= budget)
  }

  return results.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || a.name.localeCompare(b.name))
}

export function getVenueBySlug(slug: string) {
  return venueSeed.find((venue) => venue.slug === slug) ?? null
}
