"use client"

import { Button } from "@/components/ui/button"
import { t } from "@/lib/strings"

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-page py-24">
      <h1 className="text-4xl!">{t.states.errorTitle}</h1>
      <p className="text-muted mt-4 max-w-md">{t.states.errorBody}</p>
      <Button className="mt-6" onClick={reset}>
        {t.states.retry}
      </Button>
    </div>
  )
}
