# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

Next.js 16 is newer than most training data: check `node_modules/next/dist/docs/` before using framework APIs (e.g. middleware is now `proxy.ts`, layouts are typed with the generated `LayoutProps<"/">`). `cacheComponents` and `partialPrefetching` are enabled in `next.config.ts`.

## Commands

```bash
npm run dev          # dev server (Turbopack) on :3000
npm run build        # production build — requires DATABASE_URL and a migrated + seeded DB
npm run lint         # eslint (flat config, next core-web-vitals + typescript)
npm run typecheck    # tsc --noEmit

npm run auth:generate  # Better Auth CLI → writes Drizzle tables to src/db/schema/auth.ts
npm run db:generate    # drizzle-kit: SQL migrations into ./drizzle
npm run db:migrate     # apply migrations
npm run db:push        # push schema directly (prototyping)
npm run db:studio      # Drizzle Studio
npm run db:seed        # upsert sample categories + products (src/db/seed-data.ts)
```

There is no test runner configured yet.

Env: copy `.env.example` to `.env.local`. Required: `DATABASE_URL` (Neon pooled URL), `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`.

## Architecture

Stack: Next.js App Router + React 19, TypeScript (strict, `@/*` → `src/*`), Tailwind v4 (CSS-first config in `src/app/globals.css`, no `tailwind.config`), Better Auth, Drizzle ORM, Neon Postgres.

Request flow for auth:
`src/lib/auth-client.ts` (browser, `better-auth/react`, base URL from `NEXT_PUBLIC_APP_URL`) → `src/app/api/auth/[...all]/route.ts` (`toNextJsHandler(auth)`) → `src/lib/auth.ts` (`betterAuth` with `drizzleAdapter(db, { provider: "pg" })` and `nextCookies()`) → `src/db/index.ts` → Neon.

In server components/actions, call `auth.api.getSession({ headers: await headers() })` directly instead of going over HTTP.

Database:
- `src/db/index.ts` exports a single `db` using the `drizzle-orm/neon-http` driver (stateless HTTP per query — no interactive transactions; switch to the Neon WebSocket `Pool` driver if those are needed). It throws at module load if `DATABASE_URL` is missing, which is why `next build` fails without it.
- `src/db/schema/index.ts` is the barrel consumed by both the runtime `db` client and `drizzle.config.ts`. Every new table file must be re-exported from it.
- `drizzle.config.ts` loads `.env.local` then `.env` via dotenv itself, since drizzle-kit runs outside Next.
- Migrations: change the schema → `db:generate` → review the SQL → commit `./drizzle` → `db:migrate`. `db:push` is only for throwaway prototyping.
- Schema conventions (see `src/db/schema/catalog.ts`): integer identity PKs; a unique `slug` is the public/URL key; explicit snake_case column names; money as integer cents (`price_cents`); `timestamptz` `created_at`/`updated_at` (with `$onUpdate`); invariants as named `CHECK` constraints; FKs `ON DELETE restrict`.
- Catalog = `categories` 1─n `products`. There are no variants, so stock is a unit-count column on `products`. In/low/sold-out is derived via `getStockState` and never stored. Images are a non-empty `jsonb` array of `{src, alt}` and details are `text[]`; only split them into tables once they need independent management.
- Category slugs double as `/collections/<slug>` paths and match the nav. The homepage merchandising tiles and departments are editorial, not categories, and stay in `src/data/catalog.ts`.
- Read products only through `src/lib/catalog.ts`. Each query uses `"use cache"` + `cacheLife("hours")` + `cacheTag("products")` (required for DB reads under `cacheComponents`) and returns the plain `Product` domain type (no ids or `Date`s). Call `revalidateTag("products")` after any catalog write.
- The seed (`npm run db:seed`, data in `src/db/seed-data.ts`) upserts by slug and must stay idempotent. Scripts outside Next must load dotenv *before* dynamically importing `@/db`. Use `db.batch()` when several writes must be atomic.
- The DB must be migrated and seeded before `npm run build`: with `cacheComponents`, an empty `generateStaticParams` result is a build error.

## Design system

Tailwind v4 is configured entirely in CSS. `src/app/globals.css` imports, in order: `src/styles/theme.css` (`@theme` tokens + responsive `:root` vars like `--gutter`, `--section-y`, `--grid-gap-x`), `base.css` (element defaults; borders default to `--color-line`, not currentColor), `components.css` (`.btn` + `btn-primary|secondary|inverse|ghost|icon`, sizes `btn-sm|lg|block`; `.link`, `.link-quiet`), `utilities.css` (`@utility` primitives: `container-page|prose|narrow`, `section`, `grid-products`, `grid-editorial`, `rail`, `full-bleed`, `media-well`, `eyebrow`, `heading-display`, `heading-section`, `hairline-t|b`).

Rules: monochrome palette (`paper`, `surface`, `ink`, `muted`, `line`…) — use tokens, not raw hex or Tailwind's zinc/gray; square corners (no `rounded-*`); UI chrome uses `text-label uppercase`; serif (`font-serif`, Newsreader) only for editorial headings, Inter for everything else; product images use `aspect-product media-well`. The site is light-only: `dark:` applies only inside an explicit `.dark` class.

## Current state

Scaffold only. The schema has only the catalog tables, so Better Auth will fail at runtime until auth tables exist: run `npm run auth:generate`, add `export * from "./auth"` to `src/db/schema/index.ts`, then `db:generate` + `db:migrate`. No auth methods (email/password, social) are enabled in `auth.ts` and there is no `proxy.ts` route protection.

Storefront: pages live in the `src/app/(store)/` route group, whose layout adds `SiteHeader`/`SiteFooter` (keep auth/checkout pages outside it if they need different chrome). Built pages: the homepage and `products/[slug]` (prerendered via `generateStaticParams`, unknown slugs call `notFound()` → `(store)/not-found.tsx`). Product data comes from Postgres (see Database above); `src/data/` holds only editorial content and nav. Prices are formatted with `formatPrice` (`src/lib/format.ts`); the low-stock threshold is 3 (`src/lib/stock.ts`). `ProductCard` is the single product tile used by every grid. Sample photos must be free of visible third-party logos — check at full size, not thumbnails. Links to `/collections/*`, `/products/*` etc. point at routes not yet built. Remote images are allowed only from `images.unsplash.com/photo-*` (`next.config.ts`), and `quality` must be one of `images.qualities` (75, 80). With `cacheComponents`, non-deterministic values like `new Date()` in server components need `"use cache"` (see `CopyrightYear` in `site-footer.tsx`).
