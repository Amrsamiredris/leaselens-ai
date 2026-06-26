import { ExtractedDataPanel } from "@/components/dashboard/extracted-data-panel";
import { CommunityInsightCard } from "@/components/dashboard/community-insight-card";
import { MetricCards } from "@/components/dashboard/metric-cards";
import { RenewalNoticeDialog } from "@/components/dashboard/renewal-notice-dialog";
import { UploadZone } from "@/components/dashboard/upload-zone";
import type { CommunityInsight, LeaseExtraction, UploadState } from "@/lib/types";

type DashboardBentoProps = {
  uploadState: UploadState;
  fileName: string | null;
  extraction: LeaseExtraction;
  communityInsight: CommunityInsight;
  onUpload: (file: File) => void;
  onReset: () => void;
};

export function DashboardBento({
  uploadState,
  fileName,
  extraction,
  communityInsight,
  onUpload,
  onReset,
}: DashboardBentoProps) {
  return (
    <div className="flex flex-col gap-6">
      <MetricCards />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <div className="brand-card h-full p-5 md:p-6">
            <div className="mb-4">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Contract intelligence
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Upload an Ejari tenancy PDF — AI extracts lease terms in seconds
              </p>
            </div>
            <UploadZone
              uploadState={uploadState}
              fileName={fileName}
              onUpload={onUpload}
              onReset={onReset}
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-5">
          <ExtractedDataPanel uploadState={uploadState} data={extraction} />

          <CommunityInsightCard
            uploadState={uploadState}
            insight={communityInsight}
          />

          <div className="brand-card p-5">
            <div className="mb-4">
              <h2 className="font-display text-base font-semibold text-foreground">
                Renewal automation
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Generate compliant 90-day notices from extracted data
              </p>
            </div>
            <RenewalNoticeDialog uploadState={uploadState} lease={extraction} />
          </div>
        </div>
      </div>
    </div>
  );
}
