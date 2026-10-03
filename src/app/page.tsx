import { ButtonLink } from "@/components/ui/button"
import { t } from "@/lib/strings"

/** Placeholder home. The real event-first search home page lands in M2. */
export default function HomePage() {
  return (
    <section className="container-page py-24">
      <h1 className="max-w-3xl">{t.home.headline}</h1>
      <p className="text-muted mt-6 max-w-xl text-lg leading-relaxed">{t.brand.tagline}</p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/styleguide">Component styleguide</ButtonLink>
        <ButtonLink href="/host" variant="secondary">
          {t.home.listCta}
        </ButtonLink>
      </div>
    </section>
  )
}
