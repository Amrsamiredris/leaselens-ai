import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND.product} | ${BRAND.challenge}`,
  description:
    "AI-powered lease compliance for Abu Dhabi residential communities. Track Ejari renewals, extract tenancy contracts, and automate renewal notices.",
  icons: {
    icon: "/favicon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: BRAND.product,
    description: BRAND.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(dmSans.variable, fraunces.variable)}>
      <body className={cn("min-h-dvh font-sans antialiased", dmSans.className)}>
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-transparent">{children}</SidebarInset>
          </SidebarProvider>
          <Toaster position="top-right" richColors closeButton />
        </TooltipProvider>
      </body>
    </html>
  );
}
