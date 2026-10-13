# Atelier Store

Next.js (App Router) + TypeScript + Tailwind CSS v4, with Better Auth, Drizzle ORM and Neon Postgres.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL and BETTER_AUTH_SECRET
npm run dev
```

## Structure

```
src/
  app/api/auth/[...all]/route.ts  Better Auth route handler
  db/index.ts                     Drizzle client (Neon HTTP driver)
  db/schema/index.ts              Schema barrel (empty for now)
  lib/auth.ts                     Better Auth server instance
  lib/auth-client.ts              Better Auth React client
drizzle.config.ts                 Drizzle Kit config (migrations → ./drizzle)
```

## Scripts

| Script                  | Purpose                                         |
| ----------------------- | ----------------------------------------------- |
| `npm run auth:generate` | Generate Better Auth tables into `src/db/schema/auth.ts` |
| `npm run db:generate`   | Generate SQL migrations from the schema         |
| `npm run db:migrate`    | Apply migrations                                |
| `npm run db:push`       | Push schema directly (prototyping)              |
| `npm run db:studio`     | Open Drizzle Studio                             |
| `npm run typecheck`     | Type-check the project                          |
