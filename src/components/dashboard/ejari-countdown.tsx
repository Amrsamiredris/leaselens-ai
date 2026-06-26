"use client";

import { getEjariCountdownStatus } from "@/lib/lease-utils";
import { cn } from "@/lib/utils";

type EjariCountdownProps = {
  ejariExpiryDate: string;
};

function getRingColor(daysRemaining: number): string {
  if (daysRemaining > 90) return "var(--green-ok)";
  if (daysRemaining >= 60) return "var(--amber-warn)";
  return "var(--red-alert)";
}

export function EjariCountdown({ ejariExpiryDate }: EjariCountdownProps) {
  const status = getEjariCountdownStatus(ejariExpiryDate);
  const circumference = 2 * Math.PI * 54;
  const progress = Math.min(
    100,
    Math.max(0, (status.daysRemaining / 90) * 100)
  );
  const strokeDashoffset =
    circumference - (progress / 100) * circumference;
  const ringColor = getRingColor(status.daysRemaining);
  const isCritical = status.daysRemaining < 30;

  return (
    <div className="flex flex-col items-center gap-3 border-b border-token pb-5">
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.1em] text-slate-token">
        Ejari renewal countdown
      </p>

      <div className="relative flex size-32 items-center justify-center">
        <svg
          className="size-32 -rotate-90"
          viewBox="0 0 120 120"
          aria-hidden
        >
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="var(--border)"
            strokeWidth="4"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={ringColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn(
              isCritical && "ll-countdown-pulse motion-reduce:animate-none"
            )}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-[2rem] tabular-nums text-white-token">
            {status.daysRemaining}
          </span>
          <span className="text-[0.72rem] text-slate-token">days left</span>
        </div>
      </div>

      <p
        className={cn(
          "text-center text-[0.72rem] font-medium",
          status.daysRemaining > 90 && "text-green-ok",
          status.daysRemaining >= 60 &&
            status.daysRemaining <= 90 &&
            "text-amber-warn",
          status.daysRemaining < 60 && "text-red-alert"
        )}
      >
        {status.label}
      </p>

      <p className="text-center text-[0.72rem] text-slate-token">
        90-day notice window opened{" "}
        <span className="font-medium text-white-token">
          {status.noticeWindowOpened}
        </span>
      </p>
    </div>
  );
}
