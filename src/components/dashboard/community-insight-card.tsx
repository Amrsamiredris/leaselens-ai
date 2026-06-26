import { MapPin, Sparkles, Users } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PORTFOLIO } from "@/lib/mock-data";
import type { CommunityInsight } from "@/lib/types";

type CommunityInsightCardProps = {
  insight: CommunityInsight | null;
  titleTooltip?: string;
};

export function CommunityInsightCard({
  insight,
  titleTooltip,
}: CommunityInsightCardProps) {
  if (insight === null) {
    return null;
  }

  const districtProfile = PORTFOLIO.districtProfiles[insight.district];

  return (
    <div className="extracted-card mb-4 p-[1.4rem_1.6rem]">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--bg-inset)] text-[var(--text-secondary)]">
          <Users className="size-4" strokeWidth={1.5} />
        </div>
        <div>
          <h2
            className="text-[0.95rem] font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {titleTooltip ? (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <span className="cursor-default underline decoration-dotted decoration-[var(--text-muted)] underline-offset-4">
                      Community context
                    </span>
                  }
                />
                <TooltipContent className="max-w-xs">{titleTooltip}</TooltipContent>
              </Tooltip>
            ) : (
              "Community context"
            )}
          </h2>
          <p className="text-[0.72rem]" style={{ color: "var(--text-muted)" }}>
            Track 3 · joined on district from starter-kit data
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 text-[0.85rem]">
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0 text-[var(--text-secondary)]" strokeWidth={1.5} />
          <div>
            <p className="font-medium" style={{ color: "var(--text-primary)" }}>
              {insight.district}
            </p>
            <p style={{ color: "var(--text-secondary)" }}>
              Resident experience {insight.residentExperienceScore}/100
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div
            className="rounded-[var(--radius-md)] border px-3 py-2"
            style={{
              background: "var(--bg-inset)",
              borderColor: "var(--border-default)",
            }}
          >
            <p
              className="text-[0.68rem] font-medium uppercase tracking-[0.08em]"
              style={{ color: "var(--text-muted)" }}
            >
              Service demand
            </p>
            <p
              className="mt-0.5 font-medium tabular-nums"
              style={{ color: "var(--text-primary)" }}
            >
              {insight.serviceDemandIndex}
            </p>
          </div>
          <div
            className="rounded-[var(--radius-md)] border px-3 py-2"
            style={{
              background: "var(--bg-inset)",
              borderColor: "var(--border-default)",
            }}
          >
            <p
              className="text-[0.68rem] font-medium uppercase tracking-[0.08em]"
              style={{ color: "var(--text-muted)" }}
            >
              Occupancy
            </p>
            <p
              className="mt-0.5 font-medium tabular-nums"
              style={{ color: "var(--text-primary)" }}
            >
              {Math.round(insight.occupancyRate * 100)}%
            </p>
          </div>
        </div>

        <p className="flex items-start gap-2 rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-inset)] p-3 text-[var(--text-secondary)]">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-[var(--text-secondary)]" strokeWidth={1.5} />
          <span>
            <strong className="font-medium" style={{ color: "var(--text-primary)" }}>
              Opportunity:
            </strong>{" "}
            {insight.optimizationOpportunity}. {insight.summary}
          </span>
        </p>

        {districtProfile ? (
          <div
            className="flex items-center justify-between gap-3 border-t pt-3 text-[0.82rem]"
            style={{ borderColor: "var(--border-default)" }}
          >
            <span style={{ color: "var(--text-secondary)" }}>District profile</span>
            <span className="text-right font-medium" style={{ color: "var(--text-primary)" }}>
              {districtProfile.profile} · Infrastructure{" "}
              {districtProfile.infrastructureScore}/100 · Yield{" "}
              {districtProfile.grossYield}%
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
