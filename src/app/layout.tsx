import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import { AppShell } from "@/components/layout/app-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

import "./globals.css";

export const metadata: Metadata = {
  title: BRAND.product,
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
    <html lang="en" className={cn(GeistSans.variable)} suppressHydrationWarning>
      <body className={cn("font-sans antialiased", GeistSans.className)}>
        <ThemeProvider>
          <TooltipProvider>
            <AppShell>{children}</AppShell>
            <Toaster position="top-right" closeButton />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
