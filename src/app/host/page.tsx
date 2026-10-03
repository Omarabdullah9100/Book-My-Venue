"use client"

import Link from "next/link"
import { useState } from "react"
import { BarChart3, Bell, Building2, CalendarDays, ChevronLeft, CircleHelp, CreditCard, LayoutDashboard, MessageCircle, Plus, X } from "lucide-react"
import { Logo } from "@/components/ui/logo"

const navItems = [
  { label: "Overview", href: "/host", icon: LayoutDashboard },
  { label: "Calendar", href: "/host/calendar", icon: CalendarDays },
  { label: "Requests", href: "/host/requests", icon: Bell },
  { label: "Listing", href: "/host/listing", icon: Building2 },
  { label: "Payouts", href: "/host/payouts", icon: CreditCard },
  { label: "Insights", href: "/host/insights", icon: BarChart3 },
  { label: "Reviews", href: "/host/reviews", icon: CircleHelp },
]

export default function HostPage() {
  const [calendarConfirmed, setCalendarConfirmed] = useState(false)
  const [blockedDate, setBlockedDate] = useState(false)
  const [requestStatus, setRequestStatus] = useState<"pending" | "accepted" | "declined">("pending")
  const [activeSection, setActiveSection] = useState("Overview")
  const [selectedDate, setSelectedDate] = useState<number | null>(null)

  return (
    <div className="flex min-h-screen bg-[#f3f6f8] text-[#1d2b3a]">
      <aside className="hidden w-[208px] shrink-0 flex-col bg-[#0f2d4f] px-4 py-7 text-white md:flex">
        <Logo light className="px-2 text-[1.5rem]" />
        <span className="bg-amber text-navy-deep mt-3 ml-10 w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase">Host</span>
        <nav className="mt-7 flex flex-col gap-1">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link key={label} href={href} onClick={() => setActiveSection(label)} className={`flex min-h-11 items-center gap-3 rounded-[8px] px-3 text-left text-sm font-semibold ${activeSection === label ? "bg-white/15" : "text-white/75 hover:bg-white/10"}`}>
              <Icon size={17} aria-hidden="true" /> {label}
              {label === "Requests" && <span className="bg-amber text-navy-deep ml-auto grid size-5 place-items-center rounded-full text-[10px]">{requestStatus === "pending" ? 3 : 2}</span>}
            </Link>
          ))}
        </nav>
        <div className="mt-auto space-y-1">
          <Link href="/faq" className="flex min-h-11 items-center gap-3 px-3 text-sm font-semibold text-white/80"><CircleHelp size={17} /> Help & support</Link>
          <Link href="/" className="flex min-h-11 items-center gap-3 px-3 text-sm font-semibold text-white/80"><ChevronLeft size={17} /> Back to marketplace</Link>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="flex min-h-[80px] items-center justify-between border-b border-[#dce3e8] bg-white px-6 md:px-9">
          <div><p className="text-green text-xs font-bold uppercase tracking-[0.16em]">The Fern Courtyard</p><h1 className="mt-1 text-2xl">{activeSection === "Overview" ? "Good morning, Arun." : activeSection}</h1></div>
          <div className="flex items-center gap-3"><Link href="/faq" className="border-line text-navy hidden min-h-10 items-center gap-2 rounded-control border px-4 font-semibold md:inline-flex"><MessageCircle size={17} /> WhatsApp tools</Link><span className="bg-navy grid size-10 place-items-center rounded-full text-xs font-bold text-white">AM</span></div>
        </header>

        <div className="p-5 md:p-8">
          <div className="bg-amber-soft border-amber/40 flex flex-col gap-4 rounded-[12px] border px-5 py-4 md:flex-row md:items-center">
            <CalendarDays className="text-amber-ink" size={21} />
            <div className="flex-1"><p className="text-amber-ink font-bold">{calendarConfirmed ? "Your calendar is up to date" : "Your calendar is 92% up to date"}</p><p className="text-muted text-xs">{calendarConfirmed ? "Your next 30 days are confirmed." : "Confirm the next 30 days to rank higher in search."}</p></div>
            <button type="button" onClick={() => setCalendarConfirmed((value) => !value)} className="border-line text-navy min-h-10 rounded-control border bg-white px-5 font-semibold">{calendarConfirmed ? "Calendar confirmed" : "Confirm calendar"}</button>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Bookings this month", value: "12", note: "↑ 18% from December", positive: true },
              { label: "Pending requests", value: requestStatus === "pending" ? "3" : "2", note: requestStatus === "pending" ? "Needs your attention" : "Updated just now" },
              { label: "January earnings", value: "₹3.84L", note: "₹2.61L paid out", positive: true },
              { label: "Occupancy", value: "68%", note: "↑ 7% vs last month", positive: true },
            ].map((stat) => <div key={stat.label} className="rounded-[12px] border border-[#dce3e8] bg-white p-5"><p className="text-muted text-xs">{stat.label}</p><p className="font-display text-navy mt-4 text-3xl font-bold">{stat.value}</p><p className={`mt-2 text-xs ${stat.positive ? "text-green" : "text-muted"}`}>{stat.note}</p></div>)}
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
            <section className="rounded-[14px] border border-[#dce3e8] bg-white p-5 md:p-6">
              <div className="flex items-start justify-between"><div><p className="text-green text-xs font-bold uppercase tracking-[0.16em]">January 2026</p><h2 className="mt-2 text-2xl">Calendar</h2><p className="text-muted mt-1 text-xs">{selectedDate ? `Selected January ${selectedDate}` : "Select a date to manage availability"}</p></div><button type="button" disabled={!selectedDate} onClick={() => setBlockedDate((value) => !value)} className="bg-navy inline-flex min-h-10 items-center gap-2 rounded-control px-4 font-semibold text-white shadow-button disabled:opacity-50">{blockedDate ? <X size={18} /> : <Plus size={18} />} {blockedDate ? `Unblock ${selectedDate ?? "date"} Jan` : "Block selected date"}</button></div>
              <div className="mt-6 grid grid-cols-7 gap-y-5 text-center text-sm"><div className="text-muted text-[10px] font-bold">S</div><div className="text-muted text-[10px] font-bold">M</div><div className="text-muted text-[10px] font-bold">T</div><div className="text-muted text-[10px] font-bold">W</div><div className="text-muted text-[10px] font-bold">T</div><div className="text-muted text-[10px] font-bold">F</div><div className="text-muted text-[10px] font-bold">S</div>{[30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3].map((day, index) => <button type="button" key={`${day}-${index}`} onClick={() => setSelectedDate(day)} className={`mx-auto grid h-11 w-full max-w-14 place-items-center rounded-md text-xs ${day === selectedDate && blockedDate ? "bg-gray-200 text-gray-500 line-through" : day === selectedDate ? "bg-navy text-white font-bold" : [10,18].includes(day) ? "bg-green-soft text-green font-bold" : "text-navy hover:bg-navy-soft"}`}>{day}</button>)}</div>
              <div className="text-muted mt-5 flex gap-4 text-[10px]"><span><i className="bg-green mr-1 inline-block size-2 rounded-sm" />Platform booking</span><span><i className="bg-amber mr-1 inline-block size-2 rounded-sm" />Offline booking</span><span><i className="bg-gray-400 mr-1 inline-block size-2 rounded-sm" />Blocked</span></div>
            </section>

            <section className="rounded-[14px] border border-[#dce3e8] bg-white p-5 md:p-6">
              <div className="flex items-start justify-between"><div><p className="text-green text-xs font-bold uppercase tracking-[0.16em]">Needs a response</p><h2 className="mt-2 text-2xl">Booking requests</h2></div><button type="button" onClick={() => setRequestStatus("pending")} className="text-navy mt-2 text-sm font-bold">View all</button></div>
              {requestStatus === "pending" ? <div className="mt-5 rounded-[11px] border border-line p-4"><div className="flex items-center gap-3"><span className="bg-navy-soft grid size-9 place-items-center rounded-full text-xs font-bold text-navy">SN</span><div className="flex-1"><p className="font-bold">Sneha Nair</p><p className="text-muted text-xs">Engagement · 120 guests</p></div><span className="bg-amber-soft text-amber-ink rounded-full px-2 py-1 text-[10px] font-bold">22h left</span></div><div className="text-muted mt-4 flex flex-wrap gap-4 border-y border-line py-3 text-[11px]"><span>▣ 9 Feb 2026</span><span>◷ Full day</span><span>▣ ₹45,500</span></div><p className="text-muted mt-4 text-xs italic">“We may need access by 7am for floral setup.”</p><div className="mt-3 grid grid-cols-2 gap-2"><button type="button" onClick={() => setRequestStatus("accepted")} className="bg-navy min-h-10 rounded-control font-semibold text-white">Accept request</button><button type="button" onClick={() => setRequestStatus("declined")} className="border-line text-navy min-h-10 rounded-control border font-semibold">Decline</button></div></div> : <div className="mt-5 rounded-[11px] border border-line bg-green-soft p-5"><p className="text-green font-bold">Request {requestStatus}.</p><p className="text-muted mt-1 text-sm">The guest status has been updated in your dashboard.</p><button type="button" onClick={() => setRequestStatus("pending")} className="text-navy mt-4 text-sm font-bold underline">Undo</button></div>}
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
