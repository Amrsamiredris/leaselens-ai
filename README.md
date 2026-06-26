# LeaseLens AI

**Abu Dhabi AI PropTech Challenge — Track 3: Future Communities**

LeaseLens AI is a B2B property management dashboard that automates UAE tenancy compliance, tracks registration renewals, and connects lease operations to community health data from the official hackathon datasets.

Built for the [Abu Dhabi AI PropTech Challenge](https://challenge.evoost.ai) at Hub71 (Cursor x eVoost AI).

---

## For judges

**Start here** — a ~5 minute self-guided evaluation path:

| Where | Link |
|-------|------|
| **In the live app** | Open **Judge Guide** in the sidebar, or go to `/judge` |
| **In this repo** | [docs/JUDGE-GUIDE.md](./docs/JUDGE-GUIDE.md) |

**Fastest demo path:** Dashboard → click **Load demo data** → **Generate 90-day renewal notice** → copy WhatsApp draft.

No login or API key required. Upload any PDF for live Claude extraction when `ANTHROPIC_API_KEY` is configured on the deployment.

## Hackathon data

Metrics and demo lease data are derived from the [starter-kit](https://github.com/abu-dhabi-ai-proptech-challenge/starter-kit) synthetic CSVs:

- `data/sample_listings.csv` — rent portfolio (joined for KPIs)
- `data/sample_communities.csv` — community context by district
- `data/districts.csv` — district reference

Ejari expiry, tenant name, and payment terms on the demo lease are **synthetic extensions** for the upload demo path.

> **Synthetic data notice:** All CSV values are invented for the challenge. Do not cite as real Abu Dhabi market data.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The `prebuild` script regenerates `src/data/lease-portfolio.json` from CSVs automatically on `npm run build`.

## Demo flow (3 minutes)

See [docs/demo-script.md](./docs/demo-script.md) for the full judge walkthrough.

1. Review KPI cards (active leases, renewals in 90 days, pending cheques) — computed from 3,500+ rent listings.
2. Upload any PDF to the contract zone.
3. Claude extracts lease fields via `/api/extract-lease` (falls back to demo data if no API key).
4. Review extracted lease data, **Ejari countdown ring**, and special clauses.
5. Adjust **Legal Rent Increase Calculator** (RERA Decree 43 bands) and note max renewal rent.
6. Review auto-generated **PDC cheque schedule** — toggle cheque status to demo bounced-cheque warning.
7. See **Community Context** card joined from `sample_communities.csv`.
8. Click **Generate 90-Day Renewal Notice** — switch WhatsApp / Email tabs, copy or download `.txt`.

### Environment variables

Add to `.env.local` for real AI extraction:

```bash
ANTHROPIC_API_KEY=sk-ant-...
```

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Lucide React icons
- Hackathon CSVs preprocessed by `scripts/build-lease-data.mjs`

## Deploy

```bash
npm run build
npx vercel --prod
```

Or connect [github.com/Amrsamiredris/leaselens-ai](https://github.com/Amrsamiredris/leaselens-ai) in the [Vercel dashboard](https://vercel.com) and deploy from `main`.

## Submit to the hackathon

1. Ensure the public repo and deployed demo URL work in an incognito window.
2. Open the [Project Submission issue form](https://github.com/abu-dhabi-ai-proptech-challenge/submissions/issues/new/choose).
3. Select track: **Future Communities**.
4. Include repo URL, Vercel demo URL, and what you built today.

Full guide: [starter-kit submission guide](https://github.com/abu-dhabi-ai-proptech-challenge/starter-kit/blob/main/docs/submission-guide.md).

## Links

- Challenge website: https://challenge.evoost.ai
- Starter kit: https://github.com/abu-dhabi-ai-proptech-challenge/starter-kit
- Discord: https://discord.gg/jy3QDxQ3jK
- Architecture: [docs/architecture.md](./docs/architecture.md)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Regenerate lease data + production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

See [FEATURES.md](./FEATURES.md) for the full feature checklist.
