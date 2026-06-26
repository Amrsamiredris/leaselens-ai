import { AlertTriangle, Banknote, FileText, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { DASHBOARD_METRICS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ejariUrgent = DASHBOARD_METRICS.upcomingEjariRenewals > 10;

const metrics = [
  {
    label: "Active leases",
    value: DASHBOARD_METRICS.activeLeases.toLocaleString("en-AE"),
    icon: FileText,
    highlight: false,
    sub: "Across Abu Dhabi portfolio",
  },
  {
    label: "Ejari renewals (90 days)",
    value: DASHBOARD_METRICS.upcomingEjariRenewals.toLocaleString("en-AE"),
    icon: AlertTriangle,
    highlight: ejariUrgent,
    sub: ejariUrgent ? "Action required" : "Within compliance window",
    badge: ejariUrgent,
  },
  {
    label: "Pending cheques",
    value: `AED ${DASHBOARD_METRICS.pendingChequesAed.toLocaleString("en-AE")}`,
    icon: Banknote,
    highlight: false,
    sub: "Due this month",
  },
] as const;

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.label}
            className={cn(
              "brand-card relative overflow-hidden p-5 transition-shadow hover:shadow-md",
              metric.highlight && "border-[hsl(var(--gold))]/40 bg-gradient-to-br from-[hsl(38,65%,52%,0.08)] to-card"
            )}
          >
            {metric.highlight && (
              <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-[hsl(var(--gold))]/10" />
            )}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="brand-label">{metric.label}</p>
                <p
                  className={cn(
                    "mt-2 font-display text-3xl font-semibold tabular-nums tracking-tight",
                    metric.highlight ? "text-[hsl(var(--gold))]" : "text-foreground"
                  )}
                >
                  {metric.value}
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  {!metric.highlight && <TrendingUp className="size-3" />}
                  {metric.sub}
                </p>
              </div>
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-lg",
                  metric.highlight
                    ? "bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))]"
                    : "bg-primary/10 text-primary"
                )}
              >
                <Icon className="size-4" />
              </div>
            </div>
            {"badge" in metric && metric.badge && (
              <Badge
                variant="outline"
                className="mt-3 border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/10 text-[hsl(38,55%,35%)]"
              >
                <AlertTriangle className="size-3" />
                Priority queue
              </Badge>
            )}
          </div>
        );
      })}
    </div>
  );
}
