import { NextRequest, NextResponse } from "next/server"
import { parseSessionCookie } from "@/lib/auth"

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const session = parseSessionCookie(request.cookies.get("idam_session")?.value ?? null)

  if (pathname.startsWith("/owner/login") || pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    return NextResponse.next()
  }

  if (pathname.startsWith("/host") && (!session || !["OWNER", "ADMIN"].includes(session.role))) {
    return NextResponse.redirect(new URL("/owner/login", request.url))
  }

  if (pathname.startsWith("/account") && (!session || session.role !== "CUSTOMER")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/host/:path*", "/account/:path*", "/owner/login", "/login", "/signup"],
}
