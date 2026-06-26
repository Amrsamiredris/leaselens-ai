import { DASHBOARD_METRICS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ejariUrgent = DASHBOARD_METRICS.upcomingEjariRenewals > 10;

const metrics = [
  {
    label: "Active leases",
    value: DASHBOARD_METRICS.activeLeases.toLocaleString("en-AE"),
    valueClass: "text-white-token",
    sub: "Across Abu Dhabi portfolio",
    subClass: "text-slate-token",
  },
  {
    label: "Ejari renewals (90 days)",
    value: DASHBOARD_METRICS.upcomingEjariRenewals.toLocaleString("en-AE"),
    valueClass: "text-amber-warn",
    sub: ejariUrgent ? "Action required" : "Within compliance window",
    subClass: ejariUrgent ? "text-amber-warn" : "text-slate-token",
  },
  {
    label: "Pending cheques",
    value: `AED ${DASHBOARD_METRICS.pendingChequesAed.toLocaleString("en-AE")}`,
    valueClass: "text-red-alert",
    sub: "Due this month",
    subClass: "text-slate-token",
  },
] as const;

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.label} className="ll-metric-card">
          <p className="ll-label mb-[0.3rem]">{metric.label}</p>
          <p className={cn("ll-metric-value tabular-nums", metric.valueClass)}>
            {metric.value}
          </p>
          <p className={cn("mt-2 text-[0.72rem]", metric.subClass)}>
            {metric.sub}
          </p>
        </div>
      ))}
    </div>
  );
}
