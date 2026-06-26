import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { icon: 28, text: "text-sm" },
  md: { icon: 36, text: "text-base" },
  lg: { icon: 44, text: "text-lg" },
};

export function LogoMark({ className, size = "md" }: Omit<LogoProps, "showWordmark">) {
  const s = sizes[size].icon;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <rect width="44" height="44" rx="10" className="fill-primary" />
      <circle cx="22" cy="22" r="11" stroke="currentColor" strokeWidth="1.5" className="text-primary-foreground/90" />
      <circle cx="22" cy="22" r="6" className="fill-primary-foreground/25" />
      <path
        d="M16 28V20L22 16L28 20V28H24V22H20V28H16Z"
        className="fill-primary-foreground"
      />
      <circle cx="22" cy="22" r="2" className="fill-[hsl(38,65%,52%)]" />
    </svg>
  );
}

export function Logo({ className, showWordmark = true, size = "md" }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark size={size} />
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className={cn("font-display font-semibold tracking-tight text-sidebar-foreground", sizes[size].text)}>
            LeaseLens
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-sidebar-foreground/55">
            AI
          </span>
        </div>
      )}
    </div>
  );
}
