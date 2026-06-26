"use client";

import { useMemo } from "react";

import { ExtractedDataPanel } from "@/components/dashboard/extracted-data-panel";
import { CommunityInsightCard } from "@/components/dashboard/community-insight-card";
import { MetricCards } from "@/components/dashboard/metric-cards";
import {
  PdcChequeSchedule,
  useChequeSchedule,
} from "@/components/dashboard/pdc-cheque-schedule";
import { RenewalNoticeDialog } from "@/components/dashboard/renewal-notice-dialog";
import { ReraCalculatorCard } from "@/components/dashboard/rera-calculator-card";
import { UploadZone } from "@/components/dashboard/upload-zone";
import { parseChequeCount } from "@/lib/lease-utils";
import type {
  CommunityInsight,
  LeaseExtraction,
  ReraCalculation,
  UploadState,
} from "@/lib/types";

type DashboardBentoProps = {
  uploadState: UploadState;
  fileName: string | null;
  extraction: LeaseExtraction;
  communityInsight: CommunityInsight;
  reraResult: ReraCalculation;
  onReraChange: (result: ReraCalculation) => void;
  onUpload: (file: File) => void;
  onReset: () => void;
  onLoadDemo: () => void;
  onClear: () => void;
};

export function DashboardBento({
  uploadState,
  fileName,
  extraction,
  communityInsight,
  reraResult,
  onReraChange,
  onUpload,
  onReset,
  onLoadDemo,
  onClear,
}: DashboardBentoProps) {
  const isDone = uploadState === "done";
  const showCheques = useMemo(
    () => isDone && parseChequeCount(extraction.paymentTerms) !== null,
    [isDone, extraction.paymentTerms]
  );

  const {
    schedule,
    setSchedule,
    firstChequeOffsetDays,
    setFirstChequeOffsetDays,
  } = useChequeSchedule(extraction, showCheques);

  return (
    <>
      <MetricCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[55fr_45fr]">
        <div className="flex flex-col gap-4">
          <div className="upload-card">
            <h2
              className="text-[1rem] font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              AI lease extraction
            </h2>
            <p
              className="mt-1 text-[0.82rem]"
              style={{ color: "var(--text-secondary)" }}
            >
              Upload a tenancy PDF. AI extracts lease terms in seconds.
            </p>
            <UploadZone
              uploadState={uploadState}
              fileName={fileName}
              onUpload={onUpload}
              onReset={onReset}
              onLoadDemo={onLoadDemo}
            />
          </div>

          {showCheques && (
            <PdcChequeSchedule
              lease={extraction}
              schedule={schedule}
              onScheduleChange={setSchedule}
              firstChequeOffsetDays={firstChequeOffsetDays}
              onOffsetChange={setFirstChequeOffsetDays}
            />
          )}
        </div>

        <div className="flex flex-col">
          <ExtractedDataPanel
            uploadState={uploadState}
            data={extraction}
            rera={reraResult}
            onClear={onClear}
          />

          {isDone && (
            <ReraCalculatorCard
              lease={extraction}
              onCalculationChange={onReraChange}
            />
          )}

          <CommunityInsightCard
            uploadState={uploadState}
            insight={communityInsight}
          />

          <div className="extracted-card p-[1.4rem_1.6rem]">
            <h2
              className="text-[0.95rem] font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Renewal automation
            </h2>
            <p
              className="mt-[0.2rem] text-[0.8rem]"
              style={{ color: "var(--text-secondary)" }}
            >
              Generate compliant 90-day notices from extracted data
            </p>
            <div className="mt-4">
              <RenewalNoticeDialog
                uploadState={uploadState}
                lease={extraction}
                rera={reraResult}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
