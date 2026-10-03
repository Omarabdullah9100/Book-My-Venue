import Link from "next/link"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ROLE_HOME, createMockSessionUser, safeNext, verifyMockOtp } from "@/lib/auth"
import { startSession } from "@/lib/session"

async function ownerLogin(formData: FormData) {
  "use server"

  const phone = String(formData.get("phone") ?? "")
  const otp = String(formData.get("otp") ?? "")
  const next = String(formData.get("next") ?? "")

  if (!verifyMockOtp(phone, otp)) redirect("/owner/login?error=invalid")

  await startSession(createMockSessionUser({ name: "Arun Menon", phone, role: "OWNER" }))
  redirect(safeNext(next, ROLE_HOME.OWNER))
}

export default async function OwnerLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>
}) {
  const { error, next } = await searchParams

  return (
    <main className="container-page py-10 md:py-14">
      <div className="mx-auto max-w-lg rounded-[28px] border border-line bg-white p-6 md:p-8">
        <p className="text-green text-xs font-bold uppercase tracking-[0.16em]">Venue owners</p>
        <h1 className="mt-3 text-4xl">Log in to your host workspace</h1>
        <p className="text-muted mt-3 text-sm">
          Manage availability, requests, listing details, and payouts.
        </p>
        <form action={ownerLogin} className="mt-7 space-y-4">
          <input type="hidden" name="next" value={next ?? ""} />
          {error && (
            <p role="alert" className="text-red text-sm">
              That mobile number or OTP did not match. Check both and try again.
            </p>
          )}
          <label className="block">
            <span className="text-navy mb-2 block text-sm font-semibold">Mobile number</span>
            <input
              required
              type="tel"
              name="phone"
              defaultValue="+91 98765 43210"
              className="w-full rounded-xl border border-line bg-[#f8f6f2] px-3 py-3 outline-none"
            />
          </label>
          <label className="block">
            <span className="text-navy mb-2 block text-sm font-semibold">One-time password</span>
            <input
              required
              name="otp"
              inputMode="numeric"
              defaultValue="123456"
              className="w-full rounded-xl border border-line bg-[#f8f6f2] px-3 py-3 outline-none"
            />
            <span className="text-muted mt-2 inline-block text-xs">Demo OTP: 123456</span>
          </label>
          <Button type="submit" className="w-full justify-center">
            Open host dashboard
          </Button>
        </form>
        <p className="text-muted mt-6 text-center text-sm">
          Looking for venues?{" "}
          <Link href="/login" className="text-navy font-semibold underline">
            Customer login
          </Link>
        </p>
      </div>
    </main>
  )
}
