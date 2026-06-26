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
      "POST /api/extract — accepts PDF tenancy contracts",
      "Demo mode: returns LST-00002 sample extraction",
      "Set OPENAI_API_KEY in .env.local for production wiring",
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
    <div className="flex min-h-dvh flex-col">
      <PageHeader title="Settings" description="Platform configuration and data policy" />

      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="brand-card p-6">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-display text-xl font-semibold">{BRAND.product}</h2>
              <TrackBadge track="communities" />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{BRAND.challenge}</p>
            <p className="mt-4 font-display text-lg text-foreground">{BRAND.tagline}</p>
          </div>

          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="brand-card p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground">
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-primary">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <p className="text-center text-xs text-muted-foreground">
            {PORTFOLIO.dataNotice}
          </p>
        </div>
      </main>
    </div>
  );
}
