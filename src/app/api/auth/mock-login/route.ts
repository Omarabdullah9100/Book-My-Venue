import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { SESSION_COOKIE, createMockSessionUser, getMockOtp } from "@/lib/auth"

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { phone?: string; otp?: string; role?: string }
  const phone = body.phone ?? ""
  const otp = body.otp ?? ""
  const role = (body.role === "OWNER" || body.role === "ADMIN" ? body.role : "CUSTOMER") as
    | "CUSTOMER"
    | "OWNER"
    | "ADMIN"

  if (!phone || !otp || getMockOtp(phone) !== otp) {
    return NextResponse.json({ ok: false, error: "Invalid phone or OTP." }, { status: 400 })
  }

  const session = createMockSessionUser({ phone, role, name: "Demo guest" })
  const store = await cookies()
  store.set(SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })

  return NextResponse.json({ ok: true, user: session })
}
