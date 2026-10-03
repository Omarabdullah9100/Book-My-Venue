import Link from "next/link"
import { AdminPage } from "@/components/layout/admin-page"
import { venueSeed } from "@/data/venues"

export default function AdminOverviewPage() {
  const total = venueSeed.length
  const verified = venueSeed.filter((venue) => venue.verified).length
  const pending = total - verified
  const instant = venueSeed.filter((venue) => venue.instant).length
  const cities = new Set(venueSeed.map((venue) => venue.city)).size

  const stats = [
    { label: "Listed venues", value: total },
    { label: "Verified", value: verified },
    { label: "Awaiting review", value: pending },
    { label: "Instant booking", value: instant },
    { label: "Cities live", value: cities },
  ]

  return (
    <AdminPage title="Overview" active="/admin">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[12px] border border-[#dce3e8] bg-white p-5">
            <p className="text-muted text-xs">{stat.label}</p>
            <p className="font-display text-navy mt-4 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
      {pending > 0 && (
        <p className="bg-amber-soft text-amber-ink mt-5 rounded-[12px] px-5 py-4 text-sm">
          {pending} venue{pending === 1 ? " is" : "s are"} waiting for verification.{" "}
          <Link href="/admin/venues" className="font-bold underline">
            Review venues
          </Link>
        </p>
      )}
    </AdminPage>
  )
}
