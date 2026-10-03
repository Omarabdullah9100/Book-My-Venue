import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ToastProvider } from "@/components/ui/toast"
import { t } from "@/lib/strings"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["600", "700"],
  style: ["normal", "italic"],
  display: "swap",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `Idam — ${t.brand.tagline}`, template: "%s · Idam" },
  description:
    "Find, compare and book halls and event spaces across Kerala with live availability and transparent pricing.",
  openGraph: { siteName: "Idam", type: "website", locale: "en_IN" },
}

export const viewport: Viewport = { themeColor: "#1f3a5f", width: "device-width", initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="bg-navy-deep fixed top-2 left-2 z-[100] -translate-y-20 rounded-md px-3 py-2 text-sm font-semibold text-white focus:translate-y-0"
        >
          Skip to content
        </a>
        <ToastProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  )
}
