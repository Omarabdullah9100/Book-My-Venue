import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  parseSessionCookie,
  serializeSessionUser,
  type MockSessionUser,
  type UserRole,
} from "@/lib/auth"

/** Server-only session helpers. Do not add "use server" here: these must not be callable from the browser. */

export async function getSession() {
  const store = await cookies()
  return parseSessionCookie(store.get(SESSION_COOKIE)?.value ?? null)
}

export async function startSession(user: MockSessionUser) {
  const store = await cookies()
  store.set(SESSION_COOKIE, serializeSessionUser(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  })
}

export async function endSession() {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
}

/** Second layer behind src/proxy.ts. Redirects to loginPath unless the session has an allowed role. */
export async function requireRole(roles: UserRole[], loginPath: string) {
  const session = await getSession()
  if (!session || !roles.includes(session.role)) redirect(loginPath)
  return session
}
