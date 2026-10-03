import { requireRole } from "@/lib/session"

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["CUSTOMER"], "/login")
  return <>{children}</>
}
