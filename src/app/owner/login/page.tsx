import Link from "next/link"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { Button } from "@/components/ui/button"
import { SESSION_COOKIE, createMockSessionUser, getMockOtp, serializeSessionUser } from "@/lib/auth"

async function ownerLogin(formData: FormData) {
  "use server"
  const phone = String(formData.get("phone") ?? "")
  const otp = String(formData.get("otp") ?? "")
  if (!phone || getMockOtp(phone) !== otp) redirect("/owner/login?error=invalid")
  const store = await cookies()
  store.set(SESSION_COOKIE, serializeSessionUser(createMockSessionUser({ name: "Arun Menon", phone, role: "OWNER" })), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 })
  redirect("/host")
}

export default function OwnerLoginPage() {
  return <main className="container-page py-10 md:py-14"><div className="mx-auto max-w-lg rounded-[28px] border border-line bg-white p-6 md:p-8"><p className="text-green text-xs font-bold uppercase tracking-[0.16em]">Venue owners</p><h1 className="mt-3 text-4xl">Log in to your host workspace</h1><p className="text-muted mt-3 text-sm">Manage availability, requests, listing details, and payouts.</p><form action={ownerLogin} className="mt-7 space-y-4"><label className="block"><span className="text-navy mb-2 block text-sm font-semibold">Mobile number</span><input required name="phone" defaultValue="+91 98765 43210" className="w-full rounded-xl border border-line bg-[#f8f6f2] px-3 py-3 outline-none" /></label><label className="block"><span className="text-navy mb-2 block text-sm font-semibold">One-time password</span><input required name="otp" defaultValue="123456" className="w-full rounded-xl border border-line bg-[#f8f6f2] px-3 py-3 outline-none" /><span className="text-muted mt-2 inline-block text-xs">Demo OTP: 123456</span></label><Button type="submit" className="w-full justify-center">Open host dashboard</Button></form><p className="text-muted mt-6 text-center text-sm">Looking for venues? <Link href="/login" className="text-navy font-semibold underline">Customer login</Link></p></div></main>
}
