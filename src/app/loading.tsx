import { Skeleton } from "@/components/ui/skeleton"
import { t } from "@/lib/strings"

export default function Loading() {
  return (
    <div className="container-page space-y-4 py-16" role="status" aria-label={t.states.loading}>
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-64 w-full" />
    </div>
  )
}
