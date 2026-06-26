"use client";

import { formatAed } from "@/lib/rera";
import type { LeaseExtraction, ReraCalculation, UploadState } from "@/lib/types";
import { cn } from "@/lib/utils";

type ExtractedDataPanelProps = {
  uploadState: UploadState;
  data: LeaseExtraction;
  rera: ReraCalculation;
  onClear?: () => void;
};

function getDaysRemaining(ejariExpiryDate: string): number {
  const expiry = new Date(`${ejariExpiryDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.ceil((expiry.getTime() - today.getTime()) / msPerDay);
}

export function ExtractedDataPanel({
  uploadState,
  data,
  rera,
  onClear,
}: ExtractedDataPanelProps) {
  const isDone = uploadState === "done";
  const daysRemaining = getDaysRemaining(data.ejariExpiryDate);
  const expiryUrgent = daysRemaining < 90;
  const daysWarning = daysRemaining >= 60 && daysRemaining < 90;

  const rows = [
    { label: "Tenant", value: data.tenantName },
    { label: "Annual rent", value: data.annualRent },
    {
      label: "Ejari expiry",
      value: data.ejariExpiry,
      valueStyle: expiryUrgent ? "var(--red)" : "var(--text-primary)",
    },
    {
      label: "Days remaining",
      value: `${daysRemaining} days`,
      valueStyle: daysWarning
        ? "var(--amber-text)"
        : expiryUrgent
          ? "var(--red)"
          : "var(--text-primary)",
    },
    { label: "Payment terms", value: data.paymentTerms },
    {
      label: "Max legal increase",
      value: `+${rera.maxIncreasePercent}% → ${formatAed(rera.newMaxRent)}`,
      valueStyle: "var(--green-text)",
    },
  ];

  return (
    <div className="extracted-card mb-4 p-[1.4rem_1.6rem]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className="text-[0.65rem] font-medium uppercase tracking-[0.1em]"
            style={{ color: "var(--text-muted)" }}
          >
            Extracted lease data
          </p>
          <p
            className="mt-[0.2rem] text-[0.82rem]"
            style={{ color: "var(--text-secondary)" }}
          >
            {isDone
              ? "AI-parsed fields from your tenancy contract"
              : "Upload a contract to extract lease terms"}
          </p>
        </div>
        {isDone && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="shrink-0 border-none bg-transparent text-[0.72rem]"
            style={{ color: "var(--text-muted)" }}
          >
            Clear
          </button>
        )}
      </div>

      {!isDone ? (
        <div className="empty-state">
          Tenant, property, rent, and Ejari details appear here after upload
        </div>
      ) : (
        <div className="fade-in-rows mt-4">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 border-b py-[0.55rem] last:border-b-0"
              style={{ borderColor: "var(--border-default)" }}
            >
              <span
                className="text-[0.8rem]"
                style={{ color: "var(--text-secondary)" }}
              >
                {row.label}
              </span>
              <span
                className={cn("text-right text-[0.8rem] font-medium tabular-nums")}
                style={{ color: row.valueStyle ?? "var(--text-primary)" }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
