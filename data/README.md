# Hackathon datasets (synthetic)

CSV files vendored from the [Abu Dhabi AI PropTech Challenge starter kit](https://github.com/abu-dhabi-ai-proptech-challenge/starter-kit/tree/main/data).

| File | Used by LeaseLens |
|------|-------------------|
| `sample_listings.csv` | Rent portfolio metrics and demo lease extraction |
| `sample_communities.csv` | Track 3 community context (joined on `district`) |
| `districts.csv` | District reference |

> **All data is synthetic.** Generated for the challenge — not real Abu Dhabi market data. Do not cite as actual market figures.

Regenerated at build time into `src/data/lease-portfolio.json` via `scripts/build-lease-data.mjs`.
