"use server"

import { redirect } from "next/navigation"
import { endSession } from "@/lib/session"

const LOGIN_FOR_AREA: Record<string, string> = {
  customer: "/login",
  owner: "/owner/login",
  admin: "/admin/login",
}

export async function logout(formData: FormData) {
  await endSession()
  redirect(LOGIN_FOR_AREA[String(formData.get("area") ?? "")] ?? "/login")
}
