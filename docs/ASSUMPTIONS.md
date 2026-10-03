# Assumptions and design/spec conflicts

Rule used: the design wins for visuals, the spec wins for behaviour and rules.

## Conflicts between the prototype and the spec

| Topic               | Prototype                | Decision                                                                                                |
| ------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------- |
| Framework           | Vite SPA                 | Next.js App Router (spec). Prototype CSS tokens ported into Tailwind v4 `@theme`.                       |
| Deposit             | 25%                      | **20%** default (spec), stored as the `depositPercent` setting and snapshotted on each booking.         |
| Pricing granularity | Per day only             | Hourly, half-day and full-day slots (spec).                                                             |
| Booking hold        | None                     | 10-minute hold at checkout (spec).                                                                      |
| Venue data          | 4 hard-coded venues      | 15–20 seeded Kerala venues in M2.                                                                       |
| Images              | Hot-linked Unsplash URLs | Allowed via `next.config.ts` remotePatterns for the seed; replaced by the storage provider for uploads. |

## Scope exclusions (per product owner)

- **Institutional bookings are out of scope**, along with everything related: the institutional screen, faculty approval chains, approval audit trail, invoice-based terms, and the "Institutional" header/nav entries. There is no data model or extension point for them.
- "College event" stays as an ordinary **event type** for normal bookings. The "College venues" footer link was dropped and replaced by "Corporate venues".
- Admin "demand gaps" and host "smart pricing" panels from the prototype are deferred (see ROADMAP).

## Accessibility deviations

- `--color-muted` darkened from `#667382` to `#5a6877` for WCAG AA on cream.
- Amber is background-only with navy text. Amber as text colour fails AA on white.
- Badge text uses `green-ink` (`#256a4c`) instead of `green` on `green-soft`.

## Data model decisions

- All money is integer paise (`Int`). Per-booking amounts fit comfortably; ledger aggregates are summed in SQL.
- `SlotStatus` gains **RELEASED** (spec lists HELD, BOOKED, BLOCKED). Expired or cancelled slots are kept for audit and drop out of the overlap constraint.
- `AvailabilitySlot` stores `startsAt`/`endsAt` timestamps (plus a `date` for indexing) rather than separate date and time columns, so a Postgres range exclusion constraint can forbid overlaps.
- `Booking` snapshots the price breakdown, cancellation tiers, deposit % and commission % at booking time so later setting changes never alter existing bookings.
- Added `Booking.reference` (human-friendly id), `WebhookEvent` (idempotent webhooks) and `VerificationDocument` (owner onboarding uploads).
- Timezone: all dates are interpreted in Asia/Kolkata; timestamps are stored in UTC.

## Environment notes

- This sandbox cannot reach `binaries.prisma.sh`, so `prisma migrate` could not run here. The Prisma client was generated with a stub engine path, which is enough for types. **Generate the SQL migrations on your machine** (see README → Setup).
