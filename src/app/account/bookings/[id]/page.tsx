import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CalendarDays, Check, CircleHelp, Clock3, Download, MapPin, MessageCircle, MoreHorizontal, Users } from "lucide-react"

export default async function BookingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <main className="container-page py-10 md:py-14">
      <Link href="/account/bookings" className="text-navy inline-flex items-center gap-2 text-sm font-semibold">
        <ArrowLeft size={16} aria-hidden="true" /> Back to my bookings
      </Link>

      <div className="mt-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-green text-xs font-bold uppercase tracking-[0.18em]">Booking details</p>
          <h1 className="mt-3 text-4xl md:text-5xl">The Fern Courtyard</h1>
          <p className="text-muted mt-2">{id} · Kakkanad, Kochi</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/account/bookings/${id}?receipt=1`} className="border-line text-navy inline-flex min-h-10 items-center gap-2 rounded-control border bg-white px-4 font-semibold"><Download size={16} /> Receipt</Link>
          <Link href="/cancellation-policy" className="border-line text-navy inline-flex min-h-10 items-center gap-2 rounded-control border bg-white px-4 font-semibold"><MoreHorizontal size={17} /> More</Link>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-[18px] border border-line bg-white">
            <Image src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80" alt="The Fern Courtyard" width={1200} height={600} className="h-[300px] w-full object-cover md:h-[390px]" priority />
            <div className="flex flex-wrap items-center gap-3 p-5">
              <span className="bg-green-soft text-green rounded-full px-3 py-1.5 text-xs font-bold">Confirmed</span>
              <span className="text-muted text-sm">Deposit paid</span>
            </div>
          </div>

          <section className="rounded-[18px] border border-line bg-white p-5 md:p-6">
            <p className="text-green text-xs font-bold uppercase tracking-[0.16em]">Your event</p>
            <h2 className="mt-2 text-2xl">Wedding reception</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="flex gap-3"><CalendarDays className="text-navy" size={20} /><div><p className="text-muted text-xs">Date</p><strong>Monday, 26 January 2026</strong></div></div>
              <div className="flex gap-3"><Clock3 className="text-navy" size={20} /><div><p className="text-muted text-xs">Timing</p><strong>Full day · 8:00 AM to 10:00 PM</strong></div></div>
              <div className="flex gap-3"><Users className="text-navy" size={20} /><div><p className="text-muted text-xs">Guests</p><strong>180 people</strong></div></div>
              <div className="flex gap-3"><MapPin className="text-navy" size={20} /><div><p className="text-muted text-xs">Location</p><strong>Kakkanad, Kochi</strong></div></div>
            </div>
          </section>

          <section className="rounded-[18px] border border-line bg-white p-5 md:p-6">
            <div className="flex items-center justify-between"><h2 className="text-2xl">Booking timeline</h2><span className="text-muted text-sm">Updated today</span></div>
            <div className="mt-6 space-y-5">
              {["Booking confirmed", "Deposit received", "Balance due 19 January 2026"].map((item, index) => (
                <div key={item} className="flex gap-3"><span className={`grid size-7 shrink-0 place-items-center rounded-full ${index < 2 ? "bg-green text-white" : "bg-amber-soft text-amber-ink"}`}>{index < 2 ? <Check size={15} /> : <Clock3 size={15} />}</span><div><p className="font-semibold">{item}</p><p className="text-muted text-sm">{index < 2 ? "Completed" : "₹31,200 remaining"}</p></div></div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-[18px] border border-line bg-white p-5 md:p-6">
            <h2 className="text-2xl">Payment summary</h2>
            <div className="text-muted mt-5 space-y-3 text-sm"><div className="flex justify-between"><span>Venue rental</span><span>₹39,000</span></div><div className="flex justify-between"><span>Sound system</span><span>₹3,500</span></div><div className="border-line flex justify-between border-t pt-3 font-bold text-navy"><span>Total</span><span>₹42,500</span></div><div className="text-green flex justify-between"><span>Deposit paid</span><span>₹8,500</span></div><div className="flex justify-between font-bold text-navy"><span>Balance due</span><span>₹34,000</span></div></div>
          </section>
          <section className="rounded-[18px] border border-line bg-white p-5 md:p-6">
            <h2 className="text-2xl">Need a hand?</h2>
            <p className="text-muted mt-2 text-sm leading-relaxed">The venue team is ready to help with timings, access, or changes to your plan.</p>
            <div className="mt-5 space-y-2"><Link href="/faq" className="bg-navy flex min-h-11 w-full items-center justify-center gap-2 rounded-control px-4 font-semibold text-white"><MessageCircle size={17} /> Message venue</Link><Link href="/faq" className="border-line text-navy flex min-h-11 w-full items-center justify-center gap-2 rounded-control border font-semibold"><CircleHelp size={17} /> Help centre</Link></div>
            <Link href={`/account/bookings/${id}/review`} className="border-line text-navy mt-2 flex min-h-11 w-full items-center justify-center rounded-control border font-semibold">Write a review</Link>
          </section>
        </aside>
      </div>
    </main>
  )
}
