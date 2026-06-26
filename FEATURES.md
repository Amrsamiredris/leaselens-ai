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

### AI contract upload (simulated)
- [x] Drag-and-drop PDF upload zone
- [x] 3-second "AI extracting clauses..." loading state
- [x] Extracted data panel after upload

### Extracted lease data (demo lease LST-00002)
- [x] Tenant Name: Ahmed Al Mansoori
- [x] Annual Rent: AED 211,000
- [x] Ejari Expiry: Oct 15, 2026
- [x] Payment Terms: 4 Cheques
- [x] Property: Saadiyat Island Towers, Saadiyat Island

### Community context (Track 3)
- [x] Resident experience score from `sample_communities.csv`
- [x] Service demand index and optimization opportunity
- [x] Occupancy rate for demo district

### Action automation
- [x] Generate 90-Day Renewal Notice button
- [x] Modal with WhatsApp and email drafts
- [x] Copy-to-clipboard per channel

## Submission checklist

- [ ] Repo link works in incognito: https://github.com/Amrsamiredris/leaselens-ai
- [ ] README explains how to run the project
- [ ] Demo URL deployed on Vercel
- [ ] Track selected: Future Communities
- [ ] "What we built today" section is specific and honest
- [ ] Issue submitted at [submissions repo](https://github.com/abu-dhabi-ai-proptech-challenge/submissions/issues/new/choose)

## Not in scope

- [ ] Real PDF parsing / LLM API
- [ ] Ejari / RERA live API integrations
- [ ] Database and authentication
- [ ] Lease Documents and Settings pages
