"use client";

import { useCallback, useRef, useState } from "react";
import { CheckCircle2, FileUp, RotateCcw, Upload } from "lucide-react";

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
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-gold-token bg-[var(--gold-action-bg)] p-8 text-center">
        <CheckCircle2 className="size-12 text-green-ok" />
        <p className="mt-4 text-[0.85rem] font-medium text-white-token">
          Contract processed
        </p>
        {fileName && (
          <p className="mt-1 text-[0.78rem] text-slate-token">{fileName}</p>
        )}
        <p className="mt-2 text-[0.78rem] text-slate-token">
          Lease terms extracted. Review the panel on the right.
        </p>
        <button
          type="button"
          className="ll-action-btn mt-6 w-auto px-5"
          onClick={() => {
            if (inputRef.current) inputRef.current.value = "";
            onReset();
          }}
        >
          <RotateCcw className="size-4" />
          Upload another contract
        </button>
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
        "flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-xl border-[1.5px] border-dashed p-8 text-center transition-[color,border-color,background] duration-150 ease-in-out motion-reduce:transition-none",
        "border-[rgba(201,168,76,0.3)] bg-[var(--gold-subtle-bg)] hover:border-[rgba(201,168,76,0.45)] hover:bg-[rgba(201,168,76,0.05)]",
        isDragging && "border-[rgba(201,168,76,0.55)] bg-[rgba(201,168,76,0.06)]",
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
          <div className="flex items-center gap-2.5">
            <span className="ll-pulse-dot" aria-hidden />
            <p className="text-[0.85rem] font-medium text-gold-light">
              AI extracting clauses…
            </p>
          </div>
          <p className="text-[0.78rem] text-slate-token">
            Parsing tenant, rent, Ejari expiry, and payment terms
          </p>
          <div className="flex w-full flex-col gap-2">
            <div className="h-2.5 w-full rounded-full ll-shimmer" />
            <div className="h-2.5 w-4/5 rounded-full ll-shimmer" />
            <div className="h-2.5 w-3/5 rounded-full ll-shimmer" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <Upload className="size-14 text-gold-light" strokeWidth={1.25} />
          <p className="text-[0.85rem] font-medium text-white-token">
            Upload tenancy contract
          </p>
          <p className="max-w-xs text-[0.78rem] text-slate-token">
            Drag and drop your Ejari PDF here, or click to browse
          </p>
          <div className="mt-2 flex items-center gap-2 text-[0.72rem] text-slate-token">
            <FileUp className="size-3.5 text-gold-token" />
            PDF · max 10 MB
          </div>
        </div>
      )}
    </div>
  );
}
