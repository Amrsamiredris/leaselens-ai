"use client";

import { AlertTriangle } from "lucide-react";

import { EjariCountdown } from "@/components/dashboard/ejari-countdown";
import { formatDisplayDate } from "@/lib/lease-utils";
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

type FieldRowProps = {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
};

function FieldRow({ label, value, valueClassName }: FieldRowProps) {
  return (
    <div className="grid grid-cols-[160px_1fr] items-center gap-2 py-[0.55rem]">
      <span className="text-[0.8rem]" style={{ color: "var(--text-secondary)" }}>
        {label}
      </span>
      <span
        className={cn(
          "text-[0.8rem] font-medium tabular-nums",
          valueClassName ?? "text-[var(--text-primary)]"
        )}
      >
        {value}
      </span>
    </div>
  );
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
          <EjariCountdown ejariExpiryDate={data.ejariExpiryDate} />

          <FieldRow label="Tenant" value={data.tenantName} />
          <FieldRow label="Landlord" value={data.landlordName} />
          <FieldRow label="Property address" value={data.propertyAddress} />

          <hr className="my-2 border-[var(--border-default)]" />

          <FieldRow label="Annual rent" value={data.annualRent} />
          <FieldRow label="Payment terms" value={data.paymentTerms} />
          <FieldRow
            label="Max legal increase"
            value={`+${rera.maxIncreasePercent}% → ${formatAed(rera.newMaxRent)}`}
            valueClassName="text-[var(--green-text)]"
          />

          <hr className="my-2 border-[var(--border-default)]" />

          <FieldRow
            label="Ejari expiry"
            value={
              expiryUrgent ? (
                <span className="inline-flex items-center text-[var(--amber-text)]">
                  <AlertTriangle className="mr-1 size-3 shrink-0" aria-hidden />
                  {data.ejariExpiry}
                </span>
              ) : (
                data.ejariExpiry
              )
            }
          />
          <FieldRow
            label="Days remaining"
            value={`${daysRemaining} days`}
            valueClassName={
              daysWarning
                ? "text-[var(--amber-text)]"
                : expiryUrgent
                  ? "text-[var(--red)]"
                  : undefined
            }
          />
          <FieldRow
            label="Contract start"
            value={formatDisplayDate(data.contractStartDate)}
          />
        </div>
      )}
    </div>
  );
}
