import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ROLE_HOME, createAdminSessionUser, safeNext, verifyAdminCredentials } from "@/lib/auth"
import { startSession } from "@/lib/session"

async function adminLogin(formData: FormData) {
  "use server"

  const email = String(formData.get("email") ?? "")
  const password = String(formData.get("password") ?? "")
  const next = String(formData.get("next") ?? "")

  if (!verifyAdminCredentials(email, password)) redirect("/admin/login?error=invalid")

  await startSession(createAdminSessionUser(email))
  redirect(safeNext(next, ROLE_HOME.ADMIN))
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>
}) {
  const { error, next } = await searchParams
  const configured = Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD)

  return (
    <main className="container-page py-10 md:py-14">
      <div className="mx-auto max-w-lg rounded-[28px] border border-line bg-white p-6 md:p-8">
        <p className="text-green text-xs font-bold uppercase tracking-[0.16em]">Idam team</p>
        <h1 className="mt-3 text-4xl">Admin sign in</h1>
        <p className="text-muted mt-3 text-sm">
          Approve venues, review bookings, and manage the marketplace.
        </p>
        {!configured && process.env.NODE_ENV !== "production" && (
          <p className="bg-amber-soft text-amber-ink mt-5 rounded-lg px-3 py-2 text-sm">
            Set ADMIN_EMAIL and ADMIN_PASSWORD in .env to enable admin sign in.
          </p>
        )}
        <form action={adminLogin} className="mt-7 space-y-4">
          <input type="hidden" name="next" value={next ?? ""} />
          {error && (
            <p role="alert" className="text-red text-sm">
              The email or password is incorrect.
            </p>
          )}
          <label className="block">
            <span className="text-navy mb-2 block text-sm font-semibold">Email</span>
            <input
              required
              type="email"
              name="email"
              autoComplete="username"
              className="w-full rounded-xl border border-line bg-[#f8f6f2] px-3 py-3 outline-none"
            />
          </label>
          <label className="block">
            <span className="text-navy mb-2 block text-sm font-semibold">Password</span>
            <input
              required
              type="password"
              name="password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-line bg-[#f8f6f2] px-3 py-3 outline-none"
            />
          </label>
          <Button type="submit" className="w-full justify-center">
            Sign in
          </Button>
        </form>
      </div>
    </main>
  )
}
