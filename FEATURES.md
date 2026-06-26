# LeaseLens AI — Features

## Hackathon integration

- [x] Official starter-kit CSVs vendored in `data/`
- [x] Build script maps listings schema to dashboard metrics
- [x] Track 3 (Future Communities) badge in dashboard header
- [x] Community insight card joined on `district` from `sample_communities.csv`
- [x] Abu Dhabi demo lease (LST-00002, Saadiyat Island) replaces Dubai mock data
- [x] Synthetic data disclaimer in README and dashboard footer
- [x] `.cursor/rules/event.mdc` for Cursor hackathon context
- [x] Submission and deploy instructions in README

## Dashboard MVP

### Navigation
- [x] Left sidebar with LeaseLens branding
- [x] Links: Dashboard, Lease Documents, Settings (placeholder)
- [x] Collapsible sidebar with mobile drawer

### KPI cards (from CSV-derived metrics)
- [x] Active Leases
- [x] Upcoming Ejari Renewals (90 days) with urgent amber styling when high
- [x] Pending Cheques This Month (AED)

### AI contract upload (Claude + fallback)
- [x] Drag-and-drop PDF upload zone
- [x] Base64 encode PDF client-side, POST to `/api/extract-lease`
- [x] Anthropic Claude Sonnet 4.6 document extraction (`ANTHROPIC_API_KEY`)
- [x] Mock data fallback with `console.warn` when API fails
- [x] Extracted data panel after upload

### Extracted lease data
- [x] Tenant, landlord, property, rent, Ejari expiry, payment terms, contract start
- [x] Special clauses (up to 3)
- [x] 90-day Ejari countdown ring with compliance bands (green / amber / red / flashing)

### RERA rent increase calculator
- [x] Current rent pre-filled from extraction
- [x] Market rate manual input or Dubai zone dropdown (5 zones)
- [x] RERA Decree No. 43 of 2013 band logic (0–20% max increase)
- [x] Colored badge: red (no increase), amber (5–10%), green (15–20%)
- [x] DLD Smart Rental Index disclaimer

### PDC cheque schedule
- [x] Auto-generated from payment terms (e.g. 4 cheques)
- [x] Quarterly timeline with adjustable first-cheque offset
- [x] Status toggle: Pending / Cleared / Bounced
- [x] Bounced cheque legal warning banner (UAE Cheques Law)

### Community context (Track 3)
- [x] Resident experience score from `sample_communities.csv`
- [x] Service demand index and optimization opportunity
- [x] Occupancy rate for demo district

### Action automation
- [x] Generate 90-Day Renewal Notice button
- [x] Tabs: WhatsApp Message / Formal Email
- [x] Populated with tenant, address, rent, RERA max rent, Ejari expiry
- [x] Copy to clipboard on both tabs
- [x] Download as .txt on email tab
- [x] English + hardcoded Arabic templates
- [x] RERA Compliant badge (Decree No. 43 of 2013)

## Submission checklist

- [ ] Repo link works in incognito: https://github.com/Amrsamiredris/leaselens-ai
- [ ] README explains how to run the project
- [ ] Demo URL deployed on Vercel
- [ ] Track selected: Future Communities
- [ ] "What we built today" section is specific and honest
- [ ] Issue submitted at [submissions repo](https://github.com/abu-dhabi-ai-proptech-challenge/submissions/issues/new/choose)

## Not in scope

- [ ] Live Ejari / DLD Smart Rental Index API
- [ ] Database and authentication
- [ ] Lease Documents and Settings pages (functional stubs only)
