import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { icon: 28, text: "text-[0.95rem]" },
  md: { icon: 32, text: "text-[1.1rem]" },
  lg: { icon: 40, text: "text-[1.25rem]" },
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
      <rect width="44" height="44" rx="12" fill="var(--text-primary)" />
      <circle
        cx="22"
        cy="22"
        r="11"
        stroke="var(--text-on-primary)"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="22" cy="22" r="5" fill="var(--text-on-primary)" fillOpacity="0.25" />
      <path
        d="M16 28V20L22 16L28 20V28H24V22H20V28H16Z"
        fill="var(--text-on-primary)"
      />
    </svg>
  );
}

export function Logo({ className, showWordmark = true, size = "md" }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark size={size} />
      {showWordmark && (
        <span
          className={cn(
            "font-semibold tracking-tight text-[var(--text-primary)]",
            sizes[size].text
          )}
        >
          LeaseLens
        </span>
      )}
    </div>
  );
}
