# Demo script (3 minutes)

Use this walkthrough for judges or a screen recording.

## Setup (before recording)

- Run `npm run dev` or use the deployed Vercel URL.
- Have any PDF file ready on your desktop for upload.
- Browser at 1280px width or full screen.

## Minute 0:00 — Problem and KPIs

> "Property managers across Abu Dhabi juggle hundreds of tenancies. Missed registration renewals hurt occupancy and community stability. LeaseLens AI gives them one dashboard."

- Point to the **Future Communities** track badge.
- Highlight three KPI cards:
  - **Active Leases** — derived from 3,500+ rent rows in the official `sample_listings.csv`.
  - **Upcoming Ejari Renewals** — amber alert for leases expiring in 90 days.
  - **Pending Cheques** — AED total due this month.

## Minute 0:45 — Upload and AI extraction

> "A new tenancy contract arrives. Instead of manual data entry, we drop the PDF and let AI extract the clauses."

- Drag the PDF onto **Upload Tenancy Contract**.
- Wait for the 3-second loading state: "AI extracting clauses..."

## Minute 1:30 — Extracted data + community join

> "LeaseLens pulls tenant, rent, expiry, and payment terms. Because we are on the Future Communities track, we also join official community data by district."

- Show extracted panel: Ahmed Al Mansoori, AED 211,000, Saadiyat Island.
- Scroll to **Community Context** card:
  - Resident experience score
  - Service demand and optimization opportunity from `sample_communities.csv`

## Minute 2:15 — Renewal automation

> "One click generates a compliant 90-day renewal notice for WhatsApp or email."

- Click **Generate 90-Day Renewal Notice**.
- Show WhatsApp draft with UAE compliance language.
- Click **Copy WhatsApp** to demonstrate clipboard flow.

## Minute 2:45 — Close

> "LeaseLens turns lease paperwork into community-stable operations. Built on the Abu Dhabi AI PropTech Challenge datasets, extensible to real PDF parsing and DMT integration."

- Mention repo and live demo URL.

## If something breaks

- Refresh the page and re-upload the PDF.
- KPIs are static from build-time JSON — they do not depend on upload.
- Renewal modal only enables after extraction completes.
