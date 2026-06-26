"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buildChequeSchedule, formatDisplayDate } from "@/lib/lease-utils";
import type { ChequeScheduleItem, ChequeStatus, LeaseExtraction } from "@/lib/types";
import { cn } from "@/lib/utils";

type PdcChequeScheduleProps = {
  lease: LeaseExtraction;
  schedule: ChequeScheduleItem[];
  onScheduleChange: (items: ChequeScheduleItem[]) => void;
  firstChequeOffsetDays: number;
  onOffsetChange: (days: number) => void;
};

const statusStyles: Record<ChequeStatus, string> = {
  Pending: "bg-amber-100 text-amber-800 border-amber-200",
  Cleared: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Bounced: "bg-red-100 text-red-800 border-red-200",
};

export function PdcChequeSchedule({
  lease,
  schedule,
  onScheduleChange,
  firstChequeOffsetDays,
  onOffsetChange,
}: PdcChequeScheduleProps) {
  const hasBounced = schedule.some((item) => item.status === "Bounced");

  const cycleStatus = (current: ChequeStatus): ChequeStatus => {
    if (current === "Pending") return "Cleared";
    if (current === "Cleared") return "Bounced";
    return "Pending";
  };

  const handleStatusToggle = (chequeNumber: number) => {
    onScheduleChange(
      schedule.map((item) =>
        item.number === chequeNumber
          ? { ...item, status: cycleStatus(item.status) }
          : item
      )
    );
  };

  if (schedule.length === 0) return null;

  return (
    <div className="brand-card flex flex-col p-5">
      <div className="mb-4">
        <h2 className="font-display text-base font-semibold text-foreground">
          PDC cheque schedule
        </h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Auto-generated from {lease.paymentTerms} · {lease.annualRent}/yr
        </p>
      </div>

      <div className="mb-4 flex flex-col gap-2">
        <Label htmlFor="cheque-offset">
          First cheque offset (days from contract start)
        </Label>
        <Input
          id="cheque-offset"
          type="number"
          min={0}
          max={90}
          value={firstChequeOffsetDays}
          onChange={(event) =>
            onOffsetChange(Math.max(0, Number(event.target.value) || 0))
          }
          className="max-w-[200px]"
        />
      </div>

      {hasBounced && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle />
          <AlertTitle>Bounced cheque detected</AlertTitle>
          <AlertDescription>
            Initiate legal notice within 14 days under UAE Cheques Law.
          </AlertDescription>
        </Alert>
      )}

      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cheque #</TableHead>
              <TableHead>Due date</TableHead>
              <TableHead>Amount (AED)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedule.map((item) => (
              <TableRow key={item.number}>
                <TableCell className="font-medium">{item.number}</TableCell>
                <TableCell>{formatDisplayDate(item.dueDate)}</TableCell>
                <TableCell className="tabular-nums">
                  {item.amountAed.toLocaleString("en-AE")}
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    onClick={() => handleStatusToggle(item.number)}
                    className="cursor-pointer"
                    aria-label={`Toggle status for cheque ${item.number}, currently ${item.status}`}
                  >
                    <Badge
                      variant="outline"
                      className={cn("border", statusStyles[item.status])}
                    >
                      {item.status}
                    </Badge>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function useChequeSchedule(
  lease: LeaseExtraction,
  enabled: boolean
): {
  schedule: ChequeScheduleItem[];
  setSchedule: React.Dispatch<React.SetStateAction<ChequeScheduleItem[]>>;
  firstChequeOffsetDays: number;
  setFirstChequeOffsetDays: React.Dispatch<React.SetStateAction<number>>;
} {
  const [firstChequeOffsetDays, setFirstChequeOffsetDays] = useState(0);
  const [schedule, setSchedule] = useState<ChequeScheduleItem[]>([]);

  const baseSchedule = useMemo(() => {
    if (!enabled) return [];
    return buildChequeSchedule(
      lease.annualRentAED,
      lease.paymentTerms,
      lease.contractStartDate,
      firstChequeOffsetDays
    );
  }, [
    enabled,
    lease.annualRentAED,
    lease.paymentTerms,
    lease.contractStartDate,
    firstChequeOffsetDays,
  ]);

  useEffect(() => {
    setSchedule((prev) => {
      if (prev.length === 0) return baseSchedule;
      return baseSchedule.map((item) => {
        const existing = prev.find((p) => p.number === item.number);
        return existing ? { ...item, status: existing.status } : item;
      });
    });
  }, [baseSchedule]);

  return {
    schedule,
    setSchedule,
    firstChequeOffsetDays,
    setFirstChequeOffsetDays,
  };
}
