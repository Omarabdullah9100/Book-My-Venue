import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { t } from "@/lib/strings"

const linkClass = "inline-flex min-h-8 items-center text-[#b9c5d2] hover:text-white"

export function Footer() {
  return (
    <footer className="bg-navy-deep pt-16 text-white">
      <div className="container-page grid gap-10 pb-12 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-12">
        <div className="flex flex-col items-start gap-3">
          <Logo light />
          <p className="leading-relaxed text-[#b9c5d2]">
            {t.brand.tagline}
            <br />
            {t.brand.madeIn}
          </p>
        </div>
        <nav aria-label={t.footer.discover} className="flex flex-col items-start gap-1">
          <strong className="mb-1">{t.footer.discover}</strong>
          <Link className={linkClass} href="/venues?event=wedding">
            {t.footer.weddingVenues}
          </Link>
          <Link className={linkClass} href="/venues?event=community-hall">
            {t.footer.communityHalls}
          </Link>
          <Link className={linkClass} href="/venues?event=corporate">
            {t.footer.corporateVenues}
          </Link>
        </nav>
        <nav aria-label={t.footer.host} className="flex flex-col items-start gap-1">
          <strong className="mb-1">{t.footer.host}</strong>
          <Link className={linkClass} href="/host/onboarding">
            {t.footer.listYourIdam}
          </Link>
          <Link className={linkClass} href="/host">
            {t.footer.hostDashboard}
          </Link>
        </nav>
        <nav aria-label={t.footer.company} className="flex flex-col items-start gap-1">
          <strong className="mb-1">{t.footer.company}</strong>
          <Link className={linkClass} href="/about">
            {t.footer.about}
          </Link>
          <Link className={linkClass} href="/faq">
            {t.footer.help}
          </Link>
          <Link className={linkClass} href="/cancellation-policy">
            {t.footer.cancellation}
          </Link>
        </nav>
      </div>
      <div className="container-page flex flex-wrap justify-between gap-2 border-t border-white/10 py-5 text-xs text-[#9aabba]">
        <span>{t.footer.legal}</span>
        <span className="flex flex-wrap items-center gap-x-3">
          {t.footer.locale}
          <Link className="hover:text-white" href="/privacy">
            {t.footer.privacy}
          </Link>
          <Link className="hover:text-white" href="/terms">
            {t.footer.terms}
          </Link>
        </span>
      </div>
    </footer>
  )
}
