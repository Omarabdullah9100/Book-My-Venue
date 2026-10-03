import { describe, expect, it } from "vitest"
import { createMockSessionUser, getMockOtp, parseSessionCookie } from "@/lib/auth"

describe("mock auth", () => {
  it("creates a session for a valid phone number and role", () => {
    const session = createMockSessionUser({ phone: "+91 98765 43210", role: "OWNER" })

    expect(session.phone).toBe("+91 98765 43210")
    expect(session.role).toBe("OWNER")
    expect(session.id).toMatch(/^user_/)
  })

  it("derives a stable OTP and parses the stored session cookie", () => {
    const otp = getMockOtp("9876543210")
    const session = createMockSessionUser({ phone: "9876543210", role: "CUSTOMER" })
    const serialized = JSON.stringify(session)

    expect(otp).toBe("123456")
    expect(parseSessionCookie(serialized)).toMatchObject({ phone: "9876543210", role: "CUSTOMER" })
  })
})
