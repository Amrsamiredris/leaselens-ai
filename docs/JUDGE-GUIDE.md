# Judge guide — LeaseLens AI

**Track 3: Future Communities** · Abu Dhabi AI PropTech Challenge · Hub71

This guide helps the judging team evaluate LeaseLens AI in **~5 minutes** — on the live demo or from the repo.

---

## Quick links

| Resource | URL |
|----------|-----|
| **Live demo** | Open the deployed app → sidebar **Judge Guide** or go to `/judge` |
| **GitHub repo** | https://github.com/Amrsamiredris/leaselens-ai |
| **Full demo script** | [docs/demo-script.md](./demo-script.md) |
| **Platform handoff** | [docs/PLATFORM-HANDOFF.md](./PLATFORM-HANDOFF.md) |

---

## 5-minute evaluation path

### 1. Dashboard KPIs (~30 sec)

Go to **Dashboard** (`/`).

- Three metric cards load from official starter-kit CSVs (3,500+ rent listings).
- **Active Leases**, **Upcoming Ejari Renewals** (90-day window), **Pending Cheques** — all precomputed at build time; they work without uploading anything.

### 2. AI contract extraction (~1 min)

In the upload zone:

- **Option A:** Drag any PDF onto **Upload tenancy contract** — Claude extracts tenant, rent, Ejari expiry, and payment terms via `POST /api/extract-lease`.
- **Option B:** Click **Load demo data** — instant demo lease (Mohammed Al Rashidi) with no API key required.

Watch for the loading state: *"AI extracting clauses…"*

### 3. Extracted lease panel (~45 sec)

After extraction completes, review the right-hand panel:

- Tenant name, annual rent, Ejari expiry (urgency coloring)
- Special clauses pulled from the contract
- **Legal Rent Increase Calculator** — adjust market rate; RERA Decree 43 bands update live

### 4. Community context (~30 sec)

Scroll to **Community Context** — district metrics joined from `sample_communities.csv` (resident experience, service demand, optimization opportunity). This is the Future Communities track differentiator.

### 5. PDC cheque schedule (~30 sec)

Review the auto-generated post-dated cheque table. Click a cheque row to toggle **Pending → Cleared → Bounced** and see the UAE Cheques Law warning on bounce.

### 6. Renewal notice (~1 min)

Click **Generate 90-day renewal notice**:

- Switch **WhatsApp** / **Email** tabs (English and Arabic drafts)
- Use **Copy to clipboard** or **Download .txt**
- Notice text reflects extracted rent, RERA cap, and Ejari expiry

### 7. Lease portfolio (~30 sec)

Open **Lease Portfolio** (`/leases`) — 30 sample tenancies from starter-kit data with renewal-due badges.

---

## What to look for

| Criterion | Where to see it |
|-----------|-----------------|
| **Working prototype** | Full upload → extract → notice flow on Dashboard |
| **AI doing real work** | PDF upload calls Claude (`/api/extract-lease`); toast confirms extraction mode |
| **Problem framing** | KPI cards + Ejari renewal urgency + compliance notices |
| **Future Communities** | Community Context card joined on district |
| **Demo readiness** | **Load demo data** fallback if API is unavailable |
| **Data honesty** | Footer disclaimer on every page — synthetic starter-kit data |

---

## Fallback paths (if something breaks)

1. Click **Load demo data** instead of uploading — full UI path still works.
2. Refresh the page — KPIs are static and always load.
3. If upload fails, the app falls back to demo extraction automatically (toast: *"Demo extraction loaded"*).

No login, database, or setup required for the live demo.

---

## Running from the repo (optional)

```bash
git clone https://github.com/Amrsamiredris/leaselens-ai.git
cd leaselens-ai
npm install
npm run dev
```

Open http://localhost:3000/judge for this guide in the app.

**Optional — real AI extraction locally:**

```bash
cp .env.example .env.local
# Add ANTHROPIC_API_KEY=sk-ant-...
```

Without an API key, upload still completes using built-in demo fallback data.

---

## Data disclaimer

Metrics and Ejari/tenant fields are **synthetic extensions** on the official hackathon starter-kit CSVs. They are invented for the challenge — not real Abu Dhabi market data. The app labels this on every page.

---

## Team contact

Repo: https://github.com/Amrsamiredris/leaselens-ai
