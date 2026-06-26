import { Calendar, CreditCard, User } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { LeaseExtraction, UploadState } from "@/lib/types";
import { cn } from "@/lib/utils";

type ExtractedDataPanelProps = {
  uploadState: UploadState;
  data: LeaseExtraction;
};

const fields = [
  { key: "tenantName", label: "Tenant Name", icon: User },
  { key: "annualRent", label: "Annual Rent", icon: CreditCard },
  { key: "ejariExpiry", label: "Ejari Expiry", icon: Calendar },
  { key: "paymentTerms", label: "Payment Terms", icon: CreditCard },
] as const;

export function ExtractedDataPanel({
  uploadState,
  data,
}: ExtractedDataPanelProps) {
  const isDone = uploadState === "done";

  return (
    <Card
      className={cn(
        "flex h-full flex-col rounded-xl border-slate-200 shadow-sm transition-opacity duration-300 motion-reduce:transition-none",
        isDone ? "opacity-100" : "opacity-90"
      )}
    >
      <CardHeader>
        <CardTitle className="text-lg text-slate-900">
          Extracted Lease Data
        </CardTitle>
        <CardDescription>
          {isDone
            ? "AI-parsed fields from your tenancy contract"
            : "Upload a contract to extract lease terms"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        {!isDone ? (
          <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Extracted tenant, rent, and Ejari details will appear here after
              upload.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {fields.map((field, index) => {
              const Icon = field.icon;
              const value = data[field.key];

              return (
                <div key={field.key}>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600">
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {field.label}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-slate-900">
                        {value}
                      </p>
                    </div>
                  </div>
                  {index < fields.length - 1 && (
                    <Separator className="mt-3" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
