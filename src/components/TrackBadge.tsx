import type { Track } from "@/lib/types";

const TRACKS: Record<Track, { label: string; classes: string }> = {
  land: {
    label: "Land Intelligence",
    classes: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  },
  investment: {
    label: "Investment Intelligence",
    classes: "bg-violet-50 text-violet-800 ring-violet-200",
  },
  communities: {
    label: "Future Communities",
    classes: "bg-primary/10 text-primary ring-primary/25",
  },
  decision: {
    label: "Decision Intelligence",
    classes: "bg-sky-50 text-sky-800 ring-sky-200",
  },
};

export function TrackBadge({ track }: { track: Track }) {
  const { label, classes } = TRACKS[track];
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset ${classes}`}
    >
      {label}
    </span>
  );
}
