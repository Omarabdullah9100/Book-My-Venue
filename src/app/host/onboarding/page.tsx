"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, Upload } from "lucide-react"

const steps = ["Venue basics", "Photos & amenities", "Pricing & availability"]

export default function HostOnboardingPage() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <main className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-2xl rounded-[24px] border border-line bg-white p-8 text-center md:p-12">
          <span className="bg-green-soft text-green mx-auto grid size-14 place-items-center rounded-full"><Check size={28} /></span>
          <p className="text-green mt-6 text-xs font-bold uppercase tracking-[0.18em]">Listing submitted</p>
          <h1 className="mt-3 text-4xl">Your venue is on its way.</h1>
          <p className="text-muted mx-auto mt-3 max-w-lg leading-relaxed">We will review the details and contact you within one business day. You can continue managing the listing from your host dashboard.</p>
          <Link href="/host" className="bg-navy mt-7 inline-flex min-h-11 items-center justify-center rounded-control px-5 font-semibold text-white">Go to host dashboard</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="container-page py-10 md:py-14">
      <div className="mx-auto max-w-3xl rounded-[24px] border border-line bg-white p-6 md:p-8">
        <Link href="/host" className="text-navy inline-flex items-center gap-2 text-sm font-semibold"><ArrowLeft size={16} /> Host dashboard</Link>
        <p className="text-green mt-8 text-xs font-bold uppercase tracking-[0.18em]">List your idam</p>
        <h1 className="mt-3 text-4xl">List your venue in a few steps</h1>
        <div className="mt-8 grid grid-cols-3 gap-2">
          {steps.map((label, index) => <div key={label} className={`border-t-2 pt-3 text-xs font-bold ${index <= step ? "border-navy text-navy" : "border-line text-muted"}`}><span>{index + 1}. </span>{label}</div>)}
        </div>

        <form className="mt-8 space-y-5" onSubmit={(event) => { event.preventDefault(); if (step < steps.length - 1) setStep((value) => value + 1); else setSubmitted(true) }}>
          {step === 0 && <div className="space-y-5"><label className="block"><span className="text-navy mb-2 block text-sm font-semibold">Venue name</span><input required name="venueName" placeholder="The Fern Courtyard" className="w-full rounded-xl border border-line bg-[#f8f6f2] px-3 py-3 outline-none" /></label><div className="grid gap-4 md:grid-cols-2"><label className="block"><span className="text-navy mb-2 block text-sm font-semibold">City</span><select name="city" className="w-full rounded-xl border border-line bg-[#f8f6f2] px-3 py-3 outline-none"><option>Kochi</option><option>Thrissur</option></select></label><label className="block"><span className="text-navy mb-2 block text-sm font-semibold">Guest capacity</span><input required name="capacity" type="number" min="1" placeholder="250" className="w-full rounded-xl border border-line bg-[#f8f6f2] px-3 py-3 outline-none" /></label></div></div>}
          {step === 1 && <div className="space-y-5"><label className="border-line bg-[#faf9f6] flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-10 text-center"><Upload className="text-navy" size={25} /><span className="text-navy mt-3 font-semibold">Upload venue photos</span><span className="text-muted mt-1 text-sm">JPG or PNG, up to 10 images</span><input type="file" accept="image/*" multiple className="sr-only" /></label><fieldset><legend className="text-navy text-sm font-semibold">Amenities</legend><div className="mt-3 grid gap-3 sm:grid-cols-2">{["Parking", "Stage", "Catering", "Power backup"].map((amenity) => <label key={amenity} className="border-line flex items-center gap-3 rounded-xl border p-3 text-sm"><input type="checkbox" name="amenities" value={amenity} />{amenity}</label>)}</div></fieldset></div>}
          {step === 2 && <div className="space-y-5"><label className="block"><span className="text-navy mb-2 block text-sm font-semibold">Starting full-day price</span><div className="flex items-center rounded-xl border border-line bg-[#f8f6f2] px-3"><span className="text-muted">₹</span><input required name="price" type="number" min="1" placeholder="25000" className="w-full bg-transparent px-2 py-3 outline-none" /></div></label><label className="flex items-center gap-3 rounded-xl border border-line bg-[#faf9f6] p-4 text-sm"><input type="checkbox" name="instantBooking" /> Allow instant booking for verified guests</label><p className="text-muted text-sm leading-relaxed">After submission, our team will verify your details before the venue appears in search.</p></div>}
          <div className="flex justify-between gap-3 pt-3">{step > 0 ? <button type="button" onClick={() => setStep((value) => value - 1)} className="border-line text-navy inline-flex min-h-11 items-center gap-2 rounded-control border px-5 font-semibold">Back</button> : <span /> }<button type="submit" className="bg-navy inline-flex min-h-11 items-center gap-2 rounded-control px-5 font-semibold text-white">{step === steps.length - 1 ? "Submit listing" : "Continue"}<ArrowRight size={17} /></button></div>
        </form>
      </div>
    </main>
  )
}
