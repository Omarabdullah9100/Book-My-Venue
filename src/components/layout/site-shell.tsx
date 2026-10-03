"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHostRoute = pathname.startsWith("/host")

  if (isHostRoute) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  )
}
