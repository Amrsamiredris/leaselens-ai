import { MapPin, Sparkles, Users } from "lucide-react";

import type { CommunityInsight, UploadState } from "@/lib/types";

type CommunityInsightCardProps = {
  uploadState: UploadState;
  insight: CommunityInsight;
};

export function CommunityInsightCard({
  uploadState,
  insight,
}: CommunityInsightCardProps) {
  if (uploadState !== "done") {
    return null;
  }

  return (
    <div className="brand-card-highlight overflow-hidden p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <Users className="size-4" />
        </div>
        <div>
          <h2 className="font-display text-base font-semibold text-foreground">
            Community context
          </h2>
          <p className="text-xs text-muted-foreground">
            Track 3 · joined on district from starter-kit data
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
          <div>
            <p className="font-semibold text-foreground">{insight.district}</p>
            <p className="text-muted-foreground">
              Resident experience {insight.residentExperienceScore}/100
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-muted/50 px-3 py-2">
            <p className="brand-label">Service demand</p>
            <p className="mt-0.5 font-semibold tabular-nums">{insight.serviceDemandIndex}</p>
          </div>
          <div className="rounded-lg bg-muted/50 px-3 py-2">
            <p className="brand-label">Occupancy</p>
            <p className="mt-0.5 font-semibold tabular-nums">
              {Math.round(insight.occupancyRate * 100)}%
            </p>
          </div>
        </div>

        <p className="flex items-start gap-2 rounded-lg border border-primary/15 bg-primary/[0.04] p-3 text-foreground/80">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
          <span>
            <strong className="font-medium text-foreground">Opportunity:</strong>{" "}
            {insight.optimizationOpportunity}. {insight.summary}
          </span>
        </p>
      </div>
    </div>
  );
}
