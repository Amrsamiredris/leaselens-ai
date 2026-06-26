import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import "./globals.css";

export const metadata: Metadata = {
  title: "LeaseLens AI | Abu Dhabi AI PropTech Challenge",
  description:
    "Future Communities track — smart lease compliance dashboard for Abu Dhabi property managers. Built for the Abu Dhabi AI PropTech Challenge at Hub71.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", GeistSans.variable, GeistMono.variable)}
    >
      <body className={cn("min-h-dvh antialiased", GeistSans.className)}>
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
