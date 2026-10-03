import Link from "next/link"
import type { ButtonHTMLAttributes, ComponentProps } from "react"
import { cn } from "@/lib/cn"

export type ButtonVariant = "primary" | "secondary" | "ghost" | "amber" | "danger"

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-control px-5 font-semibold whitespace-nowrap transition duration-200 hover:-translate-y-px disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:hover:translate-y-0"

const variants: Record<ButtonVariant, string> = {
  primary: "bg-navy text-white shadow-button hover:bg-navy-deep",
  secondary: "border border-line bg-white text-navy hover:border-navy",
  ghost: "text-navy hover:bg-navy/6",
  amber: "bg-amber text-navy-deep hover:brightness-95",
  danger: "bg-red text-white hover:brightness-95",
}

export const buttonClass = (variant: ButtonVariant = "primary", className?: string) =>
  cn(base, variants[variant], className)

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button type={type} className={buttonClass(variant, className)} {...props} />
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return <Link className={buttonClass(variant, className)} {...props} />
}
