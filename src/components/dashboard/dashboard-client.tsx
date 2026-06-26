"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";

import { DashboardBento } from "@/components/dashboard/dashboard-bento";
import { BRAND } from "@/lib/brand";
import { fileToBase64 } from "@/lib/lease-utils";
import {
  DEMO_DASHBOARD_LEASE,
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

const SAADIYAT_MARKET_RATE =
  PORTFOLIO.marketRatesByDistrict["Saadiyat Island"] ?? 199_000;

const DEFAULT_RERA = calculateReraIncrease(
  MOCK_LEASE_EXTRACTION.annualRentAED,
  SAADIYAT_MARKET_RATE
);

const DEMO_RERA = DEFAULT_RERA;

export function DashboardClient() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [extraction, setExtraction] = useState<LeaseExtraction | null>(null);
  const [communityInsight, setCommunityInsight] = useState<CommunityInsight | null>(
    PORTFOLIO.communityInsight
  );
  const [reraResult, setReraResult] = useState<ReraCalculation>(DEFAULT_RERA);

  const handleReraChange = useCallback((result: ReraCalculation) => {
    setReraResult(result);
  }, []);

  const handleUpload = useCallback(async (file: File) => {
    setFileName(file.name);
    setUploadState("loading");
    setExtraction(null);

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
      const district =
        data.extraction.districtName ??
        data.extraction.propertyAddress.split(",").pop()?.trim();
      const marketRate =
        (district ? PORTFOLIO.marketRatesByDistrict[district] : undefined) ??
        SAADIYAT_MARKET_RATE;
      setReraResult(
        calculateReraIncrease(data.extraction.annualRentAED, marketRate)
      );
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
      setReraResult(DEFAULT_RERA);
      setUploadState("done");
      toast.success("Contract processed", {
        description: "Demo extraction loaded (API fallback)",
      });
    }
  }, []);

  const handleLoadDemo = useCallback(() => {
    setFileName("demo-tenancy-contract.pdf");
    setExtraction(DEMO_DASHBOARD_LEASE);
    setCommunityInsight(PORTFOLIO.communityInsight);
    setReraResult(DEMO_RERA);
    setUploadState("done");
    toast.success("Demo data loaded", {
      description: "Mohammed Al Rashidi lease ready for review",
    });
  }, []);

  const handleReset = useCallback(() => {
    setUploadState("idle");
    setFileName(null);
    setExtraction(null);
    setCommunityInsight(PORTFOLIO.communityInsight);
    setReraResult(DEFAULT_RERA);
  }, []);

  const handleClear = useCallback(() => {
    handleReset();
  }, [handleReset]);

  const leaseData = extraction ?? DEMO_DASHBOARD_LEASE;

  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          Operations dashboard
        </h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          {BRAND.subtitle}
        </p>
      </header>

      <DashboardBento
        uploadState={uploadState}
        fileName={fileName}
        extraction={leaseData}
        communityInsight={communityInsight}
        reraResult={reraResult}
        onReraChange={handleReraChange}
        onUpload={handleUpload}
        onReset={handleReset}
        onLoadDemo={handleLoadDemo}
        onClear={handleClear}
      />

      <p className="mt-10 text-center text-[0.72rem] text-[var(--text-muted)]">
        {PORTFOLIO.dataNotice}
      </p>
    </>
  );
}
