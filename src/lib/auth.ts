import { createHash, createHmac, timingSafeEqual } from "node:crypto"

export type UserRole = "CUSTOMER" | "OWNER" | "ADMIN"

export const USER_ROLES: readonly UserRole[] = ["CUSTOMER", "OWNER", "ADMIN"]

export type MockSessionUser = {
  id: string
  name: string
  /** Empty for admins, who sign in with email and password. */
  phone: string
  email?: string | null
  role: UserRole
}

export const SESSION_COOKIE = "idam_session"
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7
export const MOCK_OTP = "123456"

/** Where each role lands after signing in. */
export const ROLE_HOME: Record<UserRole, string> = {
  CUSTOMER: "/account/bookings",
  OWNER: "/host",
  ADMIN: "/admin",
}

/** The demo OTP is for development only. Production needs ALLOW_MOCK_AUTH=true to keep it. */
export function isMockAuthEnabled() {
  return process.env.NODE_ENV !== "production" || process.env.ALLOW_MOCK_AUTH === "true"
}

export function normalizePhone(phone: string) {
  return phone.trim().replace(/\s+/g, " ") || ""
}

/** 10-digit national number, with an optional +91 or 0 prefix removed. */
function nationalNumber(phone: string) {
  const digits = phone.replace(/\D/g, "")
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2)
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1)
  return digits
}

export function isValidIndianMobile(phone: string) {
  return /^[6-9]\d{9}$/.test(nationalNumber(phone))
}

export function getMockOtp(phone: string) {
  return isMockAuthEnabled() && isValidIndianMobile(phone) ? MOCK_OTP : ""
}

/** An empty OTP never matches, even for an invalid phone number. */
export function verifyMockOtp(phone: string, otp: string) {
  const expected = getMockOtp(phone)
  return expected !== "" && otp === expected
}

function digest(value: string) {
  return createHash("sha256").update(value).digest()
}

/** Admin credentials come from ADMIN_EMAIL and ADMIN_PASSWORD until admins live in the database. */
export function verifyAdminCredentials(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminEmail || !adminPassword) return false
  const emailOk = timingSafeEqual(
    digest(email.trim().toLowerCase()),
    digest(adminEmail.trim().toLowerCase()),
  )
  const passwordOk = timingSafeEqual(digest(password), digest(adminPassword))
  return emailOk && passwordOk
}

export function createAdminSessionUser(email: string): MockSessionUser {
  return {
    id: `admin_${digest(email.trim().toLowerCase()).toString("hex").slice(0, 12)}`,
    name: "Idam admin",
    phone: "",
    email: email.trim().toLowerCase(),
    role: "ADMIN",
  }
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

function secret() {
  const value = process.env.AUTH_SECRET
  if (value) return value
  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET must be set in production")
  }
  return "idam-dev-only-secret"
}

function sign(body: string) {
  return createHmac("sha256", secret()).update(body).digest("base64url")
}

/** Signed, expiring cookie value: base64url(payload).hmac. Role changes need the secret. */
export function serializeSessionUser(user: MockSessionUser, now = Date.now()) {
  const exp = Math.floor(now / 1000) + SESSION_MAX_AGE_SECONDS
  const body = Buffer.from(JSON.stringify({ ...user, exp })).toString("base64url")
  return `${body}.${sign(body)}`
}

export function parseSessionCookie(
  value: string | null | undefined,
  now = Date.now(),
): MockSessionUser | null {
  if (!value) return null

  const parts = value.split(".")
  if (parts.length !== 2) return null
  const [body, signature] = parts
  if (!body || !signature) return null

  const expected = Buffer.from(sign(body))
  const actual = Buffer.from(signature)
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null

  try {
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as Partial<
      MockSessionUser & { exp: number }
    >
    if (!parsed || typeof parsed !== "object") return null
    if (typeof parsed.exp !== "number" || parsed.exp * 1000 < now) return null
    if (!parsed.id || !parsed.role || !USER_ROLES.includes(parsed.role)) return null
    return {
      id: parsed.id,
      name: parsed.name ?? "Idam guest",
      phone: parsed.phone ?? "",
      email: parsed.email ?? null,
      role: parsed.role,
    }
  } catch {
    return null
  }
}

/** Only same-site relative paths may be used as a post-login redirect. */
export function safeNext(next: string | null | undefined, fallback: string) {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.includes("\\")) return fallback
  return next
}

export function isAllowed(user: MockSessionUser | null, roles: UserRole[] = ["CUSTOMER"]) {
  return Boolean(user && roles.includes(user.role))
}
