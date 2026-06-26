"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, FileText, LayoutGrid, Settings } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", href: "/", icon: LayoutGrid },
  { title: "Lease Portfolio", href: "/leases", icon: FileText },
  { title: "Judge Guide", href: "/judge", icon: ClipboardList },
  { title: "Settings", href: "/settings", icon: Settings },
] as const;

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar glass-panel border-r border-[var(--border-subtle)]">
      <div className="border-b border-[var(--border-subtle)] px-4 py-6">
        <Link href="/" className="block" aria-label="LeaseLens home">
          <span className="text-base font-semibold tracking-tight text-[var(--text-primary)]">
            LeaseLens
          </span>
        </Link>
        <span className="mt-2 inline-block rounded-full border border-[var(--border-default)] bg-[var(--bg-card-muted)] px-2.5 py-0.5 text-[0.65rem] font-medium text-[var(--text-secondary)]">
          Future Communities
        </span>
      </div>

      <nav className="flex flex-1 flex-col py-2">
        <p className="px-4 pb-1 pt-3 text-[0.62rem] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
          Platform
        </p>
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn("nav-item", isActive && "active")}
            >
              <Icon className="nav-icon" strokeWidth={1.5} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mx-4 mb-3">
        <span className="inline-block rounded-full bg-[var(--amber-dim)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-[var(--amber-text)]">
          Track 3
        </span>
      </div>

      <div className="mt-auto border-t border-[var(--border-subtle)] px-4 py-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[0.62rem] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
            {BRAND.track}
          </p>
          <ThemeToggle />
        </div>
        <p className="text-[0.78rem] text-[var(--text-muted)]">{BRAND.tagline}</p>
      </div>
    </aside>
  );
}
