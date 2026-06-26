"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";

import { DashboardBento } from "@/components/dashboard/dashboard-bento";
import { PageHeader } from "@/components/layout/page-header";
import { BRAND } from "@/lib/brand";
import { fileToBase64 } from "@/lib/lease-utils";
import {
  MOCK_LEASE_EXTRACTION,
  PORTFOLIO,
} from "@/lib/mock-data";
import { calculateReraIncrease } from "@/lib/rera";
import type {
  CommunityInsight,
  LeaseExtraction,
  ReraCalculation,
  UploadState,
} from "@/lib/types";

const DEFAULT_RERA = calculateReraIncrease(
  MOCK_LEASE_EXTRACTION.annualRentAED,
  180_000
);

export function DashboardClient() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [extraction, setExtraction] = useState<LeaseExtraction | null>(null);
  const [communityInsight, setCommunityInsight] = useState<CommunityInsight | null>(
    null
  );
  const [reraResult, setReraResult] = useState<ReraCalculation>(DEFAULT_RERA);

  const handleReraChange = useCallback((result: ReraCalculation) => {
    setReraResult(result);
  }, []);

  const handleUpload = useCallback(async (file: File) => {
    setFileName(file.name);
    setUploadState("loading");
    setExtraction(null);
    setCommunityInsight(null);

    try {
      const pdfBase64 = await fileToBase64(file);

      const response = await fetch("/api/extract-lease", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pdfBase64 }),
      });

      if (!response.ok) {
        throw new Error("Extraction API returned an error");
      }

      const data = (await response.json()) as { extraction: LeaseExtraction };

      setExtraction(data.extraction);
      setCommunityInsight(PORTFOLIO.communityInsight);
      setUploadState("done");
      toast.success("Contract processed", {
        description: "Lease terms extracted with Claude",
      });
    } catch (err) {
      console.warn(
        "API extraction failed, using mock data fallback:",
        err instanceof Error ? err.message : err
      );
      setExtraction(MOCK_LEASE_EXTRACTION);
      setCommunityInsight(PORTFOLIO.communityInsight);
      setUploadState("done");
      toast.success("Contract processed", {
        description: "Demo extraction loaded (API fallback)",
      });
    }
  }, []);

  const handleReset = useCallback(() => {
    setUploadState("idle");
    setFileName(null);
    setExtraction(null);
    setCommunityInsight(null);
    setReraResult(DEFAULT_RERA);
  }, []);

  const leaseData = extraction ?? MOCK_LEASE_EXTRACTION;

  return (
    <div className="flex min-h-dvh flex-col">
      <PageHeader
        title="Operations dashboard"
        description={BRAND.subtitle}
        showTrackBadge
      />

      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {BRAND.tagline}
            </p>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Monitor Ejari compliance, extract tenancy contracts with AI, and
              draft renewal notices for Abu Dhabi communities.
            </p>
          </div>

          <DashboardBento
            uploadState={uploadState}
            fileName={fileName}
            extraction={leaseData}
            communityInsight={communityInsight ?? PORTFOLIO.communityInsight}
            reraResult={reraResult}
            onReraChange={handleReraChange}
            onUpload={handleUpload}
            onReset={handleReset}
          />

          <p className="mt-8 text-center text-xs text-muted-foreground">
            {PORTFOLIO.dataNotice}
          </p>
        </div>
      </main>
    </div>
  );
}
