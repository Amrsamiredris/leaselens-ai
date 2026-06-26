import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExtractedDataPanel } from "@/components/dashboard/extracted-data-panel";
import { CommunityInsightCard } from "@/components/dashboard/community-insight-card";
import { MetricCards } from "@/components/dashboard/metric-cards";
import { RenewalNoticeDialog } from "@/components/dashboard/renewal-notice-dialog";
import { UploadZone } from "@/components/dashboard/upload-zone";
import { MOCK_LEASE_EXTRACTION } from "@/lib/mock-data";
import type { UploadState } from "@/lib/types";

type DashboardBentoProps = {
  uploadState: UploadState;
  fileName: string | null;
  onUpload: (fileName: string) => void;
};

export function DashboardBento({
  uploadState,
  fileName,
  onUpload,
}: DashboardBentoProps) {
  return (
    <div className="flex flex-col gap-6">
      <MetricCards />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-6">
        <div className="lg:col-span-3">
          <Card className="h-full rounded-xl border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">
                Contract Upload
              </CardTitle>
              <CardDescription>
                Drop a tenancy PDF to simulate AI clause extraction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UploadZone
                uploadState={uploadState}
                fileName={fileName}
                onUpload={onUpload}
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-2">
          <ExtractedDataPanel
            uploadState={uploadState}
            data={MOCK_LEASE_EXTRACTION}
          />

          <CommunityInsightCard uploadState={uploadState} />

          <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-slate-900">
                Action Automation
              </CardTitle>
              <CardDescription>
                Generate compliant renewal notices from extracted data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RenewalNoticeDialog uploadState={uploadState} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
