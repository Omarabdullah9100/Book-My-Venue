import Link from "next/link"
import { CalendarDays, MapPin, Search, Sparkles, Users } from "lucide-react"

const eventChips = ["Wedding", "Engagement", "Birthday", "College event", "Corporate", "Community hall"]

export default function HomePage() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#0f2b4d_0%,#102c4b_30%,#1f3a5f_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.18)_1.5px,transparent_0)] [background-size:18px_18px]" />

      <div className="container-page relative px-0 py-10 md:py-12">
        <div className="mx-auto max-w-[1200px] pb-10 pt-8 text-center md:pb-12">
          <div className="mb-7 flex justify-center md:mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#f0d7a5] bg-[#f9f4ea]/8 px-4 py-2 text-sm font-semibold text-[#f3e0b7] backdrop-blur-sm">
              <Sparkles size={14} className="text-[#f0c66a]" aria-hidden="true" />
              Now discovering Kochi & Thrissur
            </span>
          </div>

          <h1 className="mx-auto text-center text-[4.25rem] leading-[0.78] tracking-[-0.065em] text-white md:text-[7.5rem] md:leading-[0.76]">
            <span className="block">Find your</span>
            <span className="font-display block italic text-[#f0c66a]">idam.</span>
          </h1>

          <div className="mx-auto mt-6 flex max-w-[1180px] items-center justify-center gap-4 text-left md:mt-7">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4f1ec] text-xl font-semibold text-[#203a5b] shadow-[0_0_0_2px_rgba(255,255,255,0.1)]">
              N
            </span>
            <p className="text-left text-[1.05rem] leading-[1.15] tracking-[-0.03em] text-[#eaf1fb] md:text-[1.45rem] md:leading-[1.25]">
              A place for every occasion. Discover verified venues, see the real price, and book with confidence.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-[1180px] rounded-[22px] bg-[#f4f1ec] p-3 shadow-[0_18px_40px_rgba(0,0,0,0.15)] md:mt-9 md:p-4">
            <div className="mb-2 flex items-center gap-2 px-1 text-left text-[#304d73]">
              <Sparkles size={16} className="text-[#dd9d2f]" aria-hidden="true" />
              <span className="text-sm font-semibold">Ask Idam</span>
              <span className="text-sm text-[#6e7f92]">50-person birthday, Saturday evening, under ₹15,000</span>
            </div>

            <form method="get" action="/venues" className="grid gap-2 md:grid-cols-[1fr_1fr_1fr_1fr_auto]">
              <label className="flex flex-col gap-1.5 rounded-[12px] border border-[#dde3ea] bg-white px-3 py-2.5 text-left">
                <span className="text-[11px] font-semibold tracking-[0.18em] text-[#607387] uppercase">Occasion</span>
                <div className="flex items-center gap-2 text-[#233b5e]">
                  <Sparkles size={16} className="text-[#2e496b]" aria-hidden="true" />
                  <select name="event" defaultValue="Wedding" className="w-full bg-transparent text-lg font-medium text-[#233b5e] outline-none">
                    <option value="Wedding">Wedding</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Birthday">Birthday</option>
                    <option value="College event">College event</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Community hall">Community hall</option>
                  </select>
                </div>
              </label>

              <label className="flex flex-col gap-1.5 rounded-[12px] border border-[#dde3ea] bg-white px-3 py-2.5 text-left">
                <span className="text-[11px] font-semibold tracking-[0.18em] text-[#607387] uppercase">Where</span>
                <div className="flex items-center gap-2 text-[#233b5e]">
                  <MapPin size={16} className="text-[#2e496b]" aria-hidden="true" />
                  <select name="city" defaultValue="Kochi" className="w-full bg-transparent text-lg font-medium text-[#233b5e] outline-none">
                    <option value="Kochi">Kochi</option>
                    <option value="Thrissur">Thrissur</option>
                    <option value="Ernakulam">Ernakulam</option>
                  </select>
                </div>
              </label>

              <label className="flex flex-col gap-1.5 rounded-[12px] border border-[#dde3ea] bg-white px-3 py-2.5 text-left">
                <span className="text-[11px] font-semibold tracking-[0.18em] text-[#607387] uppercase">When</span>
                <div className="flex items-center gap-2 text-[#233b5e]">
                  <CalendarDays size={16} className="text-[#2e496b]" aria-hidden="true" />
                  <input type="date" name="date" className="w-full bg-transparent text-lg font-medium text-[#233b5e] outline-none" defaultValue="2026-01-26" />
                </div>
              </label>

              <label className="flex flex-col gap-1.5 rounded-[12px] border border-[#dde3ea] bg-white px-3 py-2.5 text-left">
                <span className="text-[11px] font-semibold tracking-[0.18em] text-[#607387] uppercase">Guests</span>
                <div className="flex items-center gap-2 text-[#233b5e]">
                  <Users size={16} className="text-[#2e496b]" aria-hidden="true" />
                  <input type="number" name="guests" min="1" defaultValue={150} className="w-full bg-transparent text-lg font-medium text-[#233b5e] outline-none" />
                </div>
              </label>

              <button type="submit" className="flex items-center justify-center gap-2 rounded-[12px] bg-[#1f3a5f] px-6 py-2.5 text-base font-semibold text-white shadow-[0_10px_22px_rgba(17,38,61,0.2)] hover:bg-[#142b49]">
                <Search size={18} aria-hidden="true" />
                Search
              </button>
            </form>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 md:gap-3">
            {eventChips.map((chip, index) => (
              <Link
                key={chip}
                href={`/venues?event=${encodeURIComponent(chip)}`}
                className={[
                  "rounded-full border px-4 py-2 text-base font-medium transition",
                  index === 0
                    ? "border-[#f0d7a5] bg-[#f0d7a5]/10 text-white shadow-[0_0_0_1px_rgba(240,215,165,0.2)]"
                    : "border-[#c7d5e5]/60 bg-white/6 text-[#ecf2ff] hover:bg-white/10",
                ].join(" ")}
              >
                {chip}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
