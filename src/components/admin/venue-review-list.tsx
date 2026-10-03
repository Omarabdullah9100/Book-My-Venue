"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export type ReviewVenue = {
  slug: string
  name: string
  venueType: string
  area: string
  city: string
  verified: boolean
}

type Decision = "approved" | "rejected"

export function VenueReviewList({ venues }: { venues: ReviewVenue[] }) {
  const [decisions, setDecisions] = useState<Record<string, Decision>>({})

  function decide(slug: string, decision: Decision | null) {
    setDecisions((current) => {
      const next = { ...current }
      if (decision) next[slug] = decision
      else delete next[slug]
      return next
    })
  }

  return (
    <ul className="divide-y divide-[#dce3e8] rounded-[14px] border border-[#dce3e8] bg-white">
      {venues.map((venue) => {
        const decision = decisions[venue.slug]
        const state = venue.verified ? "verified" : (decision ?? "pending")
        return (
          <li
            key={venue.slug}
            className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="font-bold">{venue.name}</p>
              <p className="text-muted text-sm">
                {venue.venueType} in {venue.area}, {venue.city}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={state === "rejected" ? "red" : state === "pending" ? "amber" : "green"}>
                {state === "verified"
                  ? "Verified"
                  : state === "approved"
                    ? "Approved"
                    : state === "rejected"
                      ? "Rejected"
                      : "Needs review"}
              </Badge>
              {state === "pending" && (
                <>
                  <Button onClick={() => decide(venue.slug, "approved")}>Approve</Button>
                  <Button variant="secondary" onClick={() => decide(venue.slug, "rejected")}>
                    Reject
                  </Button>
                </>
              )}
              {(state === "approved" || state === "rejected") && (
                <Button variant="ghost" onClick={() => decide(venue.slug, null)}>
                  Undo
                </Button>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
