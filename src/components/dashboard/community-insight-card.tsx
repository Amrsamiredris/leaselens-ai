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
    <div className="extracted-card mb-4 p-[1.4rem_1.6rem]">
      <div className="mb-4 flex items-center gap-2">
        <div
          className="flex size-8 items-center justify-center rounded-[var(--radius-md)]"
          style={{ background: "var(--gold-dim)", color: "var(--gold-text)" }}
        >
          <Users className="size-4" />
        </div>
        <div>
          <h2
            className="text-[0.95rem] font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Community context
          </h2>
          <p className="text-[0.72rem]" style={{ color: "var(--text-muted)" }}>
            Track 3 · joined on district from starter-kit data
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 text-[0.85rem]">
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0" style={{ color: "var(--gold-text)" }} />
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

        <p
          className="flex items-start gap-2 rounded-[var(--radius-md)] border p-3"
          style={{
            background: "var(--gold-dim)",
            borderColor: "var(--gold-border)",
            color: "var(--text-secondary)",
          }}
        >
          <Sparkles className="mt-0.5 size-4 shrink-0" style={{ color: "var(--gold-text)" }} />
          <span>
            <strong className="font-medium" style={{ color: "var(--text-primary)" }}>
              Opportunity:
            </strong>{" "}
            {insight.optimizationOpportunity}. {insight.summary}
          </span>
        </p>
      </div>
    </div>
  );
}
