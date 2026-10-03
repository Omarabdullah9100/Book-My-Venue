import { requireRole } from "@/lib/session"

export default async function HostLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["OWNER", "ADMIN"], "/owner/login")
  return <>{children}</>
}
