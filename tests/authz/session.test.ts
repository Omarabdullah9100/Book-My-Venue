import { afterEach, describe, expect, it, vi } from "vitest"
import {
  SESSION_MAX_AGE_SECONDS,
  createAdminSessionUser,
  createMockSessionUser,
  parseSessionCookie,
  safeNext,
  serializeSessionUser,
  verifyAdminCredentials,
} from "@/lib/auth"

const customer = createMockSessionUser({ phone: "9876543210", role: "CUSTOMER" })

afterEach(() => vi.unstubAllEnvs())

describe("session cookie integrity", () => {
  it("rejects the old unsigned JSON cookie, including a forged admin role", () => {
    expect(parseSessionCookie(JSON.stringify(customer))).toBeNull()
    expect(parseSessionCookie(JSON.stringify({ ...customer, role: "ADMIN" }))).toBeNull()
  })

  it("rejects a tampered payload that reuses a valid signature", () => {
    const signature = serializeSessionUser(customer).split(".")[1]
    const forgedBody = Buffer.from(
      JSON.stringify({ ...customer, role: "ADMIN", exp: 9_999_999_999 }),
    ).toString("base64url")

    expect(parseSessionCookie(`${forgedBody}.${signature}`)).toBeNull()
  })

  it("rejects a cookie signed with a different secret", () => {
    vi.stubEnv("AUTH_SECRET", "another-secret")
    const foreign = serializeSessionUser(createAdminSessionUser("admin@idam.test"))
    vi.unstubAllEnvs()

    expect(parseSessionCookie(foreign)).toBeNull()
  })

  it("rejects expired sessions", () => {
    const issuedAt = Date.now() - (SESSION_MAX_AGE_SECONDS + 60) * 1000
    expect(parseSessionCookie(serializeSessionUser(customer, issuedAt))).toBeNull()
  })

  it("rejects malformed values", () => {
    for (const value of ["", "abc", "a.b.c", ".", null, undefined]) {
      expect(parseSessionCookie(value)).toBeNull()
    }
  })
})

describe("admin credentials", () => {
  it("fails closed when admin env vars are missing", () => {
    vi.stubEnv("ADMIN_EMAIL", "")
    vi.stubEnv("ADMIN_PASSWORD", "")
    expect(verifyAdminCredentials("", "")).toBe(false)
  })

  it("accepts only the configured email and password", () => {
    vi.stubEnv("ADMIN_EMAIL", "Admin@Idam.test")
    vi.stubEnv("ADMIN_PASSWORD", "correct horse")

    expect(verifyAdminCredentials(" admin@idam.test ", "correct horse")).toBe(true)
    expect(verifyAdminCredentials("admin@idam.test", "wrong")).toBe(false)
    expect(verifyAdminCredentials("other@idam.test", "correct horse")).toBe(false)
  })
})

describe("post-login redirect", () => {
  it("only follows same-site relative paths", () => {
    expect(safeNext("/account/bookings", "/")).toBe("/account/bookings")
    expect(safeNext("//evil.example", "/")).toBe("/")
    expect(safeNext("https://evil.example", "/")).toBe("/")
    expect(safeNext("/\\evil.example", "/")).toBe("/")
    expect(safeNext("", "/home")).toBe("/home")
  })
})
