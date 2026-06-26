"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { DashboardClient } from "@/components/dashboard/dashboard-client";

function DemoBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("banner_dismissed") === "1") {
      setVisible(false);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("banner_dismissed", "1");
  };

  if (!visible) return null;

  return (
    <div className="mb-4 flex items-center justify-between rounded-lg border border-[#f0a830]/30 bg-[#f0a830]/10 px-4 py-3 text-sm text-[#f0a830]">
      <p>
        Demo mode · Click &apos;Load demo data&apos; to explore all features, or
        upload a real tenancy PDF with your Anthropic API key
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="ml-4 shrink-0 border-none bg-transparent p-1 text-[#f0a830] hover:opacity-80"
        aria-label="Dismiss demo banner"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <DemoBanner />
      <DashboardClient />
    </>
  );
}
