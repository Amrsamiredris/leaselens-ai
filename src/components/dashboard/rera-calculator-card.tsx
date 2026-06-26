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
  calculateReraIncrease,
  DUBAI_ZONES,
  formatAed,
} from "@/lib/rera";
import type { LeaseExtraction, ReraCalculation } from "@/lib/types";
import { cn } from "@/lib/utils";

type ReraCalculatorCardProps = {
  lease: LeaseExtraction;
  onCalculationChange: (result: ReraCalculation) => void;
};

const badgeVariantStyles: Record<ReraCalculation["badgeVariant"], string> = {
  none: "ll-rera-red",
  low: "ll-rera-amber",
  medium: "ll-rera-amber",
  high: "ll-rera-green",
};

export function ReraCalculatorCard({
  lease,
  onCalculationChange,
}: ReraCalculatorCardProps) {
  const [currentRent, setCurrentRent] = useState(lease.annualRentAED);
  const [marketRate, setMarketRate] = useState(DUBAI_ZONES[0].avgRentAed);
  const [selectedZone, setSelectedZone] = useState(DUBAI_ZONES[0].id);

  useEffect(() => {
    setCurrentRent(lease.annualRentAED);
  }, [lease.annualRentAED]);

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
    <div className="ll-card flex flex-col p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="ll-card-heading">Legal rent increase calculator</h2>
          <p className="mt-0.5 ll-body">
            RERA Decree No. 43 of 2013 band rules
          </p>
        </div>
        <Scale className="size-5 shrink-0 text-gold-token" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="current-rent" className="text-[0.78rem] text-slate-token">
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
            className="ll-input h-10 border-token bg-[var(--input-bg)] text-white-token placeholder:text-slate-token"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="zone-select" className="text-[0.78rem] text-slate-token">
            Market zone
          </Label>
          <Select value={selectedZone} onValueChange={handleZoneChange}>
            <SelectTrigger
              id="zone-select"
              className="ll-input h-10 border-token bg-[var(--input-bg)] text-white-token"
            >
              <SelectValue placeholder="Select zone" />
            </SelectTrigger>
            <SelectContent className="border-token bg-navy-mid text-white-token">
              <SelectGroup>
                {DUBAI_ZONES.map((zone) => (
                  <SelectItem
                    key={zone.id}
                    value={zone.id}
                    className="text-white-token focus:bg-[var(--surface)] focus:text-white-token"
                  >
                    {zone.label} ({formatAed(zone.avgRentAed)})
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="market-rate" className="text-[0.78rem] text-slate-token">
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
            className="ll-input h-10 border-token bg-[var(--input-bg)] text-white-token placeholder:text-slate-token"
          />
        </div>

        <div className="rounded-lg border border-token bg-[var(--surface)] p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[0.72rem] text-slate-token">
                Maximum legal increase
              </p>
              <p className="font-display text-[1.6rem] text-green-ok">
                {result.maxIncreasePercent}%
              </p>
            </div>
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-[0.72rem] font-medium",
                badgeVariantStyles[result.badgeVariant]
              )}
            >
              {result.maxIncreasePercent === 0
                ? "No increase permitted"
                : `Up to ${result.maxIncreasePercent}%`}
            </span>
          </div>

          <div className="mt-3 border-t border-token pt-3">
            <p className="text-[0.72rem] text-slate-token">New maximum rent</p>
            <p className="text-[1.1rem] font-medium text-white-token">
              {formatAed(result.newMaxRent)}
            </p>
            <p className="mt-1 text-[0.72rem] text-slate-token">
              {result.percentBelowMarket.toFixed(1)}% below market rate
            </p>
          </div>
        </div>

        <p className="border-t border-token pt-[0.6rem] text-[0.72rem] italic leading-relaxed text-slate-token">
          Based on RERA Decree No. 43 of 2013. Verify against the official DLD
          Smart Rental Index before issuing notice.
        </p>
      </div>
    </div>
  );
}
