# LeaseLens AI — Brand Guidelines

**Track:** Future Communities · Abu Dhabi AI PropTech Challenge · Hub71

---

## Brand essence

LeaseLens AI is the intelligence layer for Abu Dhabi residential lease operations. The brand balances **institutional trust** (compliance, Ejari, RERA) with **community warmth** (occupancy, resident experience, Future Communities track).

| Attribute | Expression |
|-----------|------------|
| Clarity | Clean layouts, readable data, lens metaphor |
| Trust | Deep teal, structured typography, compliance copy |
| Local relevance | Desert gold accents, Abu Dhabi community framing |
| Intelligence | Precise metrics, AI extraction, automation |

**Tagline:** *Clarity for every lease*

**Subtitle:** Intelligence layer for Abu Dhabi communities

---

## Logo

The mark combines three ideas:

1. **Lens** — outer circle (seeing through complex contracts)
2. **Building** — simplified property silhouette (PropTech)
3. **Gold focal point** — compliance alert / Ejari renewal signal

### Usage

- Minimum size: 28px icon
- Clear space: half the icon width on all sides
- On dark sidebar: full-color mark on teal square
- Do not stretch, rotate, or change mark colors independently

Files: `public/favicon.svg`, `public/icon.svg`, `src/components/brand/logo.tsx`

---

## Color palette

| Name | Hex | HSL | Role |
|------|-----|-----|------|
| Oasis Teal | `#1a6b5c` | `168 55% 26%` | Primary — buttons, links, brand mark |
| Pearl Sand | `#faf9f6` | `42 28% 97%` | Page background |
| Desert Gold | `#c9923a` | `38 65% 52%` | Accent — urgency, Ejari renewals |
| Charcoal Dusk | `#161c28` | `220 25% 12%` | Sidebar, headlines |
| Sea Mist | `#d4e8e4` | `168 25% 84%` | Borders, subtle fills |

### Rules

- One accent only: gold for warnings and priority states
- No purple/blue AI gradients
- Shadows tinted with teal, not pure black
- Synthetic data always disclosed in footer copy

---

## Typography

| Role | Font | Usage |
|------|------|-------|
| Display | **Fraunces** (serif) | Headlines, KPI numbers, page titles |
| UI / Body | **DM Sans** | Navigation, labels, body, tables |
| Data | Tabular nums + mono for IDs | Metrics, lease IDs |

### Scale

- Hero: 24–30px display semibold
- Section title: 16–18px display
- Body: 14px sans
- Labels: 11px uppercase, 0.08em tracking

---

## Voice & copy

**Do:** Direct, compliant, community-focused  
*"Ejari renewals due in 90 days"* · *"Upload tenancy contract"*

**Don't:** Generic AI hype  
Avoid: elevate, seamless, unleash, next-gen, game-changer

**Compliance disclaimer (required):**  
*Metrics derived from synthetic starter-kit listings. Ejari and tenant fields are demo extensions.*

---

## UI components

- **Cards:** `brand-card` — soft teal shadow, 10px radius
- **Sidebar:** Dark charcoal, teal active states
- **Metrics:** Display numerals, gold highlight for urgent Ejari queue
- **Upload zone:** Dashed border → solid teal on success
- **Track badge:** Future Communities — teal pill, uppercase

---

## Application touchpoints

| Surface | Treatment |
|---------|-----------|
| Dashboard | KPI row + contract upload + extraction panel |
| Lease portfolio | Data table with renewal status badges |
| Renewal notices | WhatsApp + email templates, copy-to-clipboard |
| Settings | Data policy, API mode, challenge context |

---

## Demo narrative (3 min)

1. **Problem** — 1,056 Ejari renewals in 90 days; manual PDF review doesn't scale
2. **Upload** — Drop tenancy PDF → `/api/extract` → structured fields
3. **Context** — Community insight from `sample_communities.csv`
4. **Action** — Generate 90-day renewal notice → copy WhatsApp draft
5. **Honesty** — Synthetic data disclaimer; real AI path via `OPENAI_API_KEY`
