import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createHash } from "crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function parseCsv(text) {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    values.push(current.trim());
    const row = {};
    headers.forEach((h, i) => {
      row[h] = values[i] ?? "";
    });
    return row;
  });
}

function hashNum(id, salt = 0) {
  const hash = createHash("md5").update(`${id}:${salt}`).digest();
  return hash.readUInt32BE(0);
}

function syntheticEjariExpiry(listingId, listedDate) {
  const base = new Date(listedDate);
  const offsetMonths = (hashNum(listingId, 1) % 18) + 6;
  base.setMonth(base.getMonth() + offsetMonths);
  if (hashNum(listingId, 2) % 5 === 0) {
    const now = new Date();
    const daysAhead = (hashNum(listingId, 3) % 75) + 15;
    const urgent = new Date(now);
    urgent.setDate(urgent.getDate() + daysAhead);
    return urgent.toISOString().slice(0, 10);
  }
  return base.toISOString().slice(0, 10);
}

function formatExpiryDisplay(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function chequeDueThisMonth(listingId) {
  const monthSlot = hashNum(listingId, 4) % 12;
  const now = new Date();
  return monthSlot === now.getMonth();
}

function enrichLease(row) {
  const ejariExpiry = syntheticEjariExpiry(row.listing_id, row.listed_date);
  return {
    listing_id: row.listing_id,
    district: row.district,
    community: row.community,
    listing_type: row.listing_type,
    property_type: row.property_type,
    bedrooms: Number(row.bedrooms),
    bathrooms: Number(row.bathrooms),
    size_sqm: Number(row.size_sqm),
    price_aed: Number(row.price_aed),
    price_per_sqm_aed: Number(row.price_per_sqm_aed),
    furnished: row.furnished === "true",
    amenities: row.amenities,
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
    listed_date: row.listed_date,
    status: row.status,
    agency_type: row.agency_type,
    tenant_name: "Ahmed Al Mansoori",
    ejari_expiry: ejariExpiry,
    ejari_expiry_display: formatExpiryDisplay(ejariExpiry),
    payment_terms: "4 Cheques",
    property_label: `${row.community}, ${row.district}`,
  };
}

const listingsRaw = readFileSync(
  join(root, "data/sample_listings.csv"),
  "utf8"
);
const communitiesRaw = readFileSync(
  join(root, "data/sample_communities.csv"),
  "utf8"
);

const allListings = parseCsv(listingsRaw);
const rentListings = allListings.filter((r) => r.listing_type === "rent");
const communities = parseCsv(communitiesRaw);

const activeStatuses = new Set(["available", "let", "under_offer"]);
const activeLeases = rentListings.filter((r) => activeStatuses.has(r.status));

const now = new Date();
const in90Days = new Date(now);
in90Days.setDate(in90Days.getDate() + 90);

let upcomingEjariRenewals = 0;
let pendingChequesAed = 0;

for (const row of rentListings) {
  const expiry = syntheticEjariExpiry(row.listing_id, row.listed_date);
  const expiryDate = new Date(expiry);
  if (expiryDate >= now && expiryDate <= in90Days) {
    upcomingEjariRenewals++;
  }
  if (chequeDueThisMonth(row.listing_id)) {
    pendingChequesAed += Number(row.price_aed) / 4;
  }
}

const demoRow =
  rentListings.find((r) => r.listing_id === "LST-00002") ?? rentListings[0];
const demoLease = enrichLease(demoRow);
demoLease.tenant_name = "Ahmed Al Mansoori";
demoLease.ejari_expiry = "2026-10-15";
demoLease.ejari_expiry_display = "Oct 15, 2026";

const communityRow =
  communities.find((c) => c.district === demoLease.district) ?? communities[0];

const communityInsight = {
  district: demoLease.district,
  residentExperienceScore: Number(communityRow.resident_experience_score),
  serviceDemandIndex: Number(communityRow.service_demand_index),
  occupancyRate: Number(communityRow.occupancy_rate),
  optimizationOpportunity: communityRow.optimization_opportunity.replace(
    /_/g,
    " "
  ),
  summary:
    "High-experience community — prioritize proactive tenancy renewals to maintain occupancy stability.",
};

const sampleLeases = rentListings
  .filter((r) => r.status === "let" || r.status === "under_offer")
  .slice(0, 30)
  .map(enrichLease);

const output = {
  metrics: {
    activeLeases: activeLeases.length,
    upcomingEjariRenewals,
    pendingChequesAed: Math.round(pendingChequesAed),
  },
  demoLease,
  communityInsight,
  sampleLeases,
  dataNotice:
    "Metrics derived from synthetic starter-kit listings. Ejari and tenant fields are demo extensions.",
};

const outDir = join(root, "src/data");
mkdirSync(outDir, { recursive: true });
writeFileSync(
  join(outDir, "lease-portfolio.json"),
  JSON.stringify(output, null, 2)
);

console.log(
  `Built lease-portfolio.json: ${activeLeases.length} active leases, ${upcomingEjariRenewals} renewals in 90d`
);
