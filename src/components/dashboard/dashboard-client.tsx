"use client";

import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

import { DashboardBento } from "@/components/dashboard/dashboard-bento";
import { PageHeader } from "@/components/layout/page-header";
import { BRAND } from "@/lib/brand";
import { MOCK_LEASE_EXTRACTION, PORTFOLIO } from "@/lib/mock-data";
import type { CommunityInsight, LeaseExtraction, UploadState } from "@/lib/types";

export function DashboardClient() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [extraction, setExtraction] = useState<LeaseExtraction | null>(null);
  const [communityInsight, setCommunityInsight] = useState<CommunityInsight | null>(
    null
  );
  const fileRef = useRef<File | null>(null);

  const handleUpload = useCallback(async (file: File) => {
    fileRef.current = file;
    setFileName(file.name);
    setUploadState("loading");
    setExtraction(null);
    setCommunityInsight(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/extract", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Extraction failed");
      }

      setExtraction(data.extraction);
      setCommunityInsight(data.communityInsight);
      setUploadState("done");
      toast.success("Contract processed", {
        description: data.message,
      });
    } catch (err) {
      setUploadState("idle");
      setFileName(null);
      toast.error("Upload failed", {
        description: err instanceof Error ? err.message : "Please try again",
      });
    }
  }, []);

  const handleReset = useCallback(() => {
    fileRef.current = null;
    setUploadState("idle");
    setFileName(null);
    setExtraction(null);
    setCommunityInsight(null);
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
