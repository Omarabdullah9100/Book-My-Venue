"use client"

import { useState } from "react"
import { OwnerPage } from "@/components/layout/owner-page"

export default function HostRequestsPage() {
  const [status, setStatus] = useState<"pending" | "accepted" | "declined">("pending")
  return <OwnerPage title="Requests" eyebrow="Needs a response"><h2 className="mt-3 text-3xl">Booking requests</h2><div className="mt-6 max-w-2xl rounded-[14px] border border-line bg-white p-5">{status === "pending" ? <><div className="flex items-center justify-between"><div><h3 className="text-xl font-bold">Sneha Nair</h3><p className="text-muted text-sm">Engagement · 120 guests · 9 Feb 2026</p></div><span className="bg-amber-soft text-amber-ink rounded-full px-3 py-1 text-xs font-bold">22h left</span></div><p className="text-muted mt-5 border-y border-line py-4 text-sm italic">“We may need access by 7am for floral setup.”</p><div className="mt-4 flex gap-3"><button onClick={() => setStatus("accepted")} className="bg-navy rounded-control px-5 py-3 font-semibold text-white">Accept request</button><button onClick={() => setStatus("declined")} className="border-line text-navy rounded-control border px-5 py-3 font-semibold">Decline</button></div></> : <><p className="text-green text-lg font-bold">Request {status}.</p><p className="text-muted mt-2 text-sm">The guest has been notified of the updated status.</p><button onClick={() => setStatus("pending")} className="text-navy mt-4 text-sm font-bold underline">Undo</button></>}</div></OwnerPage>
}
