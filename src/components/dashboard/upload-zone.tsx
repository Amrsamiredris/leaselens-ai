"use client";

import { useCallback, useRef, useState } from "react";
import { CheckCircle2, FileUp, Loader2, RotateCcw, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { UploadState } from "@/lib/types";
import { cn } from "@/lib/utils";

type UploadZoneProps = {
  uploadState: UploadState;
  fileName: string | null;
  onUpload: (file: File) => void;
  onReset: () => void;
};

export function UploadZone({
  uploadState,
  fileName,
  onUpload,
  onReset,
}: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file || uploadState === "loading") return;
      if (inputRef.current) inputRef.current.value = "";
      onUpload(file);
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
      if (uploadState === "done") return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        inputRef.current?.click();
      }
    },
    [uploadState]
  );

  if (uploadState === "done") {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border-2 border-primary/30 bg-primary/[0.04] p-8 text-center">
        <CheckCircle2 className="size-12 text-primary" />
        <p className="mt-4 font-display text-lg font-semibold text-foreground">
          Contract processed
        </p>
        {fileName && (
          <p className="mt-1 text-sm text-muted-foreground">{fileName}</p>
        )}
        <p className="mt-2 text-sm text-muted-foreground">
          Lease terms extracted — review the panel on the right
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-6"
          onClick={() => {
            if (inputRef.current) inputRef.current.value = "";
            onReset();
          }}
        >
          <RotateCcw className="size-4" />
          Upload another contract
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="sr-only"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
      </div>
    );
  }

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
        "flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 motion-reduce:transition-none",
        "border-border bg-muted/30 hover:border-primary/50 hover:bg-primary/[0.03]",
        isDragging && "border-primary bg-primary/[0.06] scale-[1.01]",
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
          <p className="font-medium text-foreground">AI extracting clauses…</p>
          <p className="text-xs text-muted-foreground">
            Parsing tenant, rent, Ejari expiry, and payment terms
          </p>
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-2.5 w-full rounded-full" />
            <Skeleton className="h-2.5 w-4/5 rounded-full" />
            <Skeleton className="h-2.5 w-3/5 rounded-full" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <Upload className="size-7" />
          </div>
          <p className="font-display text-lg font-semibold text-foreground">
            Upload tenancy contract
          </p>
          <p className="max-w-xs text-sm text-muted-foreground">
            Drag and drop your Ejari PDF here, or click to browse
          </p>
          <div className="mt-2 flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
            <FileUp className="size-3.5" />
            PDF · max 10 MB
          </div>
        </div>
      )}
    </div>
  );
}
