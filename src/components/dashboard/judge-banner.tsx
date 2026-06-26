"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ClipboardList, Presentation, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

const AUTO_HIDE_MS = 10_000;

const steps = [
  "Review the KPI cards above",
  'Click "Test demo" below to load a sample lease',
  "Generate a 90-day renewal notice and copy it",
] as const;

const chipClassName = cn(
  "inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--border-default)]",
  "bg-[var(--bg-card)] px-3 py-1.5 text-[0.78rem] font-medium text-[var(--text-secondary)]",
  "shadow-float transition-colors hover:text-[var(--text-primary)]"
);

function PitchSiteChip({ className }: { className?: string }) {
  return (
    <a
      href={BRAND.pitchUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(chipClassName, "hover:border-[var(--border-strong)]", className)}
      aria-label="Open pitch site in new tab"
    >
      <Presentation className="size-3.5 text-[var(--text-primary)]" strokeWidth={1.75} />
      Pitch site
    </a>
  );
}

export function JudgeBanner() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(true);

  const dismiss = useCallback(() => setOpen(false), []);
  const reopen = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(dismiss, AUTO_HIDE_MS);
    return () => window.clearTimeout(timer);
  }, [open, dismiss]);

  return (
    <div className="relative mb-6 min-h-10">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="banner"
            role="note"
            aria-label="Judge guide"
            initial={reduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-float"
          >
            <div className="flex items-start gap-3 border-b border-[var(--border-subtle)] px-4 py-3 sm:px-5">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--amber-dim)] text-[var(--amber-text)]">
                <ClipboardList className="size-4" strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  Judges — quick start
                </p>
                <p className="mt-0.5 text-[0.78rem] text-[var(--text-muted)]">
                  ~2 min · no login needed
                </p>
              </div>
              <button
                type="button"
                onClick={dismiss}
                className="flex size-8 shrink-0 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-inset)] hover:text-[var(--text-primary)]"
                aria-label="Dismiss judge guide"
              >
                <X className="size-4" />
              </button>
            </div>

            <ol className="space-y-2 px-4 py-3.5 sm:px-5">
              {steps.map((step, index) => (
                <li key={step} className="flex items-start gap-3 text-[0.82rem]">
                  <span className="mt-px flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--bg-inset)] text-[0.65rem] font-semibold tabular-nums text-[var(--text-secondary)]">
                    {index + 1}
                  </span>
                  <span className="leading-snug text-[var(--text-secondary)]">{step}</span>
                </li>
              ))}
            </ol>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] bg-[var(--bg-inset)] px-4 py-2.5 sm:px-5">
              <p className="text-[0.75rem] text-[var(--text-muted)]">
                Use the site — start with the{" "}
                <span className="font-medium text-[var(--text-primary)]">Test demo</span> button.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <PitchSiteChip />
                <Link
                  href="/judge"
                  className="shrink-0 text-[0.75rem] font-medium text-[var(--text-primary)] underline-offset-4 hover:underline"
                >
                  Full guide →
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="triggers"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-2"
          >
            <button
              type="button"
              onClick={reopen}
              className={cn(chipClassName, "hover:border-[var(--amber-border)]")}
              aria-label="Show judge guide"
            >
              <ClipboardList className="size-3.5 text-[var(--amber-text)]" strokeWidth={1.75} />
              Judge guide
            </button>
            <PitchSiteChip />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
