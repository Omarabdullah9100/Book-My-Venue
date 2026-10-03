import Link from "next/link"
import { OwnerPage } from "@/components/layout/owner-page"

export default function HostListingPage() {
  return <OwnerPage title="Listing" eyebrow="The Fern Courtyard"><h2 className="mt-3 text-3xl">Venue listing</h2><div className="mt-6 grid max-w-3xl gap-4 md:grid-cols-2"><div className="rounded-[14px] border border-line bg-white p-5"><p className="text-muted text-sm">Status</p><p className="text-green mt-2 text-xl font-bold">Verified and live</p><p className="text-muted mt-2 text-sm">Your venue is visible to guests.</p></div><div className="rounded-[14px] border border-line bg-white p-5"><p className="text-muted text-sm">Photos</p><p className="text-navy mt-2 text-xl font-bold">8 published</p><p className="text-muted mt-2 text-sm">Keep your listing fresh with seasonal images.</p></div></div><Link href="/host/onboarding" className="bg-navy mt-6 inline-flex rounded-control px-5 py-3 font-semibold text-white">Edit listing</Link></OwnerPage>
}
