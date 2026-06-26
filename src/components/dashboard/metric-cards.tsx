import { TrendingUp } from "lucide-react";

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
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="metric-card border-l-2 border-[#f0c55a] transition-colors duration-200 hover:bg-[#122540]"
        >
          <p
            className="mb-2 text-[0.68rem] font-medium uppercase tracking-[0.1em]"
            style={{ color: "var(--text-muted)" }}
          >
            {metric.label}
          </p>
          <div className="flex items-center gap-2">
            <p
              className={cn(
                "font-display text-4xl font-bold leading-none tabular-nums",
                metric.valueClass
              )}
            >
              {metric.value}
            </p>
            <TrendingUp className="size-4 shrink-0 text-[#3dc48a]" aria-hidden />
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
      ))}
    </div>
  );
}
