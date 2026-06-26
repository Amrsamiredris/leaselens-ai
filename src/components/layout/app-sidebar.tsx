"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutGrid, Settings } from "lucide-react";

import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", href: "/", icon: LayoutGrid },
  { title: "Lease Portfolio", href: "/leases", icon: FileText },
  { title: "Settings", href: "/settings", icon: Settings },
] as const;

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="border-b border-[var(--border-default)] px-[1.2rem] py-6">
        <Link href="/" className="block" aria-label="LeaseLens home">
          <span className="text-[1rem] font-semibold tracking-[0.01em]">
            <span style={{ color: "var(--text-primary)" }}>Lease</span>
            <span style={{ color: "var(--gold-text)" }}>Lens</span>
          </span>
        </Link>
        <span
          className="mt-2 inline-block rounded-[var(--radius-pill)] border px-[0.6rem] py-[0.2rem] text-[0.65rem] font-medium"
          style={{
            background: "var(--gold-dim)",
            borderColor: "var(--gold-border)",
            color: "var(--gold-text)",
          }}
        >
          Future Communities
        </span>
      </div>

      <nav className="flex flex-1 flex-col">
        <p
          className="px-[1.2rem] pb-[0.4rem] pt-[1.2rem] text-[0.62rem] font-medium uppercase tracking-[0.12em]"
          style={{ color: "var(--text-muted)" }}
        >
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
              className={cn(
                "nav-item",
                isActive
                  ? "active border-l-2 border-[#f0c55a] border-r-transparent bg-[#f0c55a]/10 font-medium text-[#f0c55a]"
                  : "text-[#8fa5c0] hover:bg-white/5 hover:text-[#edf2fa]"
              )}
            >
              <Icon className="nav-icon" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mx-4 mb-4">
        <span className="inline-block rounded bg-[#f0a830]/15 px-2 py-1 text-[10px] uppercase tracking-widest text-[#f0a830]">
          TRACK 3 · FUTURE COMMUNITIES
        </span>
      </div>

      <div className="mt-auto border-t border-[var(--border-default)] px-[1.2rem] py-4">
        <p
          className="pb-[0.4rem] text-[0.62rem] font-medium uppercase tracking-[0.12em]"
          style={{ color: "var(--text-muted)" }}
        >
          {BRAND.track}
        </p>
        <p className="text-[0.78rem]" style={{ color: "var(--text-muted)" }}>
          {BRAND.tagline}
        </p>
      </div>
    </aside>
  );
}
