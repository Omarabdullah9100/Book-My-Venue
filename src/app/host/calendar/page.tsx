"use client"

import { useState } from "react"
import { OwnerPage } from "@/components/layout/owner-page"

export default function HostCalendarPage() {
  const [selected, setSelected] = useState<number | null>(null)
  const [blocked, setBlocked] = useState<number[]>([])
  return <OwnerPage title="Calendar" eyebrow="January 2026"><div className="mt-3 flex items-end justify-between"><div><h2 className="text-3xl">Availability calendar</h2><p className="text-muted mt-2">Select a date, then block or release it for your venue.</p></div><button type="button" disabled={!selected} onClick={() => selected && setBlocked((items) => items.includes(selected) ? items.filter((item) => item !== selected) : [...items, selected])} className="bg-navy rounded-control px-5 py-3 font-semibold text-white disabled:opacity-50">{selected && blocked.includes(selected) ? `Release ${selected} Jan` : "Block selected date"}</button></div><section className="mt-6 max-w-3xl rounded-[14px] border border-line bg-white p-6"><div className="grid grid-cols-7 gap-3 text-center text-sm">{["S","M","T","W","T","F","S"].map((day, index) => <span key={`${day}-${index}`} className="text-muted text-xs font-bold">{day}</span>)}{Array.from({ length: 35 }, (_, index) => index - 1).map((day, index) => <button type="button" key={`${day}-${index}`} onClick={() => day > 0 && setSelected(day)} disabled={day < 1} className={`grid h-14 place-items-center rounded-lg text-sm ${day === selected ? "bg-navy text-white" : blocked.includes(day) ? "bg-gray-200 text-gray-500 line-through" : "text-navy hover:bg-navy-soft"}`}>{day > 0 ? day : ""}</button>)}</div><p className="text-muted mt-6 text-sm">{selected ? `Selected: 24 January ${selected}.` : "Choose an available date to begin."}</p></section></OwnerPage>
}
