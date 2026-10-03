"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { ButtonLink, buttonClass } from "@/components/ui/button"
import { cn } from "@/lib/cn"
import { t } from "@/lib/strings"

const navItems = [
  { label: t.nav.explore, href: "/venues" },
  { label: t.nav.myBookings, href: "/account/bookings" },
  { label: t.nav.forOwners, href: "/host" },
] as const

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="border-line bg-cream/90 sticky top-0 z-40 border-b backdrop-blur">
      <div className="container-page flex min-h-[64px] items-center justify-between gap-4">
        <Logo />
        <nav aria-label={t.nav.main} className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-3 py-1.5 text-[13px] font-semibold transition",
                isActive(item.href) ? "text-navy" : "text-navy/80 hover:bg-navy-soft",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ButtonLink href="/login" variant="secondary" className="px-5 py-2 text-[13px]">
            {t.nav.login}
          </ButtonLink>
          <button
            type="button"
            className={buttonClass("ghost", "px-3 md:hidden")}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          aria-label={t.nav.main}
          className="border-line container-page flex flex-col border-t py-2 md:hidden"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={buttonClass("ghost", "justify-start")}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
