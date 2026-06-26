"use client";

import { Building2, Calendar, CreditCard, FileText, User } from "lucide-react";

import { EjariCountdown } from "@/components/dashboard/ejari-countdown";
import type { LeaseExtraction, UploadState } from "@/lib/types";
import { cn } from "@/lib/utils";

type ExtractedDataPanelProps = {
  uploadState: UploadState;
  data: LeaseExtraction;
};

const fields = [
  { key: "propertyAddress" as const, label: "Property", icon: Building2 },
  { key: "tenantName" as const, label: "Tenant", icon: User },
  { key: "landlordName" as const, label: "Landlord", icon: User },
  { key: "annualRent" as const, label: "Annual rent", icon: CreditCard },
  { key: "ejariExpiry" as const, label: "Ejari expiry", icon: Calendar },
  { key: "paymentTerms" as const, label: "Payment terms", icon: CreditCard },
  { key: "contractStartDate" as const, label: "Contract start", icon: Calendar },
] as const;

export function ExtractedDataPanel({
  uploadState,
  data,
}: ExtractedDataPanelProps) {
  const isDone = uploadState === "done";

  return (
    <div
      className={cn(
        "brand-card flex flex-col p-5 transition-opacity duration-300 motion-reduce:transition-none",
        isDone ? "opacity-100" : "opacity-95"
      )}
    >
      <div className="mb-4">
        <h2 className="font-display text-base font-semibold text-foreground">
          Extracted lease data
        </h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {isDone
            ? "AI-parsed fields from your tenancy contract"
            : "Upload a contract to extract lease terms"}
        </p>
      </div>

      {!isDone ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 p-8 text-center">
          <Building2 className="size-8 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">
            Tenant, property, rent, and Ejari details appear here after upload
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <EjariCountdown ejariExpiryDate={data.ejariExpiryDate} />

          <div className="flex flex-col divide-y divide-border">
            {fields.map((field) => {
              const Icon = field.icon;
              const value = data[field.key];

              return (
                <div
                  key={field.key}
                  className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="brand-label">{field.label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-foreground">
                      {value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {data.specialClauses.length > 0 && (
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <FileText className="size-3.5" />
                Special clauses
              </div>
              <ul className="flex flex-col gap-1.5">
                {data.specialClauses.map((clause) => (
                  <li
                    key={clause}
                    className="text-sm text-foreground/90 before:mr-2 before:text-primary before:content-['•']"
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
