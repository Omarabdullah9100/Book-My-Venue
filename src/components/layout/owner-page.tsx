import Link from "next/link"
import { BarChart3, Bell, Building2, CalendarDays, ChevronLeft, CircleHelp, CreditCard, LayoutDashboard } from "lucide-react"
import { Logo } from "@/components/ui/logo"

const items = [
  ["Overview", "/host", LayoutDashboard],
  ["Calendar", "/host/calendar", CalendarDays],
  ["Requests", "/host/requests", Bell],
  ["Listing", "/host/listing", Building2],
  ["Payouts", "/host/payouts", CreditCard],
  ["Insights", "/host/insights", BarChart3],
  ["Reviews", "/host/reviews", CircleHelp],
] as const

export function OwnerPage({ title, eyebrow, children }: { title: string; eyebrow?: string; children: React.ReactNode }) {
  return <div className="flex min-h-screen bg-[#f3f6f8] text-[#1d2b3a]"><aside className="hidden w-[208px] shrink-0 flex-col bg-[#0f2d4f] px-4 py-7 text-white md:flex"><Logo light className="px-2 text-[1.5rem]" /><span className="bg-amber text-navy-deep mt-3 ml-10 w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase">Host</span><nav className="mt-7 flex flex-col gap-1">{items.map(([label, href, Icon]) => <Link key={label} href={href} className={`flex min-h-11 items-center gap-3 rounded-[8px] px-3 text-sm font-semibold ${title === label || (title === "Good morning, Arun." && label === "Overview") ? "bg-white/15" : "text-white/75 hover:bg-white/10"}`}><Icon size={17} />{label}{label === "Requests" && <span className="bg-amber text-navy-deep ml-auto grid size-5 place-items-center rounded-full text-[10px]">3</span>}</Link>)}</nav><div className="mt-auto space-y-1"><Link href="/faq" className="flex min-h-11 items-center gap-3 px-3 text-sm font-semibold text-white/80"><CircleHelp size={17} />Help & support</Link><Link href="/" className="flex min-h-11 items-center gap-3 px-3 text-sm font-semibold text-white/80"><ChevronLeft size={17} />Back to marketplace</Link></div></aside><main className="min-w-0 flex-1"><header className="flex min-h-[80px] items-center justify-between border-b border-[#dce3e8] bg-white px-6 md:px-9"><div><p className="text-green text-xs font-bold uppercase tracking-[0.16em]">The Fern Courtyard</p><h1 className="mt-1 text-2xl">{title}</h1></div><span className="bg-navy grid size-10 place-items-center rounded-full text-xs font-bold text-white">AM</span></header><div className="p-5 md:p-8">{eyebrow && <p className="text-green text-xs font-bold uppercase tracking-[0.16em]">{eyebrow}</p>}{children}</div></main></div>
}
