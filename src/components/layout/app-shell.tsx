import { AppSidebar } from "@/components/layout/app-sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppSidebar />
      <main className="main-content">{children}</main>
    </>
  );
}
