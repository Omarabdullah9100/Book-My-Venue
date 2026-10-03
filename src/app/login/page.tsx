import Link from "next/link"
import { redirect } from "next/navigation"
import { logout } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { ROLE_HOME, createMockSessionUser, safeNext, verifyMockOtp } from "@/lib/auth"
import { getSession, startSession } from "@/lib/session"

async function login(formData: FormData) {
  "use server"

  const phone = String(formData.get("phone") ?? "")
  const otp = String(formData.get("otp") ?? "")
  const next = String(formData.get("next") ?? "")

  if (!verifyMockOtp(phone, otp)) {
    const suffix = next ? `&next=${encodeURIComponent(next)}` : ""
    redirect(`/login?error=invalid${suffix}`)
  }

  await startSession(createMockSessionUser({ phone, role: "CUSTOMER", name: "Demo guest" }))
  redirect(safeNext(next, ROLE_HOME.CUSTOMER))
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>
}) {
  const { error, next } = await searchParams
  const session = await getSession()

  return (
    <main className="container-page py-10 md:py-14">
      <div className="mx-auto max-w-lg rounded-[28px] border border-line bg-white p-6 md:p-8">
        <p className="text-muted text-sm font-semibold uppercase tracking-[0.12em]">Welcome back</p>
        <h1 className="mt-2 text-4xl">Log in to Idam</h1>

        {session ? (
          <div className="mt-6 space-y-4 rounded-[20px] border border-line bg-[#faf9f6] p-4">
            <p className="text-lg font-semibold text-navy">Signed in as {session.name}</p>
            {session.phone && <p className="text-muted">Phone: {session.phone}</p>}
            <div className="flex flex-wrap gap-3">
              <Link
                href={ROLE_HOME[session.role]}
                className="bg-navy inline-flex min-h-11 items-center rounded-control px-5 font-semibold text-white"
              >
                Continue
              </Link>
              <form action={logout}>
                <input type="hidden" name="area" value="customer" />
                <Button type="submit" variant="secondary">
                  Log out
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <form action={login} className="mt-6 space-y-4">
            <input type="hidden" name="next" value={next ?? ""} />
            {error && (
              <p role="alert" className="text-red text-sm">
                That mobile number or OTP did not match. Check both and try again.
              </p>
            )}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-navy">Mobile number</span>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+91 98765 43210"
                defaultValue="+91 98765 43210"
                className="w-full rounded-xl border border-line bg-[#f8f6f2] px-3 py-3 outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-navy">One-time password</span>
              <input
                type="text"
                name="otp"
                required
                inputMode="numeric"
                defaultValue="123456"
                className="w-full rounded-xl border border-line bg-[#f8f6f2] px-3 py-3 outline-none"
              />
              <span className="mt-2 inline-block text-sm text-muted">Demo OTP: 123456</span>
            </label>

            <Button type="submit" className="w-full justify-center">
              Sign in
            </Button>
            <p className="text-muted text-center text-sm">
              New to Idam?{" "}
              <Link href="/signup" className="text-navy font-semibold underline">
                Create a guest account
              </Link>
            </p>
            <p className="text-center text-sm">
              <Link href="/owner/login" className="text-navy font-semibold underline">
                I manage a venue
              </Link>
            </p>
          </form>
        )}
      </div>
    </main>
  )
}
