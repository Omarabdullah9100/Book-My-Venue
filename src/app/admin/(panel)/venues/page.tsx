import { VenueReviewList } from "@/components/admin/venue-review-list"
import { AdminPage } from "@/components/layout/admin-page"
import { venueSeed } from "@/data/venues"

export default function AdminVenuesPage() {
  const venues = [...venueSeed]
    .sort((a, b) => Number(a.verified) - Number(b.verified))
    .map(({ slug, name, venueType, area, city, verified }) => ({
      slug,
      name,
      venueType,
      area,
      city,
      verified,
    }))

  return (
    <AdminPage title="Venue approvals" active="/admin/venues">
      <p className="text-muted mb-5 max-w-2xl text-sm">
        Venues that need review are listed first. Decisions are kept in this browser until listings
        move to the database.
      </p>
      <VenueReviewList venues={venues} />
    </AdminPage>
  )
}
