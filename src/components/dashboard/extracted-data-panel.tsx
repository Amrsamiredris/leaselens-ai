"use client";

import { FileText } from "lucide-react";

import { EjariCountdown } from "@/components/dashboard/ejari-countdown";
import type { LeaseExtraction, UploadState } from "@/lib/types";
import { cn } from "@/lib/utils";

type ExtractedDataPanelProps = {
  uploadState: UploadState;
  data: LeaseExtraction;
};

const fields = [
  { key: "propertyAddress" as const, label: "Property" },
  { key: "tenantName" as const, label: "Tenant" },
  { key: "landlordName" as const, label: "Landlord" },
  { key: "annualRent" as const, label: "Annual rent" },
  { key: "ejariExpiry" as const, label: "Ejari expiry", isExpiry: true },
  { key: "paymentTerms" as const, label: "Payment terms" },
  { key: "contractStartDate" as const, label: "Contract start" },
] as const;

function isExpiryUrgent(ejariExpiryDate: string): boolean {
  const expiry = new Date(`${ejariExpiryDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysRemaining = Math.ceil(
    (expiry.getTime() - today.getTime()) / msPerDay
  );
  return daysRemaining < 90;
}

export function ExtractedDataPanel({
  uploadState,
  data,
}: ExtractedDataPanelProps) {
  const isDone = uploadState === "done";
  const expiryUrgent = isExpiryUrgent(data.ejariExpiryDate);

  return (
    <div
      className={cn(
        "ll-card flex flex-col p-5 transition-opacity duration-150 motion-reduce:transition-none",
        isDone ? "opacity-100" : "opacity-95"
      )}
    >
      <div className="mb-4 border-b border-token pb-3">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.1em] text-slate-token">
          Extracted lease data
        </p>
        <p className="mt-1 ll-body">
          {isDone
            ? "AI-parsed fields from your tenancy contract"
            : "Upload a contract to extract lease terms"}
        </p>
      </div>

      {!isDone ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-token bg-[var(--surface)] p-8 text-center">
          <p className="text-[0.85rem] text-slate-token">
            Tenant, property, rent, and Ejari details appear here after upload
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <EjariCountdown ejariExpiryDate={data.ejariExpiryDate} />

          <div className="flex flex-col">
            {fields.map((field) => {
              const value = data[field.key];
              const isExpiryField = "isExpiry" in field && field.isExpiry;

              return (
                <div
                  key={field.key}
                  className="flex items-center justify-between gap-4 border-b border-token py-3 last:border-b-0"
                >
                  <span className="text-[0.78rem] text-slate-token">
                    {field.label}
                  </span>
                  <span
                    className={cn(
                      "text-right text-[0.85rem] font-medium text-white-token",
                      isExpiryField && expiryUrgent && "text-red-alert"
                    )}
                  >
                    {value}
                  </span>
                </div>
              );
            })}
          </div>

          {data.specialClauses.length > 0 && (
            <div className="border-t border-token pt-4">
              <div className="mb-2 flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.1em] text-slate-token">
                <FileText className="size-3.5" />
                Special clauses
              </div>
              <ul className="flex flex-col gap-1.5">
                {data.specialClauses.map((clause) => (
                  <li
                    key={clause}
                    className="text-[0.85rem] text-white-token before:mr-2 before:text-gold-token before:content-['•']"
                  >
                    {clause}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
