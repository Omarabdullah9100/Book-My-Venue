/**
 * Seed script placeholder. M0 only ensures platform settings exist.
 * M2 adds 15–20 realistic Kerala venues, amenities and cancellation policies.
 */
import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../src/generated/prisma/client"
import { SETTING_DEFAULTS } from "../src/lib/settings"

async function main() {
  const db = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  })
  try {
    for (const [key, value] of Object.entries(SETTING_DEFAULTS)) {
      await db.setting.upsert({ where: { key }, update: {}, create: { key, value: String(value) } })
    }
    console.log("Seeded platform settings.")
  } finally {
    await db.$disconnect()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
