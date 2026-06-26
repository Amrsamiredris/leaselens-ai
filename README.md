# LeaseLens AI

**Abu Dhabi AI PropTech Challenge — Track 3: Future Communities**

LeaseLens AI is a B2B property management dashboard that automates UAE tenancy compliance, tracks registration renewals, and connects lease operations to community health data from the official hackathon datasets.

Built for the [Abu Dhabi AI PropTech Challenge](https://challenge.evoost.ai) at Hub71 (Cursor x eVoost AI).

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
3. Wait 3 seconds for "AI extracting clauses..."
4. Review extracted lease data for Saadiyat Island (Ahmed Al Mansoori, AED 211,000/yr).
5. See **Community Context** card joined from `sample_communities.csv`.
6. Click **Generate 90-Day Renewal Notice** and copy the WhatsApp or email draft.

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
