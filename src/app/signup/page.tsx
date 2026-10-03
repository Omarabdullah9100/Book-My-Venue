import Link from "next/link"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { Button } from "@/components/ui/button"
import { SESSION_COOKIE, createMockSessionUser, getMockOtp, serializeSessionUser } from "@/lib/auth"

async function signup(formData: FormData) {
  "use server"
  const name = String(formData.get("name") ?? "").trim()
  const phone = String(formData.get("phone") ?? "")
  const otp = String(formData.get("otp") ?? "")
  if (!name || !phone || getMockOtp(phone) !== otp) redirect("/signup?error=invalid")
  const store = await cookies()
  store.set(SESSION_COOKIE, serializeSessionUser(createMockSessionUser({ name, phone, role: "CUSTOMER" })), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 })
  redirect("/account/bookings")
}

export default function SignupPage() {
  return <main className="container-page py-10 md:py-14"><div className="mx-auto max-w-lg rounded-[28px] border border-line bg-white p-6 md:p-8"><p className="text-green text-xs font-bold uppercase tracking-[0.16em]">New to Idam?</p><h1 className="mt-3 text-4xl">Create your guest account</h1><p className="text-muted mt-3 text-sm">Save venues, manage bookings, and review places after your event.</p><form action={signup} className="mt-7 space-y-4"><label className="block"><span className="text-navy mb-2 block text-sm font-semibold">Your name</span><input required name="name" className="w-full rounded-xl border border-line bg-[#f8f6f2] px-3 py-3 outline-none" /></label><label className="block"><span className="text-navy mb-2 block text-sm font-semibold">Mobile number</span><input required name="phone" defaultValue="+91 98765 43210" className="w-full rounded-xl border border-line bg-[#f8f6f2] px-3 py-3 outline-none" /></label><label className="block"><span className="text-navy mb-2 block text-sm font-semibold">One-time password</span><input required name="otp" defaultValue="123456" className="w-full rounded-xl border border-line bg-[#f8f6f2] px-3 py-3 outline-none" /><span className="text-muted mt-2 inline-block text-xs">Demo OTP: 123456</span></label><Button type="submit" className="w-full justify-center">Create account</Button></form><p className="text-muted mt-6 text-center text-sm">Already have an account? <Link href="/login" className="text-navy font-semibold underline">Log in</Link></p><p className="mt-3 text-center text-sm"><Link href="/owner/login" className="text-navy font-semibold underline">I manage a venue</Link></p></div></main>
}
