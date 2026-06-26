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
  onLoadDemo?: () => void;
};

export function UploadZone({
  uploadState,
  fileName,
  onUpload,
  onReset,
  onLoadDemo,
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
      <div className="mt-5">
        <div
          className="upload-zone cursor-default"
          style={{ borderStyle: "solid", background: "var(--green-dim)" }}
        >
          <CheckCircle2
            className="mx-auto mb-3 size-10"
            style={{ color: "var(--green-text)" }}
          />
          <p
            className="text-[0.92rem] font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            Contract processed
          </p>
          {fileName && (
            <p
              className="mt-1 text-[0.8rem]"
              style={{ color: "var(--text-secondary)" }}
            >
              {fileName}
            </p>
          )}
          <p
            className="mt-2 text-[0.8rem]"
            style={{ color: "var(--text-secondary)" }}
          >
            Lease terms extracted. Review the panel on the right.
          </p>
        </div>
        <button
          type="button"
          className="ghost-btn mt-3 w-full"
          onClick={() => {
            if (inputRef.current) inputRef.current.value = "";
            onReset();
          }}
        >
          <RotateCcw className="mr-1.5 inline size-3.5" />
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
    <div className="mt-5">
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
          "upload-zone",
          isDragging && "border-[var(--gold)]",
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
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="ll-pulse-dot" style={{ background: "var(--gold-text)" }} aria-hidden />
              <p
                className="text-[0.92rem] font-medium"
                style={{ color: "var(--gold-text)" }}
              >
                AI extracting clauses…
              </p>
            </div>
            <p className="text-[0.8rem]" style={{ color: "var(--text-secondary)" }}>
              Parsing tenant, rent, Ejari expiry, and payment terms
            </p>
            <div className="flex w-full max-w-xs flex-col gap-2">
              <div className="h-2 w-full rounded-full ll-shimmer" />
              <div className="h-2 w-4/5 rounded-full ll-shimmer" />
            </div>
          </div>
        ) : (
          <>
            <Upload
              className="mx-auto mb-3 size-9"
              style={{ color: "var(--gold-text)" }}
              strokeWidth={1.5}
            />
            <p
              className="text-[0.92rem] font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              Upload tenancy contract
            </p>
            <p
              className="mt-[0.3rem] text-[0.8rem]"
              style={{ color: "var(--text-secondary)" }}
            >
              Drag and drop your Ejari PDF here, or click to browse
            </p>
            <span
              className="mt-3 inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border px-[0.7rem] py-1 text-[0.72rem]"
              style={{
                background: "var(--bg-elevated)",
                borderColor: "var(--border-default)",
                color: "var(--text-secondary)",
              }}
            >
              <FileUp className="size-3.5" style={{ color: "var(--gold-text)" }} />
              PDF · max 10 MB
            </span>
          </>
        )}
      </div>

      {onLoadDemo && uploadState === "idle" && (
        <button type="button" className="ghost-btn mt-3" onClick={onLoadDemo}>
          Load demo data
        </button>
      )}
    </div>
  );
}
