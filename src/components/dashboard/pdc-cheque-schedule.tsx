"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";

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
  Pending: "ll-status-pending",
  Cleared: "ll-status-cleared",
  Bounced: "ll-status-bounced",
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
    <div className="ll-card flex flex-col p-5">
      <div className="mb-4">
        <h2 className="ll-card-heading">PDC cheque schedule</h2>
        <p className="mt-0.5 ll-body">
          Auto-generated from {lease.paymentTerms} · {lease.annualRent}/yr
        </p>
      </div>

      <div className="mb-4 flex flex-col gap-2">
        <Label htmlFor="cheque-offset" className="text-[0.78rem] text-slate-token">
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
          className="ll-input h-10 max-w-[200px] border-token bg-[var(--input-bg)] text-white-token"
        />
      </div>

      {hasBounced && (
        <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-[var(--bounced-banner-border)] bg-[var(--bounced-banner-bg)] px-4 py-[0.7rem]">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[var(--bounced-text)]" />
          <div>
            <p className="text-[0.8rem] font-medium text-[var(--bounced-text)]">
              Bounced cheque detected
            </p>
            <p className="mt-0.5 text-[0.78rem] text-[var(--bounced-text)]">
              Initiate legal notice within 14 days under UAE Cheques Law.
            </p>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-token hover:bg-transparent">
              <TableHead className="text-[0.68rem] font-medium uppercase tracking-[0.08em] text-slate-token">
                Cheque #
              </TableHead>
              <TableHead className="text-[0.68rem] font-medium uppercase tracking-[0.08em] text-slate-token">
                Due date
              </TableHead>
              <TableHead className="text-[0.68rem] font-medium uppercase tracking-[0.08em] text-slate-token">
                Amount (AED)
              </TableHead>
              <TableHead className="text-[0.68rem] font-medium uppercase tracking-[0.08em] text-slate-token">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedule.map((item) => (
              <TableRow
                key={item.number}
                className="border-b border-token hover:bg-[var(--surface)]"
              >
                <TableCell className="font-medium text-white-token">
                  {item.number}
                </TableCell>
                <TableCell className="text-slate-token">
                  {formatDisplayDate(item.dueDate)}
                </TableCell>
                <TableCell className="tabular-nums text-white-token">
                  {item.amountAed.toLocaleString("en-AE")}
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    onClick={() => handleStatusToggle(item.number)}
                    className="cursor-pointer"
                    aria-label={`Toggle status for cheque ${item.number}, currently ${item.status}`}
                  >
                    <span className={cn(statusStyles[item.status])}>
                      {item.status}
                    </span>
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
