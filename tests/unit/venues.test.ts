import { describe, expect, it } from "vitest"
import { rupeesToPaise } from "@/lib/money"
import { filterVenues, getVenueBySlug } from "@/lib/venues"

describe("venue search", () => {
  it("matches event, city, and price filters together", () => {
    const results = filterVenues({
      event: "wedding",
      city: "Kochi",
      maxBudget: 40000,
      guests: 200,
    })

    expect(results.length).toBeGreaterThan(0)
    expect(results.every((v) => v.eventTypes.includes("Wedding") || v.eventTypes.includes("wedding"))).toBe(true)
    expect(results.every((v) => v.city === "Kochi")).toBe(true)
    expect(results.every((v) => v.fromPrice <= rupeesToPaise(40000))).toBe(true)
    expect(results.some((v) => v.capacity >= 200)).toBe(true)
  })

  it("returns a venue by slug when the slug exists", () => {
    const venue = getVenueBySlug("the-fern-courtyard")
    expect(venue).not.toBeNull()
    expect(venue?.name).toBe("The Fern Courtyard")
  })
})
