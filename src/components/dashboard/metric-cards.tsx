import { AlertTriangle, Banknote, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DASHBOARD_METRICS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ejariUrgent = DASHBOARD_METRICS.upcomingEjariRenewals > 10;

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="rounded-xl border-slate-200 bg-gradient-to-br from-blue-50/80 to-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardDescription className="text-slate-600">
            Active Leases
          </CardDescription>
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText className="size-4" />
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-3xl font-semibold tabular-nums text-slate-900">
            {DASHBOARD_METRICS.activeLeases}
          </CardTitle>
        </CardContent>
      </Card>

      <Card
        className={cn(
          "rounded-xl shadow-sm",
          ejariUrgent
            ? "border-amber-300 bg-gradient-to-br from-amber-50 to-white"
            : "border-slate-200 bg-white"
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardDescription className="text-slate-600">
            Upcoming Ejari Renewals (Next 90 Days)
          </CardDescription>
          <div
            className={cn(
              "flex size-9 items-center justify-center rounded-lg",
              ejariUrgent
                ? "bg-amber-100 text-amber-700"
                : "bg-slate-100 text-slate-600"
            )}
          >
            <AlertTriangle className="size-4" />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <CardTitle
            className={cn(
              "text-3xl font-semibold tabular-nums",
              ejariUrgent ? "text-amber-900" : "text-slate-900"
            )}
          >
            {DASHBOARD_METRICS.upcomingEjariRenewals}
          </CardTitle>
          {ejariUrgent && (
            <Badge
              variant="outline"
              className="w-fit border-amber-300 bg-amber-100 text-amber-800"
            >
              <AlertTriangle className="size-3" />
              Action required
            </Badge>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-xl border-slate-200 bg-white shadow-sm sm:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardDescription className="text-slate-600">
            Pending Cheques This Month
          </CardDescription>
          <div className="flex size-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <Banknote className="size-4" />
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl font-semibold tabular-nums text-slate-900 sm:text-3xl">
            AED {DASHBOARD_METRICS.pendingChequesAed.toLocaleString("en-AE")}
          </CardTitle>
        </CardContent>
      </Card>
    </div>
  );
}
