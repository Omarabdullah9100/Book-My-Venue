export default function FaqPage() {
  return (
    <main className="container-page py-10 md:py-12">
      <div className="mx-auto max-w-3xl rounded-[28px] border border-line bg-white p-6 md:p-8">
        <p className="text-muted text-sm font-semibold uppercase tracking-[0.12em]">Help centre</p>
        <h1 className="mt-2 text-4xl">Frequently asked questions</h1>
        <div className="mt-6 space-y-4 text-muted leading-relaxed">
          <p><strong className="text-navy">How do I book a venue?</strong> Search by city and occasion, compare options, then reserve your preferred space.</p>
          <p><strong className="text-navy">When do I pay?</strong> A deposit is collected to secure the booking. The balance is due closer to the event date.</p>
          <p><strong className="text-navy">Can I cancel?</strong> Cancellation follows the venue’s policy tier and is calculated based on the event date.</p>
        </div>
      </div>
    </main>
  )
}
