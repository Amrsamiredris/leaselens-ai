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
    <div className="upload-card">
      <div className="mb-4">
        <h2
          className="text-[0.95rem] font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          PDC cheque schedule
        </h2>
        <p className="mt-1 text-[0.82rem]" style={{ color: "var(--text-secondary)" }}>
          Auto-generated from {lease.paymentTerms} · {lease.annualRent}/yr
        </p>
      </div>

      <div className="mb-4 flex flex-col gap-2">
        <Label htmlFor="cheque-offset" className="text-[0.78rem]" style={{ color: "var(--text-secondary)" }}>
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
          className="ll-input h-10 max-w-[200px]"
        />
      </div>

      {hasBounced && (
        <div
          className="mb-4 flex items-start gap-2.5 rounded-[var(--radius-md)] border px-4 py-[0.7rem]"
          style={{
            background: "var(--red-dim)",
            borderColor: "var(--red-border)",
            color: "var(--red)",
          }}
        >
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <div>
            <p className="text-[0.8rem] font-medium">Bounced cheque detected</p>
            <p className="mt-0.5 text-[0.78rem]">
              Initiate legal notice within 14 days under UAE Cheques Law.
            </p>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow
              className="bg-[var(--bg-inset)] hover:bg-[var(--bg-inset)]"
              style={{ borderColor: "var(--border-default)" }}
            >
              <TableHead className="text-[0.68rem] font-medium uppercase tracking-[0.08em]" style={{ color: "var(--text-muted)" }}>
                Cheque #
              </TableHead>
              <TableHead className="text-[0.68rem] font-medium uppercase tracking-[0.08em]" style={{ color: "var(--text-muted)" }}>
                Due date
              </TableHead>
              <TableHead className="text-[0.68rem] font-medium uppercase tracking-[0.08em]" style={{ color: "var(--text-muted)" }}>
                Amount (AED)
              </TableHead>
              <TableHead className="text-[0.68rem] font-medium uppercase tracking-[0.08em]" style={{ color: "var(--text-muted)" }}>
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedule.map((item) => (
              <TableRow
                key={item.number}
                className="hover:bg-[var(--bg-inset)]"
                style={{ borderColor: "var(--border-default)" }}
              >
                <TableCell className="font-medium" style={{ color: "var(--text-primary)" }}>
                  {item.number}
                </TableCell>
                <TableCell style={{ color: "var(--text-secondary)" }}>
                  {formatDisplayDate(item.dueDate)}
                </TableCell>
                <TableCell className="tabular-nums" style={{ color: "var(--text-primary)" }}>
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
