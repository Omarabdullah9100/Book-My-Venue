import { NextRequest, NextResponse } from "next/server"
import { SESSION_COOKIE, parseSessionCookie } from "@/lib/auth"

/** Sign-in pages stay reachable without a session. */
const OPEN_PATHS = ["/login", "/signup", "/owner/login", "/admin/login"]

const isOpen = (pathname: string) =>
  OPEN_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))

function toLogin(request: NextRequest, loginPath: string) {
  const url = new URL(loginPath, request.url)
  url.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`)
  return NextResponse.redirect(url)
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (isOpen(pathname)) return NextResponse.next()

  const role = parseSessionCookie(request.cookies.get(SESSION_COOKIE)?.value ?? null)?.role

  if (pathname.startsWith("/admin")) {
    if (role !== "ADMIN") return toLogin(request, "/admin/login")
  } else if (pathname.startsWith("/host")) {
    if (role !== "OWNER" && role !== "ADMIN") return toLogin(request, "/owner/login")
  } else if (pathname.startsWith("/account") || /^\/venues\/[^/]+\/book\/?$/.test(pathname)) {
    if (role !== "CUSTOMER") return toLogin(request, "/login")
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/host/:path*", "/account/:path*", "/venues/:slug/book"],
}
