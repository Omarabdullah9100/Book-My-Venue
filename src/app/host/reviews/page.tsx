"use client"

import { useState } from "react"
import { Check, Star } from "lucide-react"
import { OwnerPage } from "@/components/layout/owner-page"

export default function HostReviewsPage() {
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">("pending")
  return <OwnerPage title="Reviews" eyebrow="Needs verification"><h2 className="mt-3 text-3xl">Review moderation</h2><p className="text-muted mt-2">Approve guest reviews before they appear on your venue listing.</p><section className="mt-6 max-w-2xl rounded-[14px] border border-line bg-white p-5">{status === "pending" ? <><div className="flex items-center justify-between"><div><h3 className="text-xl font-bold">Anjali Menon</h3><p className="text-muted text-sm">The Fern Courtyard · 26 Jan 2026</p></div><div className="flex text-amber">{[1,2,3,4,5].map((value) => <Star key={value} size={17} fill="currentColor" />)}</div></div><p className="mt-5 leading-relaxed">“Beautiful venue and a very easy planning process. The team helped us adjust the layout for our function.”</p><div className="mt-5 flex gap-3"><button onClick={() => setStatus("approved")} className="bg-navy inline-flex items-center gap-2 rounded-control px-5 py-3 font-semibold text-white"><Check size={17} />Approve review</button><button onClick={() => setStatus("rejected")} className="border-line text-navy rounded-control border px-5 py-3 font-semibold">Reject</button></div></> : <><p className="text-green text-lg font-bold">Review {status}.</p><p className="text-muted mt-2 text-sm">The venue listing has been updated.</p><button onClick={() => setStatus("pending")} className="text-navy mt-4 text-sm font-bold underline">Undo</button></>}</section></OwnerPage>
}
