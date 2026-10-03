import Link from "next/link"
import Image from "next/image"
import { ChevronRight, CircleHelp, Search } from "lucide-react"

export default async function AccountBookingsPage({
  searchParams,
}: {
  searchParams?: Promise<{ tab?: string }> | { tab?: string }
}) {
  const params = await Promise.resolve(searchParams ?? {})
  const selectedTab = params.tab ?? "upcoming"
  const booking = {
    id: "IDAM-2601-1847",
    title: "The Fern Courtyard",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
  }

  return (
    <main className="container-page py-12 md:py-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-green text-xs font-bold uppercase tracking-[0.18em]">My Idam</p>
          <h1 className="mt-3 text-5xl md:text-6xl">Hello, Anjali.</h1>
          <p className="text-muted mt-2 text-lg">Keep every plan, payment, and place in one calm corner.</p>
        </div>
        <Link href="/venues" className="bg-navy hidden min-h-11 items-center gap-2 rounded-control px-5 font-semibold text-white shadow-button transition hover:bg-navy-deep md:inline-flex">
          <Search size={18} aria-hidden="true" />
          Find another place
        </Link>
      </div>

      <div className="mt-12 flex items-center gap-7 border-b border-line">
        {[
          ["upcoming", "Upcoming"],
          ["past", "Past"],
          ["cancelled", "Cancelled"],
          ["saved", "Saved"],
        ].map(([value, label]) => (
          <Link key={value} href={`/account/bookings?tab=${value}`} className={selectedTab === value ? "border-navy text-navy flex items-center gap-2 border-b-2 pb-3 text-sm font-bold" : "text-muted pb-3 text-sm font-semibold"}>
            {label}{value === "upcoming" && <span className="bg-navy rounded-full px-1.5 py-0.5 text-[10px] text-white">1</span>}
          </Link>
        ))}
      </div>

      <div className="mt-7 space-y-7">
        {selectedTab === "upcoming" ? <article className="flex flex-col gap-5 rounded-[16px] border border-line bg-white p-4 shadow-[0_5px_20px_rgba(31,58,95,0.04)] md:flex-row md:items-center md:p-5">
          <div className="bg-navy-soft flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-[11px] text-center text-navy">
            <span className="font-display text-2xl font-bold leading-none">26</span>
            <span className="mt-1 text-[9px] font-bold uppercase tracking-wider">Jan 2026</span>
          </div>
          <Image src={booking.image} alt="" width={240} height={160} className="h-24 w-full rounded-[11px] object-cover md:w-36" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-green-soft text-green rounded-full px-2 py-1 text-xs font-bold">Confirmed</span>
              <span className="text-muted text-xs">{booking.id}</span>
            </div>
            <h2 className="mt-2 text-2xl">{booking.title}</h2>
            <p className="text-muted text-sm">Wedding reception · 180 guests · Full day</p>
            <div className="text-green mt-4 flex flex-wrap gap-5 text-xs font-semibold">
              <span>✓ Deposit paid</span>
              <span className="text-muted">Balance due 19 Jan</span>
            </div>
          </div>
          <Link href={`/account/bookings/${booking.id}`} className="border-line text-navy inline-flex min-h-11 items-center justify-center gap-2 rounded-control border px-5 font-semibold hover:border-navy">
            View booking <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </article> : <div className="rounded-[16px] border border-line bg-white p-10 text-center"><p className="text-navy text-lg font-semibold">Nothing here yet</p><p className="text-muted mt-2 text-sm">Your {selectedTab} bookings will appear in this view.</p><Link href="/venues" className="text-navy mt-4 inline-block font-semibold underline">Explore venues</Link></div>}

        <div className="bg-amber-soft flex flex-col gap-3 rounded-[14px] px-5 py-4 md:flex-row md:items-center">
          <CircleHelp className="text-amber-ink shrink-0" size={22} aria-hidden="true" />
          <div className="flex-1">
            <p className="text-amber-ink font-bold">Plans changed?</p>
            <p className="text-muted text-xs">Reschedule, review the cancellation policy, or speak to a real person.</p>
          </div>
          <Link href="/faq" className="border-line text-navy inline-flex min-h-10 items-center justify-center rounded-control border bg-white px-5 font-semibold">Get help</Link>
        </div>
      </div>
    </main>
  )
}
