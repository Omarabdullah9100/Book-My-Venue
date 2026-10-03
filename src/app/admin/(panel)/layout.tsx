import { requireRole } from "@/lib/session"

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["ADMIN"], "/admin/login")
  return <>{children}</>
}
