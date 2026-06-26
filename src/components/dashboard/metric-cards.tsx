import { TrendingUp } from "lucide-react";

import { StaggerGrid, StaggerItem } from "@/components/motion/stagger-grid";
import { DASHBOARD_METRICS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ejariUrgent = DASHBOARD_METRICS.upcomingEjariRenewals > 10;

const metrics = [
  {
    label: "Active leases",
    value: DASHBOARD_METRICS.activeLeases.toLocaleString("en-AE"),
    valueClass: "text-[var(--text-primary)]",
    sub: "Total portfolio",
    subClass: "text-[var(--text-secondary)]",
    showPulse: false,
  },
  {
    label: "Ejari renewals (90 days)",
    value: DASHBOARD_METRICS.upcomingEjariRenewals.toLocaleString("en-AE"),
    valueClass: "text-[var(--amber-text)]",
    sub: "Action required",
    subClass: "text-[var(--amber-text)]",
    showPulse: ejariUrgent,
  },
  {
    label: "Pending cheques",
    value: `AED ${DASHBOARD_METRICS.pendingChequesAed.toLocaleString("en-AE")}`,
    valueClass: "text-[var(--red)]",
    sub: "Due this month",
    subClass: "text-[var(--text-secondary)]",
    showPulse: false,
  },
] as const;

export function MetricCards() {
  return (
    <StaggerGrid className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <StaggerItem key={metric.label}>
          <div className="metric-card">
            <p className="mb-2 text-[0.68rem] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
              {metric.label}
            </p>
            <div className="flex items-center gap-2">
              <p
                className={cn(
                  "text-4xl font-bold leading-none tabular-nums tracking-tight",
                  metric.valueClass
                )}
              >
                {metric.value}
              </p>
              <TrendingUp
                className="size-4 shrink-0 text-[var(--green-text)]"
                strokeWidth={1.5}
                aria-hidden
              />
            </div>
            <div
              className={cn(
                "mt-[0.35rem] flex items-center gap-2 text-[0.78rem]",
                metric.subClass
              )}
            >
              {metric.showPulse && <span className="ll-pulse-dot" aria-hidden />}
              <span className={metric.showPulse ? "font-medium" : undefined}>
                {metric.sub}
              </span>
            </div>
          </div>
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}
