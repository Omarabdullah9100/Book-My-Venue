import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarCell } from "@/components/ui/calendar-cell"
import { Chip } from "@/components/ui/chip"
import { EmptyState } from "@/components/ui/empty-state"
import { DatePicker, Input, Select } from "@/components/ui/input"
import { PriceBreakdown } from "@/components/ui/price-breakdown"
import { ReviewCard } from "@/components/ui/review-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs } from "@/components/ui/tabs"
import { VenueCard } from "@/components/ui/venue-card"
import { rupeesToPaise } from "@/lib/money"

export const metadata: Metadata = { title: "Styleguide", robots: { index: false } }

const sample = {
  slug: "the-fern-courtyard",
  name: "The Fern Courtyard",
  venueType: "Wedding & celebration",
  area: "Kakkanad",
  city: "Kochi",
  capacity: 450,
  price: rupeesToPaise(42000),
  rating: 4.9,
  image:
    "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=85",
  verified: true,
  instant: true,
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-line border-t py-8">
      <h3 className="mb-4 text-sm font-bold tracking-wide">{title}</h3>
      {children}
    </section>
  )
}

/** Dev-only component gallery. Not linked from the product; noindex. */
export default function StyleguidePage() {
  return (
    <div className="container-page py-12">
      <h1 className="text-5xl!">Styleguide</h1>
      <Block title="Buttons">
        <div className="flex flex-wrap gap-3">
          <Button>Book now</Button>
          <Button variant="secondary">Save venue</Button>
          <Button variant="ghost">Cancel</Button>
          <Button variant="amber">List your idam</Button>
          <Button variant="danger">Reject request</Button>
          <Button disabled>Unavailable</Button>
        </div>
      </Block>
      <Block title="Fields">
        <div className="grid gap-4 md:grid-cols-3">
          <Input
            label="Guests"
            placeholder="e.g. 250"
            inputMode="numeric"
            hint="Approximate is fine"
          />
          <Select label="Event type" defaultValue="wedding">
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday</option>
          </Select>
          <DatePicker label="Date" />
          <Input label="Phone" defaultValue="98" error="Enter a 10-digit mobile number" />
        </div>
      </Block>
      <Block title="Chips and badges">
        <div className="flex flex-wrap items-center gap-2">
          <Chip selected>Wedding</Chip>
          <Chip>Birthday</Chip>
          <Chip>Community hall</Chip>
          <Badge>Idam Verified</Badge>
          <Badge tone="amber">Request to book</Badge>
          <Badge tone="navy">Confirmed</Badge>
          <Badge tone="red">Cancelled</Badge>
        </div>
      </Block>
      <Block title="Tabs">
        <Tabs
          items={[
            { key: "upcoming", label: "Upcoming", content: <p>Upcoming bookings go here.</p> },
            { key: "past", label: "Past", content: <p>Past bookings go here.</p> },
            { key: "cancelled", label: "Cancelled", content: <p>Cancelled bookings go here.</p> },
          ]}
        />
      </Block>
      <Block title="Calendar cells">
        <div className="flex flex-wrap gap-2">
          <CalendarCell day={12} state="available" />
          <CalendarCell day={13} state="selected" />
          <CalendarCell day={14} state="held" />
          <CalendarCell day={15} state="booked" />
          <CalendarCell day={16} state="blocked" />
          <CalendarCell day={17} state="outside" />
        </div>
      </Block>
      <Block title="Price breakdown">
        <div className="max-w-md">
          <PriceBreakdown
            lines={[
              { label: "Venue rent (full day)", amount: rupeesToPaise(42000) },
              { label: "Sound system", amount: 0, included: true },
              { label: "Generator backup", amount: rupeesToPaise(3500) },
            ]}
            total={rupeesToPaise(45500)}
            deposit={rupeesToPaise(9100)}
            balance={rupeesToPaise(36400)}
          />
        </div>
      </Block>
      <Block title="Venue card">
        <div className="max-w-sm">
          <VenueCard venue={sample} />
        </div>
      </Block>
      <Block title="Review card">
        <div className="max-w-xl">
          <ReviewCard
            author="Anjali M."
            rating={4.8}
            date="March 2026"
            comment="Smooth check-in, spotless hall and a very helpful team on the day."
            ownerResponse="Thank you, Anjali. It was a pleasure hosting your family."
          />
        </div>
      </Block>
      <Block title="Loading and empty states">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <EmptyState
            title="No venues match your filters"
            description="Widen your date range or remove a filter to see more halls."
            action={<Button variant="secondary">Clear filters</Button>}
          />
        </div>
      </Block>
    </div>
  )
}
