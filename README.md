# LeaseLens AI
**Clarity for every lease — Intelligence layer for Abu Dhabi communities**

Track 3: Future Communities · Abu Dhabi AI PropTech Challenge · Hub71, June 2026

## Live Demo
[YOUR VERCEL URL HERE]

## What it does
Property managers in Abu Dhabi track hundreds of tenancies manually. Missed Ejari 
renewals create compliance risk. Rent increases get miscalculated under RERA Decree 43. 
PDF review doesn't scale.

LeaseLens AI connects lease compliance operations to community intelligence:
1. Upload any tenancy PDF → Claude extracts all key fields in under 10 seconds
2. RERA Decree 43 calculator computes the legal rent increase cap vs district market rates
3. Post-dated cheque schedule auto-generates from payment terms
4. Bilingual EN/AR 90-day renewal notice ready to send via WhatsApp or email
5. Community insight card joins the lease's district to population, occupancy, and 
   mobility metrics from the starter-kit dataset

## Run locally
git clone https://github.com/Amrsamiredris/leaselens-ai
cd leaselens-ai
npm install
npm run dev
# Open http://localhost:3000
# Click "Load demo data" — all features work without an API key

# For live PDF extraction:
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local

## What the AI does
Claude Sonnet 4.6 receives the raw PDF as a base64 document via the Anthropic Messages API.  
It extracts: tenant name, annual rent AED, Ejari expiry date, payment terms, landlord name, 
property address, contract start date, and special clauses — returning strict JSON.  
Without AI: 15–20 min per PDF manually. With AI: under 10 seconds.

## Built today (hackathon scope)
- Claude PDF extraction via `/api/extract-lease` (Anthropic Messages API)
- RERA Decree 43 calculator with per-district market rates derived from 
  sample_transactions.csv (5,000 transactions, median rent per district)
- PDC cheque schedule generator with UAE Cheques Law bounce warning
- Bilingual EN/AR renewal notice generator (WhatsApp + email)
- Community insight card joining lease district to sample_communities.csv
- District profiles (infrastructure score, yield, area type) from districts.csv
- Build-time data pipeline: CSV → JSON via scripts/build-lease-data.mjs

## Data sources
All from the official hackathon starter kit:  
https://huggingface.co/datasets/eVoost/abu-dhabi-ai-proptech-challenge

| File | Rows | Used for |
|---|---|---|
| sample_listings.csv | 6,000 | Portfolio KPIs |
| sample_communities.csv | 90 | Community insight card |
| sample_transactions.csv | 5,000 | District market rates for RERA calculator |
| districts.csv | 20 | District profiles, infrastructure scores |

## Beyond the demo
Replace synthetic data with:
- DMT/Ejari API → real registration status
- Abu Dhabi Smart Rental Index → live market rates
- Real tenancy PDFs → extraction prompt is production-ready

## Stack
Next.js 14 · TypeScript · Tailwind CSS · shadcn/ui · Anthropic Claude Sonnet 4.6 · Vercel
