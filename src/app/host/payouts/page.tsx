import { OwnerPage } from "@/components/layout/owner-page"

export default function HostPayoutsPage() {
  return <OwnerPage title="Payouts" eyebrow="January 2026"><h2 className="mt-3 text-3xl">Payouts</h2><div className="mt-6 grid max-w-3xl gap-4 md:grid-cols-3">{[["Available", "₹1.23L"], ["Paid out", "₹2.61L"], ["Next payout", "7 Feb"]].map(([label, value]) => <div key={label} className="rounded-[14px] border border-line bg-white p-5"><p className="text-muted text-sm">{label}</p><p className="font-display text-navy mt-3 text-2xl font-bold">{value}</p></div>)}</div><div className="mt-6 max-w-3xl rounded-[14px] border border-line bg-white p-5"><h3 className="text-xl font-bold">Recent payouts</h3><div className="text-muted mt-4 flex justify-between border-t border-line pt-4 text-sm"><span>31 Jan 2026 · Bank transfer</span><strong className="text-green">₹86,000 settled</strong></div></div></OwnerPage>
}
