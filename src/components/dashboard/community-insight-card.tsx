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
    <div className="ll-card overflow-hidden p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-[var(--gold-action-bg)] text-gold-token">
          <Users className="size-4" />
        </div>
        <div>
          <h2 className="ll-card-heading">Community context</h2>
          <p className="text-[0.72rem] text-slate-token">
            Track 3 · joined on district from starter-kit data
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 text-[0.85rem]">
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0 text-gold-token" />
          <div>
            <p className="font-medium text-white-token">{insight.district}</p>
            <p className="text-slate-token">
              Resident experience {insight.residentExperienceScore}/100
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-token bg-[var(--surface)] px-3 py-2">
            <p className="ll-label">Service demand</p>
            <p className="mt-0.5 font-medium tabular-nums text-white-token">
              {insight.serviceDemandIndex}
            </p>
          </div>
          <div className="rounded-lg border border-token bg-[var(--surface)] px-3 py-2">
            <p className="ll-label">Occupancy</p>
            <p className="mt-0.5 font-medium tabular-nums text-white-token">
              {Math.round(insight.occupancyRate * 100)}%
            </p>
          </div>
        </div>

        <p className="flex items-start gap-2 rounded-lg border border-gold-token bg-[var(--gold-subtle-bg)] p-3 text-slate-token">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-gold-token" />
          <span>
            <strong className="font-medium text-white-token">Opportunity:</strong>{" "}
            {insight.optimizationOpportunity}. {insight.summary}
          </span>
        </p>
      </div>
    </div>
  );
}
