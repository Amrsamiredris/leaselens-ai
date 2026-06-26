type PageHeaderProps = {
  title: string;
  description?: string;
  showTrackBadge?: boolean;
};

export function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  return (
    <header className="mb-8">
      <h1
        className="text-[1.4rem] font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h1>
      {description && (
        <p
          className="mt-1 text-[0.88rem]"
          style={{ color: "var(--text-secondary)" }}
        >
          {description}
        </p>
      )}
    </header>
  );
}
