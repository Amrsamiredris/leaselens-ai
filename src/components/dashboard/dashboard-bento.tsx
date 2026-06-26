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
    <div className="flex flex-col gap-4">
      <MetricCards />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <div className="ll-card h-full p-5">
            <div className="mb-4">
              <h2 className="ll-card-heading">Contract intelligence</h2>
              <p className="mt-0.5 ll-body">
                Upload an Ejari tenancy PDF. AI extracts lease terms in seconds.
              </p>
            </div>
            <UploadZone
              uploadState={uploadState}
              fileName={fileName}
              onUpload={onUpload}
              onReset={onReset}
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

        <div className="flex flex-col gap-4 lg:col-span-5">
          <ExtractedDataPanel uploadState={uploadState} data={extraction} />

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

          <div className="ll-card p-5">
            <div className="mb-4">
              <h2 className="ll-card-heading">Renewal automation</h2>
              <p className="mt-0.5 ll-body">
                Generate compliant 90-day notices from extracted data
              </p>
            </div>
            <RenewalNoticeDialog
              uploadState={uploadState}
              lease={extraction}
              rera={reraResult}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
