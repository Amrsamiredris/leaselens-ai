import { TrackBadge } from "@/components/TrackBadge";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

type PageHeaderProps = {
  title: string;
  description?: string;
  showTrackBadge?: boolean;
};

export function PageHeader({
  title,
  description,
  showTrackBadge = false,
}: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b border-token bg-navy px-8">
      <SidebarTrigger
        aria-label="Toggle navigation"
        className="text-slate-token hover:bg-[var(--surface)] hover:text-white-token"
      />
      <Separator orientation="vertical" className="h-4 bg-[var(--border)]" />
      <div className="flex flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="ll-card-heading text-white-token">{title}</h1>
            {showTrackBadge && <TrackBadge track="communities" />}
          </div>
          {description && (
            <p className="text-[0.72rem] text-slate-token">{description}</p>
          )}
        </div>
      </div>
    </header>
  );
}
