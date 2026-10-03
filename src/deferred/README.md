# Deferred features

Nothing here is built. Each folder marks where a deferred feature plugs in. See `docs/ROADMAP.md`.

| Folder           | Feature                           | Hook it will use                                       |
| ---------------- | --------------------------------- | ------------------------------------------------------ |
| `ask-idam`       | Natural-language search           | Search query builder in `src/server/search` (M2)       |
| `idam-layout`    | Seat planner                      | `Space.floorPlanUrl` plus a new layout table           |
| `idam-split`     | Group payments                    | `Payment` rows with a payer reference                  |
| `vendor-bundles` | Bundled caterer/decorator booking | `PriceExtra` and a new `Vendor` model                  |
| `smart-pricing`  | Price suggestions                 | `PricingRule.seasonalOverrides`, read-only suggestions |
| `tours-360`      | 360° tours                        | `MediaType` enum gains a `TOUR_360` value              |
| `whatsapp-flows` | WhatsApp notifications            | `WhatsAppProvider` in `src/server/providers/types.ts`  |

Institutional bookings (faculty approval chains, invoice terms) are intentionally out of scope and have no extension point.
