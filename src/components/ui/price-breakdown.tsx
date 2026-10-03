import { Badge } from "./badge"
import { formatINR, type Paise } from "@/lib/money"
import { t } from "@/lib/strings"

export type PriceLine = { label: string; amount: Paise; included?: boolean }

/** Transparent price table: rent, extras tagged included/extra, total, deposit and balance. */
export function PriceBreakdown({
  lines,
  total,
  deposit,
  balance,
}: {
  lines: PriceLine[]
  total: Paise
  deposit?: Paise
  balance?: Paise
}) {
  return (
    <dl className="text-sm">
      {lines.map((line) => (
        <div
          key={line.label}
          className="border-line flex items-center justify-between gap-4 border-b py-3"
        >
          <dt className="flex items-center gap-2">
            {line.label}
            {line.included !== undefined && (
              <Badge tone={line.included ? "green" : "amber"}>
                {line.included ? t.pricing.included : t.pricing.extra}
              </Badge>
            )}
          </dt>
          <dd className="font-semibold">{line.included ? "—" : formatINR(line.amount)}</dd>
        </div>
      ))}
      <div className="text-navy-deep flex justify-between py-3 text-base font-bold">
        <dt>{t.pricing.total}</dt>
        <dd>{formatINR(total)}</dd>
      </div>
      {deposit !== undefined && (
        <div className="bg-navy-soft flex justify-between rounded-lg px-3 py-2.5 font-semibold">
          <dt>{t.pricing.deposit}</dt>
          <dd>{formatINR(deposit)}</dd>
        </div>
      )}
      {balance !== undefined && (
        <div className="text-muted flex justify-between px-3 py-2.5">
          <dt>{t.pricing.balance}</dt>
          <dd>{formatINR(balance)}</dd>
        </div>
      )}
    </dl>
  )
}
