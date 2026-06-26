import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  FileText,
  GitBranch,
  LayoutGrid,
  MessageSquare,
  Sparkles,
  Upload,
  Wrench,
} from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { StaggerGrid, StaggerItem } from "@/components/motion/stagger-grid";
import { PageHeader } from "@/components/layout/page-header";
import { TrackBadge } from "@/components/TrackBadge";
import { BRAND } from "@/lib/brand";
import { PORTFOLIO } from "@/lib/mock-data";

const REPO_URL = "https://github.com/Amrsamiredris/leaselens-ai";

const demoSteps = [
  {
    step: 1,
    title: "Review portfolio KPIs",
    time: "30 sec",
    icon: LayoutGrid,
    body: "Open the Dashboard. Three metric cards show active leases, Ejari renewals in the next 90 days, and pending cheques — computed from 3,500+ starter-kit rent listings at build time.",
    href: "/",
    linkLabel: "Go to Dashboard",
  },
  {
    step: 2,
    title: "Extract a tenancy contract",
    time: "1 min",
    icon: Upload,
    body: "Click Test demo for the fastest path — no upload or API key needed. Or drag any PDF onto Upload tenancy contract for live Claude extraction.",
    href: "/",
    linkLabel: "Try upload on Dashboard",
  },
  {
    step: 3,
    title: "Inspect extracted lease data",
    time: "45 sec",
    icon: FileText,
    body: "Review the extracted panel: tenant, annual rent, expiry urgency, and special clauses. Adjust the Legal Rent Increase Calculator — RERA Decree 43 bands update live.",
    href: "/",
    linkLabel: "View on Dashboard",
  },
  {
    step: 4,
    title: "See community intelligence",
    time: "30 sec",
    icon: Building2,
    body: "Scroll to Community Context — district metrics from sample_communities.csv: resident experience, service demand, and optimization opportunity. This is our Future Communities track join.",
    href: "/",
    linkLabel: "Community card on Dashboard",
  },
  {
    step: 5,
    title: "Test PDC cheque schedule",
    time: "30 sec",
    icon: ClipboardList,
    body: "Cheques auto-generate from payment terms. Click a row to cycle Pending → Cleared → Bounced and trigger the UAE Cheques Law warning.",
    href: "/",
    linkLabel: "Cheque table on Dashboard",
  },
  {
    step: 6,
    title: "Generate renewal notice",
    time: "1 min",
    icon: MessageSquare,
    body: "Click Generate 90-day renewal notice. Switch WhatsApp and Email tabs (English + Arabic). Copy to clipboard or download .txt — rent, RERA cap, and Ejari expiry are injected automatically.",
    href: "/",
    linkLabel: "Open renewal flow",
  },
  {
    step: 7,
    title: "Browse lease portfolio",
    time: "30 sec",
    icon: Sparkles,
    body: "Lease Portfolio lists 30 sample tenancies from starter-kit data with renewal-due badges for leases expiring within 90 days.",
    href: "/leases",
    linkLabel: "Open Lease Portfolio",
  },
] as const;

const evaluationCriteria = [
  "Working end-to-end prototype — upload, extract, calculate, notify",
  "AI extraction via Claude on real PDFs (/api/extract-lease)",
  "Compliance operations — Ejari urgency, RERA caps, 90-day notices",
  "Future Communities — district community metrics joined to leases",
  "Demo resilience — Test demo button and API fallback always work",
  "Transparent synthetic data labeling on every page",
] as const;

const fallbacks = [
  "Click Test demo instead of uploading — full UI path, no API key needed",
  "Refresh the page — KPIs are static and always load from build-time JSON",
  "Upload failure auto-falls back to demo extraction (toast confirms fallback)",
  "No login, database, or local setup required for the live demo",
] as const;

export default function JudgePage() {
  return (
    <>
      <PageHeader
        title="Judge guide"
        description="Self-guided walkthrough for evaluating LeaseLens AI in ~5 minutes"
      />

      <div className="mx-auto max-w-3xl space-y-6">
        <FadeIn>
          <div className="extracted-card relative overflow-hidden p-6 sm:p-8">
            <div
              className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full opacity-40 blur-3xl"
              style={{ background: "var(--amber-dim)" }}
              aria-hidden
            />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-[var(--amber-border)] bg-[var(--amber-dim)] px-3 py-1 text-[0.68rem] font-medium uppercase tracking-widest text-[var(--amber-text)]">
                  <ClipboardList className="size-3.5" strokeWidth={2} />
                  For judging team
                </span>
                <TrackBadge track="communities" />
              </div>
              <h2
                className="mt-4 text-xl font-semibold sm:text-2xl"
                style={{ color: "var(--text-primary)" }}
              >
                Welcome — here&apos;s how to test our demo
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {BRAND.product} automates UAE lease compliance for property managers — AI
                contract extraction, RERA rent caps, PDC cheque tracking, and bilingual renewal
                notices joined to Abu Dhabi community data.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/" className="action-btn inline-flex items-center gap-2">
                  Start demo
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ghost-btn inline-flex items-center gap-2"
                >
                  <GitBranch className="size-4" />
                  View repo
                  <ExternalLink className="size-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Time needed", value: "~5 min" },
              { label: "Login required", value: "None" },
              { label: "Fastest path", value: "Test demo" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-3 text-center"
              >
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  {stat.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <div>
          <FadeIn delay={0.08}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
              Step-by-step evaluation
            </h3>
          </FadeIn>

          <StaggerGrid className="space-y-3">
            {demoSteps.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.step}>
                  <div className="extracted-card group p-5 transition-colors hover:bg-[var(--bg-card-hover)]">
                    <div className="flex gap-4">
                      <div className="flex shrink-0 flex-col items-center gap-2">
                        <span className="flex size-8 items-center justify-center rounded-full bg-[var(--bg-inset)] text-xs font-semibold text-[var(--text-primary)]">
                          {item.step}
                        </span>
                        <div className="flex size-9 items-center justify-center rounded-[var(--radius-md)] bg-[var(--bg-inset)] text-[var(--text-secondary)]">
                          <Icon className="size-4" strokeWidth={1.5} />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-semibold text-[var(--text-primary)]">
                            {item.title}
                          </h4>
                          <span className="rounded-[var(--radius-pill)] bg-[var(--bg-inset)] px-2 py-0.5 text-[0.65rem] font-medium text-[var(--text-muted)]">
                            {item.time}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {item.body}
                        </p>
                        <Link
                          href={item.href}
                          className="mt-3 inline-flex items-center gap-1 text-[0.8rem] font-medium text-[var(--text-primary)] underline-offset-4 hover:underline"
                        >
                          {item.linkLabel}
                          <ArrowRight className="size-3.5 opacity-70" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>

        <FadeIn delay={0.1}>
          <div className="extracted-card p-6">
            <h3 className="font-semibold text-[var(--text-primary)]">What to evaluate</h3>
            <ul className="mt-4 space-y-2.5">
              {evaluationCriteria.map((criterion) => (
                <li key={criterion} className="flex gap-2.5 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-[var(--green-text)]"
                    strokeWidth={2}
                  />
                  {criterion}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="extracted-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--bg-inset)] text-[var(--text-secondary)]">
                <Wrench className="size-4" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)]">
                If something breaks
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              {fallbacks.map((tip) => (
                <li key={tip} className="flex gap-2">
                  <span className="text-[var(--text-muted)]">·</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div className="extracted-card p-6">
            <h3 className="font-semibold text-[var(--text-primary)]">
              Running from the repo
            </h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Judges reviewing source code can clone and run locally. Full details in{" "}
              <code className="rounded bg-[var(--bg-inset)] px-1.5 py-0.5 text-[0.8rem] text-[var(--text-primary)]">
                docs/JUDGE-GUIDE.md
              </code>
              .
            </p>
            <pre
              className="mt-4 overflow-x-auto rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--bg-inset)] p-4 text-[0.78rem] leading-relaxed text-[var(--text-primary)]"
            >
{`git clone ${REPO_URL}.git
cd leaselens-ai
npm install && npm run dev
# → http://localhost:3000/judge`}
            </pre>
            <p className="mt-3 text-[0.8rem] text-[var(--text-muted)]">
              Optional: add <code className="text-[var(--text-secondary)]">ANTHROPIC_API_KEY</code>{" "}
              to <code className="text-[var(--text-secondary)]">.env.local</code> for live Claude
              extraction. Without it, demo fallback data still completes the flow.
            </p>
          </div>
        </FadeIn>

        <p className="pb-4 text-center text-[0.72rem] text-[var(--text-muted)]">
          {PORTFOLIO.dataNotice}
        </p>
      </div>
    </>
  );
}
