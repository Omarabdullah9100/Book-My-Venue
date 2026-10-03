export default function CancellationPolicyPage() {
  return (
    <main className="container-page py-10 md:py-12">
      <div className="mx-auto max-w-3xl rounded-[28px] border border-line bg-white p-6 md:p-8">
        <p className="text-muted text-sm font-semibold uppercase tracking-[0.12em]">Cancellation policy</p>
        <h1 className="mt-2 text-4xl">Refund schedule</h1>
        <div className="mt-6 space-y-4 text-muted leading-relaxed">
          <p>Refunds are calculated based on the number of days remaining before the booked event date.</p>
          <p>• 30+ days: 100% refund</p>
          <p>• 15–29 days: 75% refund</p>
          <p>• 7–14 days: 50% refund</p>
          <p>• Less than 7 days: no refund</p>
        </div>
      </div>
    </main>
  )
}
