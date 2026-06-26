"use client";

import { getEjariCountdownStatus } from "@/lib/lease-utils";
import { cn } from "@/lib/utils";

type EjariCountdownProps = {
  ejariExpiryDate: string;
};

export function EjariCountdown({ ejariExpiryDate }: EjariCountdownProps) {
  const status = getEjariCountdownStatus(ejariExpiryDate);
  const circumference = 2 * Math.PI * 54;
  const progress = Math.min(
    100,
    Math.max(0, (status.daysRemaining / 90) * 100)
  );
  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-muted/20 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Ejari renewal countdown
      </p>

      <div className="relative flex size-32 items-center justify-center">
        <svg
          className={cn(
            "size-32 -rotate-90",
            status.flash && "animate-pulse motion-reduce:animate-none"
          )}
          viewBox="0 0 120 120"
          aria-hidden
        >
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted/30"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn(
              status.ringClass,
              status.pulse && "animate-pulse motion-reduce:animate-none"
            )}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-bold tabular-nums text-foreground">
            {status.daysRemaining}
          </span>
          <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
            days left
          </span>
        </div>
      </div>

      <p
        className={cn(
          "text-center text-sm font-semibold",
          status.flash || status.daysRemaining < 60
            ? "text-red-600"
            : status.pulse
              ? "text-amber-600"
              : "text-emerald-600"
        )}
      >
        {status.label}
      </p>

      <p className="text-center text-xs text-muted-foreground">
        90-day notice window opened{" "}
        <span className="font-medium text-foreground">
          {status.noticeWindowOpened}
        </span>
      </p>
    </div>
  );
}
