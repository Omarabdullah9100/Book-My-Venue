import { describe, expect, it } from "vitest"
import { assertPaise, formatINR, percentOf, rupeesToPaise } from "@/lib/money"

describe("money", () => {
  it("converts rupees to integer paise without float drift", () => {
    expect(rupeesToPaise(42000)).toBe(4_200_000)
    expect(rupeesToPaise(0.1 + 0.2)).toBe(30)
    expect(rupeesToPaise(19.99)).toBe(1999)
  })

  it("rejects non-integer paise", () => {
    expect(() => assertPaise(10.5)).toThrow(RangeError)
    expect(() => assertPaise(Number.NaN)).toThrow(RangeError)
  })

  it("formats with Indian digit grouping", () => {
    expect(formatINR(rupeesToPaise(42000))).toBe("₹42,000")
    expect(formatINR(rupeesToPaise(125000))).toBe("₹1,25,000")
    expect(formatINR(rupeesToPaise(1234567))).toBe("₹12,34,567")
    expect(formatINR(0)).toBe("₹0")
  })

  it("shows paise only when non-zero", () => {
    expect(formatINR(1999)).toBe("₹19.99")
  })

  it("computes percentages rounded half up to whole paise", () => {
    expect(percentOf(rupeesToPaise(42000), 20)).toBe(rupeesToPaise(8400))
    expect(percentOf(1999, 8)).toBe(160) // 159.92 → 160
    expect(percentOf(5, 50)).toBe(3) // 2.5 → 3
    expect(percentOf(100, 0)).toBe(0)
    expect(percentOf(100, 100)).toBe(100)
  })

  it("rejects out-of-range percentages", () => {
    expect(() => percentOf(100, -1)).toThrow(RangeError)
    expect(() => percentOf(100, 101)).toThrow(RangeError)
  })

  it("keeps deposit + balance exactly equal to the total", () => {
    for (const total of [4_200_000, 1_999_999, 12_345, 7]) {
      const deposit = percentOf(total, 20)
      expect(deposit + (total - deposit)).toBe(total)
    }
  })
})
