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
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b border-border/60 bg-background/80 px-4 backdrop-blur-md md:px-6">
      <SidebarTrigger aria-label="Toggle navigation" />
      <Separator orientation="vertical" className="h-4" />
      <div className="flex flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-base font-semibold tracking-tight text-foreground">
              {title}
            </h1>
            {showTrackBadge && <TrackBadge track="communities" />}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </header>
  );
}
