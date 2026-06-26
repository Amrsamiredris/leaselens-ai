"use client";

import { useCallback, useRef, useState } from "react";
import { CheckCircle2, FileUp, Loader2, Upload } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import type { UploadState } from "@/lib/types";
import { cn } from "@/lib/utils";

type UploadZoneProps = {
  uploadState: UploadState;
  fileName: string | null;
  onUpload: (fileName: string) => void;
};

export function UploadZone({
  uploadState,
  fileName,
  onUpload,
}: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file || uploadState === "loading") return;
      onUpload(file.name);
    },
    [onUpload, uploadState]
  );

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      handleFile(event.dataTransfer.files[0]);
    },
    [handleFile]
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        inputRef.current?.click();
      }
    },
    []
  );

  return (
    <div
      role="button"
      tabIndex={uploadState === "loading" ? -1 : 0}
      aria-label="Upload tenancy contract PDF"
      aria-busy={uploadState === "loading"}
      onDragOver={(event) => {
        event.preventDefault();
        if (uploadState !== "loading") setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      onClick={() => {
        if (uploadState !== "loading") inputRef.current?.click();
      }}
      onKeyDown={onKeyDown}
      className={cn(
        "flex min-h-[320px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-colors motion-reduce:transition-none",
        uploadState === "done"
          ? "border-emerald-300 bg-emerald-50/40"
          : "border-slate-300 bg-slate-50/80",
        isDragging && uploadState !== "loading" && "border-primary bg-blue-50/60",
        uploadState === "loading" && "cursor-wait"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="sr-only"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />

      {uploadState === "loading" ? (
        <div className="flex w-full max-w-sm flex-col items-center gap-4">
          <Loader2 className="size-10 animate-spin text-primary" />
          <p className="text-base font-medium text-slate-900">
            AI extracting clauses...
          </p>
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-3 w-3/5" />
          </div>
        </div>
      ) : uploadState === "done" ? (
        <div className="flex flex-col items-center gap-3">
          <CheckCircle2 className="size-12 text-emerald-600" />
          <p className="text-lg font-medium text-slate-900">
            Contract processed
          </p>
          {fileName && (
            <p className="text-sm text-muted-foreground">{fileName}</p>
          )}
          <p className="text-sm text-slate-600">
            Lease terms extracted successfully
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Upload className="size-7" />
          </div>
          <p className="text-lg font-medium text-slate-900">
            Upload Tenancy Contract (PDF)
          </p>
          <p className="max-w-xs text-sm text-muted-foreground">
            Drag and drop your Ejari tenancy contract here, or click to browse
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
            <FileUp className="size-3.5" />
            PDF only
          </div>
        </div>
      )}
    </div>
  );
}
