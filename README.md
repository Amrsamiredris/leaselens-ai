# LeaseLens AI

Smart property management dashboard for the UAE real estate market. LeaseLens AI reads tenancy contracts, tracks Ejari and RERA compliance, and automates tenant communications.

Built as a hackathon MVP with mock AI extraction for smooth demo click-through.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Lucide React** icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Flow (for judges)

1. Open the dashboard and review the three KPI cards (Active Leases, Ejari Renewals, Pending Cheques).
2. Note the amber highlight on **Upcoming Ejari Renewals** indicating urgent action.
3. Drag any PDF onto the **Upload Tenancy Contract** zone (or click to browse).
4. Wait 3 seconds while the UI shows **AI extracting clauses...**
5. Review the extracted lease data panel (tenant, rent, Ejari expiry, payment terms).
6. Click **Generate 90-Day Renewal Notice** to open drafted WhatsApp and email messages.
7. Use **Copy WhatsApp** or **Copy Email** to copy the message to clipboard.

## Project Structure

```
src/
  app/                    # Next.js App Router pages and layout
  components/
    dashboard/            # Bento grid, metrics, upload, extraction, modal
    layout/               # App sidebar navigation
    ui/                   # shadcn/ui primitives
  lib/                    # Mock data, types, utilities
```

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## MVP Scope

This hackathon build uses hardcoded mock state. There is no real PDF parsing, database, or external API integration yet.

See [FEATURES.md](./FEATURES.md) for the full feature checklist.
