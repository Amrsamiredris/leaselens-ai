type PageHeaderProps = {
  title: string;
  description?: string;
  showTrackBadge?: boolean;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
        {title}
      </h1>
      {description && (
        <p className="mt-1 text-sm text-[var(--text-secondary)]">{description}</p>
      )}
    </header>
  );
}
