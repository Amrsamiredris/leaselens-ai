import type { Track } from "@/lib/types";

const TRACKS: Record<Track, { label: string; classes: string }> = {
  land: {
    label: "Land Intelligence",
    classes:
      "bg-[var(--surface)] text-green-ok border border-[rgba(45,158,107,0.3)]",
  },
  investment: {
    label: "Investment Intelligence",
    classes:
      "bg-[var(--surface)] text-gold-light border border-gold-token",
  },
  communities: {
    label: "Future Communities",
    classes:
      "bg-[var(--gold-action-bg)] text-gold-light border border-gold-token",
  },
  decision: {
    label: "Decision Intelligence",
    classes:
      "bg-[var(--surface)] text-slate-token border border-token",
  },
};

export function TrackBadge({ track }: { track: Track }) {
  const { label, classes } = TRACKS[track];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.68rem] font-medium uppercase tracking-[0.08em] ${classes}`}
    >
      {label}
    </span>
  );
}
