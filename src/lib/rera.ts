import type { DubaiZone, ReraCalculation } from "@/lib/types";

export const DUBAI_ZONES: DubaiZone[] = [
  { id: "saadiyat-island", label: "Saadiyat Island", avgRentAed: 199_000 },
  { id: "al-reem-island", label: "Al Reem Island", avgRentAed: 172_000 },
  { id: "yas-island", label: "Yas Island", avgRentAed: 157_000 },
  { id: "al-khalidiyah", label: "Al Khalidiyah", avgRentAed: 149_000 },
  { id: "corniche", label: "Corniche", avgRentAed: 175_000 },
  { id: "masdar-city", label: "Masdar City", avgRentAed: 139_000 },
  { id: "al-bateen", label: "Al Bateen", avgRentAed: 162_500 },
  { id: "al-raha-beach", label: "Al Raha Beach", avgRentAed: 174_000 },
  { id: "khalifa-city", label: "Khalifa City", avgRentAed: 116_000 },
  { id: "al-zahiyah", label: "Al Zahiyah", avgRentAed: 135_500 },
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
