import { MapPin, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PORTFOLIO } from "@/lib/mock-data";
import type { UploadState } from "@/lib/types";

type CommunityInsightCardProps = {
  uploadState: UploadState;
};

export function CommunityInsightCard({ uploadState }: CommunityInsightCardProps) {
  if (uploadState !== "done") {
    return null;
  }

  const insight = PORTFOLIO.communityInsight;

  return (
    <Card className="rounded-xl border-slate-200 bg-gradient-to-br from-teal-50/60 to-white shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-primary" />
          <CardTitle className="text-base text-slate-900">
            Community Context
          </CardTitle>
        </div>
        <CardDescription>
          Track 3 insight from{" "}
          <code className="text-xs">sample_communities.csv</code> joined on
          district
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm">
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="font-medium text-slate-900">{insight.district}</p>
            <p className="text-muted-foreground">
              Resident experience: {insight.residentExperienceScore}/100
            </p>
          </div>
        </div>
        <p className="text-slate-600">
          Service demand index: {insight.serviceDemandIndex} · Occupancy:{" "}
          {Math.round(insight.occupancyRate * 100)}%
        </p>
        <p className="text-slate-600">
          Opportunity: {insight.optimizationOpportunity}
        </p>
        <p className="rounded-lg border border-slate-200 bg-white/80 p-3 text-slate-700">
          {insight.summary}
        </p>
      </CardContent>
    </Card>
  );
}
