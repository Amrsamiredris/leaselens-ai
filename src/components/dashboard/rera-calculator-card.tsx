"use client";

import { useEffect, useMemo, useState } from "react";
import { Scale } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PORTFOLIO } from "@/lib/mock-data";
import {
  calculateReraIncrease,
  DUBAI_ZONES,
  formatAed,
} from "@/lib/rera";
import type { LeaseExtraction, ReraCalculation } from "@/lib/types";
import { cn } from "@/lib/utils";

function districtFromLease(lease: LeaseExtraction): string | undefined {
  if (lease.districtName?.trim()) {
    return lease.districtName.trim();
  }
  const parts = lease.propertyAddress.split(",");
  return parts[parts.length - 1]?.trim() || undefined;
}

type ReraCalculatorCardProps = {
  lease: LeaseExtraction;
  onCalculationChange: (result: ReraCalculation) => void;
  titleTooltip?: string;
};

const badgeVariantStyles: Record<ReraCalculation["badgeVariant"], string> = {
  none: "ll-status-bounced",
  low: "ll-status-pending",
  medium: "ll-status-pending",
  high: "ll-status-cleared",
};

export function ReraCalculatorCard({
  lease,
  onCalculationChange,
  titleTooltip,
}: ReraCalculatorCardProps) {
  const [currentRent, setCurrentRent] = useState(lease.annualRentAED);
  const [marketRate, setMarketRate] = useState(DUBAI_ZONES[0].avgRentAed);
  const [selectedZone, setSelectedZone] = useState(DUBAI_ZONES[0].id);

  useEffect(() => {
    setCurrentRent(lease.annualRentAED);
    const district = districtFromLease(lease);
    const seededRate =
      (district ? PORTFOLIO.marketRatesByDistrict[district] : undefined) ??
      180_000;
    setMarketRate(seededRate);
  }, [lease.annualRentAED, lease.districtName, lease.propertyAddress]);

  const result = useMemo(
    () => calculateReraIncrease(currentRent, marketRate),
    [currentRent, marketRate]
  );

  useEffect(() => {
    onCalculationChange(result);
  }, [
    result.maxIncreasePercent,
    result.newMaxRent,
    result.percentBelowMarket,
    result.badgeVariant,
    onCalculationChange,
    result,
  ]);

  const handleZoneChange = (zoneId: string | null) => {
    if (!zoneId) return;
    setSelectedZone(zoneId);
    const zone = DUBAI_ZONES.find((z) => z.id === zoneId);
    if (zone) setMarketRate(zone.avgRentAed);
  };

  return (
    <div className="extracted-card mb-4 p-[1.4rem_1.6rem]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2
            className="text-[0.95rem] font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {titleTooltip ? (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <span className="cursor-default underline decoration-dotted decoration-[var(--text-muted)] underline-offset-4">
                      Legal rent increase calculator
                    </span>
                  }
                />
                <TooltipContent className="max-w-xs">{titleTooltip}</TooltipContent>
              </Tooltip>
            ) : (
              "Legal rent increase calculator"
            )}
          </h2>
          <p
            className="mt-1 text-[0.82rem]"
            style={{ color: "var(--text-secondary)" }}
          >
            RERA Decree No. 43 of 2013 band rules
          </p>
        </div>
        <Scale className="size-5 shrink-0 text-[var(--text-secondary)]" strokeWidth={1.5} />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="current-rent" className="text-[0.78rem]" style={{ color: "var(--text-secondary)" }}>
            Current annual rent (AED)
          </Label>
          <Input
            id="current-rent"
            type="number"
            min={0}
            value={currentRent}
            onChange={(event) =>
              setCurrentRent(Math.max(0, Number(event.target.value) || 0))
            }
            className="ll-input h-10"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="zone-select" className="text-[0.78rem]" style={{ color: "var(--text-secondary)" }}>
            Market zone
          </Label>
          <Select value={selectedZone} onValueChange={handleZoneChange}>
            <SelectTrigger id="zone-select" className="ll-input h-10">
              <SelectValue placeholder="Select zone" />
            </SelectTrigger>
            <SelectContent
              className="border"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border-default)",
                color: "var(--text-primary)",
              }}
            >
              <SelectGroup>
                {DUBAI_ZONES.map((zone) => (
                  <SelectItem key={zone.id} value={zone.id}>
                    {zone.label} ({formatAed(zone.avgRentAed)})
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="market-rate" className="text-[0.78rem]" style={{ color: "var(--text-secondary)" }}>
            Market rate (AED)
          </Label>
          <Input
            id="market-rate"
            type="number"
            min={0}
            value={marketRate}
            onChange={(event) =>
              setMarketRate(Math.max(0, Number(event.target.value) || 0))
            }
            className="ll-input h-10"
          />
        </div>

        <div
          className="rounded-[var(--radius-md)] border p-4"
          style={{
            background: "var(--bg-inset)",
            borderColor: "var(--border-default)",
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[0.72rem]" style={{ color: "var(--text-secondary)" }}>
                Maximum legal increase
              </p>
              <p
                className="text-[1.6rem] font-semibold"
                style={{ color: "var(--green-text)" }}
              >
                {result.maxIncreasePercent}%
              </p>
            </div>
            <span
              className={cn(
                badgeVariantStyles[result.badgeVariant],
                "rounded-lg px-4 py-2 text-base font-semibold"
              )}
            >
              {result.maxIncreasePercent === 0
                ? "No increase permitted"
                : `Up to ${result.maxIncreasePercent}%`}
            </span>
          </div>
          <div className="mt-2 h-1 w-full rounded-full bg-[var(--bg-card-muted)]">
            <div
              className="h-1 rounded-full bg-[var(--text-primary)] transition-all"
              style={{ width: `${result.percentBelowMarket}%` }}
            />
          </div>

          <div
            className="mt-3 border-t pt-3"
            style={{ borderColor: "var(--border-default)" }}
          >
            <p className="text-[0.72rem]" style={{ color: "var(--text-secondary)" }}>
              New maximum rent
            </p>
            <p
              className="text-[1.1rem] font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              {formatAed(result.newMaxRent)}
            </p>
            <p className="mt-1 text-[0.72rem]" style={{ color: "var(--text-muted)" }}>
              {result.percentBelowMarket.toFixed(1)}% below market rate
            </p>
          </div>
        </div>

        <p
          className="border-t pt-[0.6rem] text-[0.72rem] italic leading-relaxed"
          style={{
            borderColor: "var(--border-default)",
            color: "var(--text-muted)",
          }}
        >
          Based on RERA Decree No. 43 of 2013. Verify against the official DLD
          Smart Rental Index before issuing notice.
        </p>
      </div>
    </div>
  );
}
