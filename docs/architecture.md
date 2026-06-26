# Architecture

## Overview

LeaseLens AI is a single-page Next.js 14 dashboard. All interactivity lives in client components under `src/components/dashboard/`. Hackathon CSVs are preprocessed at build time into a small JSON bundle the UI imports.

## Data flow

```
data/sample_listings.csv     ─┐
data/sample_communities.csv  ─┼─► scripts/build-lease-data.mjs
data/districts.csv           ─┘           │
                                           ▼
                              src/data/lease-portfolio.json
                                           │
           ┌───────────────────────────────┼───────────────────────────────┐
           ▼                               ▼                               ▼
   metric-cards.tsx            extracted-data-panel.tsx          community-insight-card.tsx
           │                               │                               │
           └───────────────────────────────┴───────────────────────────────┘
                                           │
                              renewal-notice-dialog.tsx
```

## Key modules

| Path | Role |
|------|------|
| `scripts/build-lease-data.mjs` | Parse CSVs, compute KPIs, pick demo lease LST-00002, join community |
| `src/lib/mock-data.ts` | Import JSON, message templates, `PORTFOLIO` constant |
| `src/lib/types.ts` | `Listing`, `Community`, `LeaseCompliance` aligned to starter-kit schemas |
| `src/components/dashboard/dashboard-client.tsx` | Upload state machine (`idle` → `loading` → `done`) |
| `src/components/dashboard/upload-zone.tsx` | Drag-drop PDF, 3s mock extraction |
| `src/components/TrackBadge.tsx` | Hackathon track indicator |

## Synthetic compliance fields

The starter kit has no Ejari or tenant columns. The build script adds deterministic demo fields:

- `ejari_expiry` — hash-derived from `listing_id` + `listed_date` (demo lease pinned to Oct 15, 2026)
- `tenant_name` — fixed for demo path
- `payment_terms` — "4 Cheques"

Document this in demos. Judges accept hardcoded happy paths.

## Extension points

### Real PDF extraction

1. Add `src/app/api/extract/route.ts` — accept PDF upload, call OpenAI/Claude.
2. Put `OPENAI_API_KEY` in `.env.local` (see `.env.example`).
3. Replace `setTimeout` in `dashboard-client.tsx` with `fetch('/api/extract')`.

### Live listings API

The starter kit offers an optional eVoost live listings connector. Swap `data/sample_listings.csv` source or merge at build time.

### Additional pages

- `Lease Documents` — table of rent listings from full CSV export.
- `Settings` — notification preferences, cheque schedule rules.

## Stack conventions

- **shadcn/ui** for primitives — use `render` prop pattern (base-ui), not Radix `asChild`.
- **Tailwind v3** with HSL CSS variables in `src/app/globals.css`.
- **Geist** font via `geist` package (Next.js 14 compatible).

## Build and deploy

```bash
npm run build   # runs prebuild script then next build
npx vercel --prod
```
