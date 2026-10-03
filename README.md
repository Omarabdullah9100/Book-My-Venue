# Idam

A place for every occasion. Venue marketplace for Kerala (pilot: Thrissur and Ernakulam).

Next.js (App Router) · TypeScript · Tailwind CSS v4 · PostgreSQL · Prisma 7 · Razorpay (test mode).

## Setup

```bash
cp .env.example .env
npm install
npm run db:up                         # Postgres via Docker Compose
npx prisma generate
npx prisma migrate dev --name init    # creates the schema migration
```

Then add the overlap-protection migration (business rule 1):

```bash
npx prisma migrate dev --create-only --name availability_exclusion
# paste the contents of prisma/sql/availability_exclusion.sql into the new migration.sql, then:
npx prisma migrate dev
npm run db:seed
npm run dev
```

## Scripts

| Command            | Purpose                                    |
| ------------------ | ------------------------------------------ |
| `npm run ci`       | format check, lint, type-check, unit tests |
| `npm run test`     | Vitest                                     |
| `npm run test:e2e` | Playwright (desktop 1440 and mobile 390)   |
| `npm run build`    | Production build                           |

## Layout

- `src/app` routes · `src/components/ui` design system · `src/server` booking engine, providers, jobs
- `src/lib` money (integer paise), central copy (`strings.ts`), db client
- `docs/ASSUMPTIONS.md` and `docs/ROADMAP.md`
- `/styleguide` renders every UI component (dev only, noindex)
