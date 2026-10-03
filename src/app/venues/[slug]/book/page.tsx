import { notFound, redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { formatINR, rupeesToPaise } from "@/lib/money"
import { getVenueBySlug } from "@/lib/venues"

export default async function VenueBookingPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const venue = getVenueBySlug(slug)

  if (!venue) notFound()

  const dailyRate = venue.fromPrice
  const serviceCharge = rupeesToPaise(1500)
  const deposit = Math.round(dailyRate * 0.2)
  const total = dailyRate + serviceCharge

  async function holdBooking(formData: FormData) {
    "use server"

    const eventDate = String(formData.get("eventDate") ?? "")
    const guestCount = Number(formData.get("guestCount") ?? 0)

    if (!eventDate || guestCount < 1) {
      redirect(`/venues/${slug}/book?error=missing-details`)
    }

    redirect("/account/bookings/IDAM-2601-1847")
  }

  return (
    <main className="container-page py-8 md:py-10">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-line bg-white p-5 md:p-8">
        <div className="mb-8">
          <p className="text-muted text-sm font-semibold uppercase tracking-[0.12em]">Secure your booking</p>
          <h1 className="mt-2 text-4xl">{venue.name}</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <form action={holdBooking} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-navy">Event date</span>
                <input required name="eventDate" type="date" className="rounded-xl border border-line bg-[#f8f6f2] px-3 py-3 outline-none" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-navy">Event type</span>
                <select className="rounded-xl border border-line bg-[#f8f6f2] px-3 py-3 outline-none">
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Corporate</option>
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-navy">Guest count</span>
              <input required name="guestCount" type="number" min="1" defaultValue={220} className="rounded-xl border border-line bg-[#f8f6f2] px-3 py-3 outline-none" />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-navy">Special requests</span>
              <textarea rows={4} placeholder="Tell the host about your event requirements" className="rounded-xl border border-line bg-[#f8f6f2] px-3 py-3 outline-none" />
            </label>

            <div className="flex gap-3">
              <Button type="submit">Hold this slot</Button>
              <a href={`/venues/${venue.slug}`} className="border-line text-navy inline-flex min-h-11 items-center justify-center gap-2 rounded-control border px-5 font-semibold">Save for later</a>
            </div>
          </form>

          <aside className="rounded-[24px] border border-line bg-[#faf9f6] p-5">
            <h2 className="text-xl font-bold text-navy">Booking summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Venue rental</dt>
                <dd>{formatINR(dailyRate)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Service fee</dt>
                <dd>{formatINR(serviceCharge)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-line pt-3 font-semibold text-navy">
                <dt>Total</dt>
                <dd>{formatINR(total)}</dd>
              </div>
              <div className="flex justify-between gap-4 text-muted">
                <dt>Deposit due now</dt>
                <dd>{formatINR(deposit)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </main>
  )
}
