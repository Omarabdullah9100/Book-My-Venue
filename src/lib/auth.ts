export type UserRole = "CUSTOMER" | "OWNER" | "ADMIN"

export type MockSessionUser = {
  id: string
  name: string
  phone: string
  email?: string | null
  role: UserRole
}

export const SESSION_COOKIE = "idam_session"
export const MOCK_OTP = "123456"

export function normalizePhone(phone: string) {
  return phone.trim().replace(/\s+/g, " ") || ""
}

export function getMockOtp(phone: string) {
  const sanitized = normalizePhone(phone).replace(/[^\d]/g, "")
  return sanitized ? MOCK_OTP : ""
}

export function createMockSessionUser({
  phone,
  role = "CUSTOMER",
  email,
  name,
}: {
  phone: string
  role?: UserRole
  email?: string | null
  name?: string
}): MockSessionUser {
  const normalizedPhone = normalizePhone(phone)

  return {
    id: `user_${normalizedPhone.replace(/[^\d]/g, "") || "demo"}`,
    name: name ?? "Idam guest",
    phone: normalizedPhone,
    email: email ?? null,
    role,
  }
}

export function parseSessionCookie(value: string | null | undefined): MockSessionUser | null {
  if (!value) return null

  try {
    const parsed = JSON.parse(value) as Partial<MockSessionUser>
    if (!parsed || typeof parsed !== "object") return null
    if (!parsed.phone || !parsed.role || !parsed.id) return null
    return {
      id: parsed.id,
      name: parsed.name ?? "Idam guest",
      phone: parsed.phone,
      email: parsed.email ?? null,
      role: (parsed.role as UserRole) ?? "CUSTOMER",
    }
  } catch {
    return null
  }
}

export function serializeSessionUser(user: MockSessionUser) {
  return JSON.stringify(user)
}

export function isAllowed(user: MockSessionUser | null, roles: UserRole[] = ["CUSTOMER"]) {
  return Boolean(user && roles.includes(user.role))
}
