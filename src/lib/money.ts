/**
 * Money helpers. Every amount inside Idam is an integer number of paise.
 * Only convert to rupees for display, and only via formatINR.
 */

export type Paise = number

export function assertPaise(value: number, label = "amount"): asserts value is Paise {
  if (!Number.isSafeInteger(value)) {
    throw new RangeError(`${label} must be an integer number of paise, got ${value}`)
  }
}

export function rupeesToPaise(rupees: number): Paise {
  const paise = Math.round(rupees * 100)
  assertPaise(paise)
  return paise
}

/** Percentage of an amount, rounded half up to the nearest paise. percent may be fractional (e.g. 7.5). */
export function percentOf(amount: Paise, percent: number): Paise {
  assertPaise(amount)
  if (percent < 0 || percent > 100) throw new RangeError(`percent out of range: ${percent}`)
  return Math.round((amount * percent) / 100)
}

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})
const inrWithPaise = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** "₹1,25,000" — Indian digit grouping. Shows paise only when they are non-zero. */
export function formatINR(paise: Paise): string {
  assertPaise(paise)
  return paise % 100 === 0 ? inr.format(paise / 100) : inrWithPaise.format(paise / 100)
}
