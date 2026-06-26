import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";

import { AppShell } from "@/components/layout/app-shell";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
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
    <html lang="en" className={cn(inter.variable, dmSerifDisplay.variable)}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("font-sans antialiased", inter.className)}>
        <TooltipProvider>
          <AppShell>{children}</AppShell>
          <Toaster position="top-right" closeButton />
        </TooltipProvider>
      </body>
    </html>
  );
}
