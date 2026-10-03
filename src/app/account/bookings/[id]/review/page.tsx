"use client"

import Link from "next/link"
import { useState } from "react"
import { Check, Star } from "lucide-react"

export default function WriteReviewPage() {
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  if (submitted) return <main className="container-page py-14"><div className="mx-auto max-w-lg rounded-[24px] border border-line bg-white p-10 text-center"><span className="bg-green-soft text-green mx-auto grid size-14 place-items-center rounded-full"><Check /></span><h1 className="mt-5 text-3xl">Thanks for sharing.</h1><p className="text-muted mt-2">Your review is sent to the venue owner for verification before it appears publicly.</p><Link href="/account/bookings" className="bg-navy mt-6 inline-flex rounded-control px-5 py-3 font-semibold text-white">Back to bookings</Link></div></main>
  return <main className="container-page py-10 md:py-14"><div className="mx-auto max-w-2xl rounded-[24px] border border-line bg-white p-6 md:p-8"><p className="text-green text-xs font-bold uppercase tracking-[0.16em]">After your event</p><h1 className="mt-3 text-4xl">How was The Fern Courtyard?</h1><p className="text-muted mt-2">Your review helps other guests choose with confidence.</p><div className="mt-8"><p className="text-navy text-sm font-semibold">Overall rating</p><div className="mt-3 flex gap-2">{[1,2,3,4,5].map((value) => <button type="button" key={value} aria-label={`${value} stars`} onClick={() => setRating(value)} className={`rounded-md p-1 ${value <= rating ? "text-amber" : "text-gray-300"}`}><Star size={34} fill="currentColor" /></button>)}</div><p className="text-muted mt-2 text-sm">{rating ? `${rating} out of 5` : "Select a rating"}</p></div><label className="mt-7 block"><span className="text-navy mb-2 block text-sm font-semibold">Tell us about your experience</span><textarea required rows={6} placeholder="What should future guests know?" className="w-full rounded-xl border border-line bg-[#f8f6f2] px-3 py-3 outline-none" /></label><button type="button" disabled={!rating} onClick={() => setSubmitted(true)} className="bg-navy mt-6 min-h-11 rounded-control px-5 font-semibold text-white disabled:opacity-50">Submit review</button></div></main>
}
