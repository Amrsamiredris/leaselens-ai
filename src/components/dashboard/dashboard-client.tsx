"use client";

import { useCallback, useRef, useState } from "react";

import { DashboardBento } from "@/components/dashboard/dashboard-bento";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import type { UploadState } from "@/lib/types";

export function DashboardClient() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleUpload = useCallback((name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setFileName(name);
    setUploadState("loading");

    timeoutRef.current = setTimeout(() => {
      setUploadState("done");
    }, 3000);
  }, []);

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-4">
        <SidebarTrigger aria-label="Toggle navigation" />
        <Separator orientation="vertical" className="h-4" />
        <div>
          <h1 className="text-sm font-semibold text-slate-900">Dashboard</h1>
          <p className="text-xs text-muted-foreground">
            Property compliance overview
          </p>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="mx-auto max-w-7xl">
          <DashboardBento
            uploadState={uploadState}
            fileName={fileName}
            onUpload={handleUpload}
          />
        </div>
      </main>
    </div>
  );
}
