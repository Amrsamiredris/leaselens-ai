"use client";

import { useEffect, useMemo, useState } from "react";
import { Scale } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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

const badgeVariantStyles: Record<
  ReraCalculation["badgeVariant"],
  string
> = {
  none: "bg-red-100 text-red-800 border-red-200",
  low: "bg-amber-100 text-amber-800 border-amber-200",
  medium: "bg-amber-100 text-amber-900 border-amber-300",
  high: "bg-emerald-100 text-emerald-800 border-emerald-200",
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
    <div className="brand-card flex flex-col p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-base font-semibold text-foreground">
            Legal rent increase calculator
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            RERA Decree No. 43 of 2013 band rules
          </p>
        </div>
        <Scale className="size-5 shrink-0 text-primary" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="current-rent">Current annual rent (AED)</Label>
          <Input
            id="current-rent"
            type="number"
            min={0}
            value={currentRent}
            onChange={(event) =>
              setCurrentRent(Math.max(0, Number(event.target.value) || 0))
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="zone-select">Market zone</Label>
          <Select value={selectedZone} onValueChange={handleZoneChange}>
            <SelectTrigger id="zone-select">
              <SelectValue placeholder="Select zone" />
            </SelectTrigger>
            <SelectContent>
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
          <Label htmlFor="market-rate">Market rate (AED)</Label>
          <Input
            id="market-rate"
            type="number"
            min={0}
            value={marketRate}
            onChange={(event) =>
              setMarketRate(Math.max(0, Number(event.target.value) || 0))
            }
          />
        </div>

        <div className="rounded-lg border border-border bg-muted/20 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">
                Maximum legal increase
              </p>
              <p className="font-display text-2xl font-bold text-foreground">
                {result.maxIncreasePercent}%
              </p>
            </div>
            <Badge
              variant="outline"
              className={cn("border", badgeVariantStyles[result.badgeVariant])}
            >
              {result.maxIncreasePercent === 0
                ? "No increase permitted"
                : `Up to ${result.maxIncreasePercent}%`}
            </Badge>
          </div>

          <div className="mt-3 border-t border-border pt-3">
            <p className="text-xs text-muted-foreground">New maximum rent</p>
            <p className="text-lg font-semibold text-foreground">
              {formatAed(result.newMaxRent)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {result.percentBelowMarket.toFixed(1)}% below market rate
            </p>
          </div>
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground">
          Based on RERA Decree No. 43 of 2013. Verify against the official DLD
          Smart Rental Index before issuing notice.
        </p>
      </div>
    </div>
  );
}
