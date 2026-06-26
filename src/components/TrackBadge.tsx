import type { Track } from "@/lib/types";

const TRACKS: Record<Track, { label: string }> = {
  land: { label: "Land Intelligence" },
  investment: { label: "Investment Intelligence" },
  communities: { label: "Future Communities" },
  decision: { label: "Decision Intelligence" },
};

export function TrackBadge({ track }: { track: Track }) {
  const { label } = TRACKS[track];
  return (
    <span className="inline-flex items-center rounded-[var(--radius-pill)] border border-[var(--border-default)] bg-[var(--bg-inset)] px-2.5 py-0.5 text-[0.68rem] font-medium uppercase tracking-[0.08em] text-[var(--text-secondary)]">
      {label}
    </span>
  );
}
