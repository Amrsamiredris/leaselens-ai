"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard, Settings } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Lease portfolio", href: "/leases", icon: FileText },
  { title: "Settings", href: "/settings", icon: Settings },
] as const;

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-token bg-navy-sidebar [&_[data-sidebar=sidebar]]:bg-navy-sidebar"
      style={{ width: "var(--sidebar-width)" }}
    >
      <SidebarHeader className="border-b border-token px-4 py-5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="h-auto bg-transparent p-0 hover:bg-transparent"
              render={
                <Link href="/" className="flex items-center gap-2" aria-label="LeaseLens home" />
              }
            >
              <Logo size="md" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-0 py-2">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-1 mt-6 px-[1.2rem] text-[0.65rem] font-medium uppercase tracking-[0.1em] text-slate-token">
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      className={cn(
                        "h-auto gap-[0.6rem] rounded-none px-[1.2rem] py-[0.65rem] text-[0.8rem] text-slate-token transition-[color,background,border-color] duration-150 ease-in-out hover:bg-[var(--gold-subtle)] hover:text-white-token",
                        isActive && "ll-nav-active"
                      )}
                      render={
                        <Link
                          href={item.href}
                          aria-current={isActive ? "page" : undefined}
                        />
                      }
                    >
                      <item.icon className="size-4 shrink-0" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-token p-4">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.1em] text-slate-token">
          {BRAND.track}
        </p>
        <p className="mt-1 text-[0.72rem] leading-relaxed text-slate-token">
          {BRAND.tagline}
        </p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
