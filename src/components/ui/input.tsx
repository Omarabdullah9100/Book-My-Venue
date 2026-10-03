import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from "react"
import { cn } from "@/lib/cn"

type FieldShellProps = {
  label?: string
  hint?: string
  error?: string
  icon?: ReactNode
  className?: string
}

const shell =
  "flex min-h-12 items-center gap-2.5 rounded-field border bg-white px-3.5 text-muted focus-within:border-navy focus-within:ring-3 focus-within:ring-navy/10"

function Field({
  id,
  label,
  hint,
  error,
  icon,
  className,
  children,
}: FieldShellProps & { id: string; children: ReactNode }) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={id} className="text-navy text-xs font-bold">
          {label}
        </label>
      )}
      <div className={cn(shell, error ? "border-red" : "border-line")}>
        {icon}
        {children}
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-red text-xs">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="text-muted text-xs">
            {hint}
          </p>
        )
      )}
    </div>
  )
}

const control = "w-full min-w-0 bg-transparent py-2 text-ink outline-none placeholder:text-muted"

export function Input({
  label,
  hint,
  error,
  icon,
  className,
  id,
  ...props
}: FieldShellProps & InputHTMLAttributes<HTMLInputElement>) {
  const auto = useId()
  const fieldId = id ?? auto
  return (
    <Field id={fieldId} {...{ label, hint, error, icon, className }}>
      <input
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
        className={control}
        {...props}
      />
    </Field>
  )
}

export function Select({
  label,
  hint,
  error,
  icon,
  className,
  id,
  children,
  ...props
}: FieldShellProps & SelectHTMLAttributes<HTMLSelectElement>) {
  const auto = useId()
  const fieldId = id ?? auto
  return (
    <Field id={fieldId} {...{ label, hint, error, icon, className }}>
      <select
        id={fieldId}
        aria-invalid={error ? true : undefined}
        className={cn(control, "appearance-none")}
        {...props}
      >
        {children}
      </select>
    </Field>
  )
}

/** Native date input, styled. Swap for a calendar popover later without changing call sites. */
export function DatePicker(
  props: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & FieldShellProps,
) {
  return <Input type="date" {...props} />
}
