import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { Button } from "@/components/ui/button"
import { SESSION_COOKIE, getMockOtp, parseSessionCookie } from "@/lib/auth"
import Link from "next/link"

async function login(formData: FormData) {
  "use server"

  const phone = String(formData.get("phone") ?? "")
  const otp = String(formData.get("otp") ?? "")
  if (!phone || getMockOtp(phone) !== otp) {
    redirect("/login?error=invalid")
  }

  const session = {
    id: `user_${phone.replace(/[^\d]/g, "") || "demo"}`,
    name: "Demo guest",
    phone,
    email: null,
    role: "CUSTOMER",
  }

  const store = await cookies()
  store.set(SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })

  redirect("/account/bookings")
}

export default async function LoginPage() {
  const store = await cookies()
  const session = parseSessionCookie(store.get(SESSION_COOKIE)?.value ?? null)

  return (
    <main className="container-page py-10 md:py-14">
      <div className="mx-auto max-w-lg rounded-[28px] border border-line bg-white p-6 md:p-8">
        <p className="text-muted text-sm font-semibold uppercase tracking-[0.12em]">Welcome back</p>
        <h1 className="mt-2 text-4xl">Log in to Idam</h1>

        {session ? (
          <div className="mt-6 space-y-4 rounded-[20px] border border-line bg-[#faf9f6] p-4">
            <p className="text-lg font-semibold text-navy">Signed in as {session.name}</p>
            <p className="text-muted">Phone: {session.phone}</p>
            <form
              action={async () => {
                "use server"
                const store = await cookies()
                store.delete(SESSION_COOKIE)
                redirect("/login")
              }}
            >
              <Button type="submit" variant="secondary">Log out</Button>
            </form>
          </div>
        ) : (
          <form action={login} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-navy">Mobile number</span>
              <input
                type="tel"
                name="phone"
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
                defaultValue="123456"
                className="w-full rounded-xl border border-line bg-[#f8f6f2] px-3 py-3 outline-none"
              />
              <span className="mt-2 inline-block text-sm text-muted">Demo OTP: 123456</span>
            </label>

            <Button type="submit" className="w-full justify-center">
              Sign in
            </Button>
            <p className="text-muted text-center text-sm">New to Idam? <Link href="/signup" className="text-navy font-semibold underline">Create a guest account</Link></p>
            <p className="text-center text-sm"><Link href="/owner/login" className="text-navy font-semibold underline">I manage a venue</Link></p>
          </form>
        )}
      </div>
    </main>
  )
}
