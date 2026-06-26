import Link from "next/link";
import { ArrowRight, ClipboardList } from "lucide-react";

export function JudgeBanner() {
  return (
    <div
      className="mb-6 flex flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--amber-border)] bg-[var(--amber-dim)] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5"
      role="note"
      aria-label="Judge guide"
    >
      <div className="flex items-start gap-3 sm:items-center">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--bg-card)] text-[var(--amber-text)]">
          <ClipboardList className="size-4" strokeWidth={1.75} />
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            Judges — start here
          </p>
          <p className="mt-0.5 text-[0.8rem] leading-snug text-[var(--text-secondary)]">
            5-minute walkthrough: KPIs → upload or Load demo data → renewal notice.
          </p>
        </div>
      </div>
      <Link
        href="/judge"
        className="action-btn inline-flex shrink-0 items-center justify-center gap-1.5 self-start sm:self-auto"
      >
        Open judge guide
        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}
