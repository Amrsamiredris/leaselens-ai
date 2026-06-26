import type { DubaiZone, ReraCalculation } from "@/lib/types";

export const DUBAI_ZONES: DubaiZone[] = [
  { id: "downtown", label: "Downtown", avgRentAed: 180_000 },
  { id: "marina", label: "Marina", avgRentAed: 145_000 },
  { id: "jvc", label: "JVC", avgRentAed: 75_000 },
  { id: "al-barsha", label: "Al Barsha", avgRentAed: 95_000 },
  { id: "deira", label: "Deira", avgRentAed: 55_000 },
];

export function calculateReraIncrease(
  currentRentAed: number,
  marketRateAed: number
): ReraCalculation {
  if (marketRateAed <= 0 || currentRentAed <= 0) {
    return {
      maxIncreasePercent: 0,
      newMaxRent: currentRentAed,
      percentBelowMarket: 0,
      badgeVariant: "none",
    };
  }

  const percentBelowMarket =
    ((marketRateAed - currentRentAed) / marketRateAed) * 100;

  let maxIncreasePercent = 0;
  let badgeVariant: ReraCalculation["badgeVariant"] = "none";

  if (percentBelowMarket > 25) {
    maxIncreasePercent = 20;
    badgeVariant = "high";
  } else if (percentBelowMarket >= 20) {
    maxIncreasePercent = 15;
    badgeVariant = "high";
  } else if (percentBelowMarket >= 15) {
    maxIncreasePercent = 10;
    badgeVariant = "medium";
  } else if (percentBelowMarket >= 10) {
    maxIncreasePercent = 5;
    badgeVariant = "low";
  } else {
    maxIncreasePercent = 0;
    badgeVariant = "none";
  }

  const newMaxRent = Math.round(
    currentRentAed * (1 + maxIncreasePercent / 100)
  );

  return {
    maxIncreasePercent,
    newMaxRent,
    percentBelowMarket,
    badgeVariant,
  };
}

export function formatAed(amount: number): string {
  return `AED ${amount.toLocaleString("en-AE")}`;
}
