import { describe, expect, it } from "vitest"
import {
  createMockSessionUser,
  getMockOtp,
  isValidIndianMobile,
  parseSessionCookie,
  serializeSessionUser,
  verifyMockOtp,
} from "@/lib/auth"

describe("mock auth", () => {
  it("creates a session for a valid phone number and role", () => {
    const session = createMockSessionUser({ phone: "+91 98765 43210", role: "OWNER" })

    expect(session.phone).toBe("+91 98765 43210")
    expect(session.role).toBe("OWNER")
    expect(session.id).toMatch(/^user_/)
  })

  it("derives a stable OTP and round-trips the signed session cookie", () => {
    const otp = getMockOtp("9876543210")
    const session = createMockSessionUser({ phone: "9876543210", role: "CUSTOMER" })

    expect(otp).toBe("123456")
    expect(parseSessionCookie(serializeSessionUser(session))).toMatchObject({
      phone: "9876543210",
      role: "CUSTOMER",
    })
  })

  it("validates Indian mobile numbers", () => {
    expect(isValidIndianMobile("+91 98765 43210")).toBe(true)
    expect(isValidIndianMobile("09876543210")).toBe(true)
    expect(isValidIndianMobile("12345")).toBe(false)
    expect(isValidIndianMobile("5876543210")).toBe(false)
  })

  it("never accepts an empty or wrong OTP", () => {
    expect(verifyMockOtp("abc", "")).toBe(false)
    expect(verifyMockOtp("9876543210", "")).toBe(false)
    expect(verifyMockOtp("9876543210", "000000")).toBe(false)
    expect(verifyMockOtp("9876543210", "123456")).toBe(true)
  })
})
