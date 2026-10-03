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

### Demo authentication

Customer and owner sign-in use the development OTP `123456` with a valid Indian
mobile number. Demo OTP authentication is disabled in production unless
`ALLOW_MOCK_AUTH=true` is set.

Admin sign-in is available at `/admin/login` and uses the `ADMIN_EMAIL` and
`ADMIN_PASSWORD` environment variables. Set `AUTH_SECRET` to a random value in
production; it signs the expiring, role-bearing session cookie.

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
