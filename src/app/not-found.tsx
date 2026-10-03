import { ButtonLink } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container-page py-24">
      <h1 className="text-4xl!">We can&apos;t find that page</h1>
      <p className="text-muted mt-4 max-w-md">
        The link may be old, or the venue may no longer be listed.
      </p>
      <ButtonLink href="/venues" className="mt-6">
        Browse venues
      </ButtonLink>
    </div>
  )
}
