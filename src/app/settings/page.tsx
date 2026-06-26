import { Database, Shield, Sparkles } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { TrackBadge } from "@/components/TrackBadge";
import { BRAND } from "@/lib/brand";
import { PORTFOLIO } from "@/lib/mock-data";

const settingsSections = [
  {
    icon: Database,
    title: "Data sources",
    items: [
      "sample_listings.csv — property and rent data",
      "sample_communities.csv — district insights",
      "Synthetic Ejari/tenant fields for demo compliance layer",
    ],
  },
  {
    icon: Sparkles,
    title: "AI extraction",
    items: [
      "POST /api/extract-lease — accepts PDF tenancy contracts",
      "Demo mode: returns LST-00002 sample extraction",
      "Set ANTHROPIC_API_KEY in .env.local for production wiring",
    ],
  },
  {
    icon: Shield,
    title: "Compliance framing",
    items: [
      "90-day renewal notices aligned with UAE rental regulations",
      "RERA and Abu Dhabi DMT references in notice templates",
      "All metrics labeled as synthetic demo data",
    ],
  },
] as const;

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Platform configuration and data policy" />

      <div className="mx-auto max-w-3xl space-y-6">
        <div className="extracted-card p-6">
          <div className="flex flex-wrap items-center gap-3">
            <h2
              className="text-xl font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {BRAND.product}
            </h2>
            <TrackBadge track="communities" />
          </div>
          <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            {BRAND.challenge}
          </p>
          <p className="mt-4 text-lg" style={{ color: "var(--text-primary)" }}>
            {BRAND.tagline}
          </p>
        </div>

        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="extracted-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--bg-inset)] text-[var(--text-secondary)]">
                  <Icon className="size-4" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  {section.title}
                </h3>
              </div>
              <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-[var(--text-muted)]">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <p className="text-center text-[0.72rem]" style={{ color: "var(--text-muted)" }}>
          {PORTFOLIO.dataNotice}
        </p>
      </div>
    </>
  );
}
