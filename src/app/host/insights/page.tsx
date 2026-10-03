import { OwnerPage } from "@/components/layout/owner-page"

export default function HostInsightsPage() {
  return <OwnerPage title="Insights" eyebrow="Last 30 days"><h2 className="mt-3 text-3xl">Listing insights</h2><div className="mt-6 grid max-w-3xl gap-4 md:grid-cols-3">{[["Listing views", "1,248", "+22%"], ["Enquiries", "46", "+14%"], ["Conversion", "8.4%", "+2.1%"]].map(([label, value, change]) => <div key={label} className="rounded-[14px] border border-line bg-white p-5"><p className="text-muted text-sm">{label}</p><p className="font-display text-navy mt-3 text-3xl font-bold">{value}</p><p className="text-green mt-2 text-xs font-semibold">{change} vs previous period</p></div>)}</div><div className="bg-navy-soft text-navy mt-6 max-w-3xl rounded-[14px] p-5 text-sm">Your strongest demand is for Saturday wedding receptions between 150 and 250 guests.</div></OwnerPage>
}
