import Link from "next/link"
import { LayoutDashboard, LogOut, ShieldCheck } from "lucide-react"
import { logout } from "@/app/actions/auth"
import { Logo } from "@/components/ui/logo"
import { cn } from "@/lib/cn"

const items = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Venue approvals", href: "/admin/venues", icon: ShieldCheck },
] as const

export function AdminPage({
  title,
  active,
  children,
}: {
  title: string
  active: (typeof items)[number]["href"]
  children: React.ReactNode
}) {
  const signOut = (
    <form action={logout}>
      <input type="hidden" name="area" value="admin" />
      <button
        type="submit"
        className="flex min-h-11 w-full items-center gap-3 px-3 text-sm font-semibold text-white/80"
      >
        <LogOut size={17} aria-hidden="true" /> Sign out
      </button>
    </form>
  )

  return (
    <div className="flex min-h-screen bg-[#f3f6f8] text-[#1d2b3a]">
      <aside className="hidden w-[208px] shrink-0 flex-col bg-[#0f2d4f] px-4 py-7 text-white md:flex">
        <Logo light className="px-2 text-[1.5rem]" />
        <span className="bg-amber text-navy-deep mt-3 ml-10 w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase">
          Admin
        </span>
        <nav aria-label="Admin" className="mt-7 flex flex-col gap-1">
          {items.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={active === href ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-[8px] px-3 text-sm font-semibold",
                active === href ? "bg-white/15" : "text-white/75 hover:bg-white/10",
              )}
            >
              <Icon size={17} aria-hidden="true" /> {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">{signOut}</div>
      </aside>

      <main id="main" className="min-w-0 flex-1">
        <header className="flex min-h-[80px] items-center justify-between border-b border-[#dce3e8] bg-white px-6 md:px-9">
          <h1 className="text-2xl">{title}</h1>
          <nav aria-label="Admin" className="flex gap-4 text-sm font-semibold md:hidden">
            {items.map(({ label, href }) => (
              <Link key={href} href={href} className="text-navy">
                {label}
              </Link>
            ))}
          </nav>
        </header>
        <div className="p-5 md:p-8">{children}</div>
      </main>
    </div>
  )
}
