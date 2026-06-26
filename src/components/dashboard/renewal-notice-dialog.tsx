"use client";

import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  buildEmailMessage,
  buildEmailMessageArabic,
  buildWhatsAppMessage,
  buildWhatsAppMessageArabic,
} from "@/lib/mock-data";
import type { LeaseExtraction, ReraCalculation, UploadState } from "@/lib/types";
import { formatAed } from "@/lib/rera";

type RenewalNoticeDialogProps = {
  uploadState: UploadState;
  lease: LeaseExtraction;
  rera: ReraCalculation;
};

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(`${label} copied to clipboard`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy. Check browser permissions.");
    }
  };

  return (
    <button type="button" onClick={handleCopy} className="action-btn">
      {copied ? (
        <>
          <Check className="size-4" />
          Copied
        </>
      ) : (
        <>
          <Copy className="size-4" />
          Copy to clipboard
        </>
      )}
    </button>
  );
}

function DownloadTxtButton({ text, fileName }: { text: string; fileName: string }) {
  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded as .txt");
  };

  return (
    <button type="button" onClick={handleDownload} className="action-btn">
      <Download className="size-4" />
      Download as .txt
    </button>
  );
}

export function RenewalNoticeDialog({
  uploadState,
  lease,
  rera,
}: RenewalNoticeDialogProps) {
  const isEnabled = uploadState === "done";
  const context = { lease, rera };

  const whatsappEn = buildWhatsAppMessage(context);
  const whatsappAr = buildWhatsAppMessageArabic(context);
  const emailEn = buildEmailMessage(context);
  const emailAr = buildEmailMessageArabic(context);
  const emailFull = `${emailEn}\n\n---\n\n${emailAr}`;

  return (
    <Dialog>
      <DialogTrigger
        disabled={!isEnabled}
        render={
          <button type="button" disabled={!isEnabled} className="action-btn" />
        }
      >
        Generate 90-day renewal notice
      </DialogTrigger>
      <DialogContent
        className="max-h-[90dvh] w-[min(560px,90vw)] max-w-[560px] overflow-y-auto rounded-[var(--radius-lg)] border p-0 shadow-none sm:max-w-[560px]"
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border-default)",
          color: "var(--text-primary)",
        }}
      >
        <DialogHeader
          className="border-b px-8 pb-4 pt-8"
          style={{ borderColor: "var(--border-default)" }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <DialogTitle
              className="text-[1rem] font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              90-Day Renewal Notice
            </DialogTitle>
            <span className="inline-block rounded-[var(--radius-pill)] border border-[var(--border-default)] bg-[var(--bg-inset)] px-[0.65rem] py-[0.22rem] text-[0.7rem] font-medium text-[var(--text-secondary)]">
              RERA Compliant · Decree No. 43 of 2013
            </span>
          </div>
          <DialogDescription
            className="text-[0.82rem]"
            style={{ color: "var(--text-secondary)" }}
          >
            Drafted for {lease.tenantName} at {lease.propertyAddress}. Current
            rent {lease.annualRent}, max renewal {formatAed(rera.newMaxRent)},
            Ejari expires {lease.ejariExpiry}.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="whatsapp" className="px-8 pb-8">
          <TabsList
            className="h-auto w-full justify-start gap-6 rounded-none border-b bg-transparent p-0"
            style={{ borderColor: "var(--border-default)" }}
          >
            <TabsTrigger
              value="whatsapp"
              className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 text-[0.85rem] shadow-none data-[state=active]:border-[var(--text-primary)] data-[state=active]:bg-transparent data-[state=active]:text-[var(--text-primary)] data-[state=active]:shadow-none"
              style={{ color: "var(--text-secondary)" }}
            >
              WhatsApp Message
            </TabsTrigger>
            <TabsTrigger
              value="email"
              className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 text-[0.85rem] shadow-none data-[state=active]:border-[var(--text-primary)] data-[state=active]:bg-transparent data-[state=active]:text-[var(--text-primary)] data-[state=active]:shadow-none"
              style={{ color: "var(--text-secondary)" }}
            >
              Formal Email
            </TabsTrigger>
          </TabsList>

          <TabsContent value="whatsapp" className="mt-5 flex flex-col gap-4">
            <div className="flex items-center justify-end">
              <CopyButton text={whatsappEn} label="WhatsApp" />
            </div>
            <div className="flex flex-col gap-2">
              <p
                className="text-[0.65rem] font-medium uppercase tracking-[0.1em]"
                style={{ color: "var(--text-muted)" }}
              >
                English
              </p>
              <pre
                className="whitespace-pre-wrap rounded-[var(--radius-md)] border p-4 text-[0.83rem] leading-[1.75]"
                style={{
                  background: "var(--bg-inset)",
                  borderColor: "var(--border-default)",
                  color: "var(--text-primary)",
                }}
              >
                {whatsappEn}
              </pre>
            </div>
            <div className="flex flex-col gap-2">
              <p
                className="text-[0.65rem] font-medium uppercase tracking-[0.1em]"
                style={{ color: "var(--text-muted)" }}
              >
                Arabic
              </p>
              <pre
                dir="rtl"
                className="whitespace-pre-wrap rounded-[var(--radius-md)] border p-4 text-[0.83rem] leading-[1.75]"
                style={{
                  background: "var(--bg-inset)",
                  borderColor: "var(--border-default)",
                  color: "var(--text-primary)",
                }}
              >
                {whatsappAr}
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="email" className="mt-5 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-end gap-2">
              <CopyButton text={emailFull} label="Email" />
              <DownloadTxtButton
                text={emailFull}
                fileName={`renewal-notice-${lease.tenantName.replace(/\s+/g, "-").toLowerCase()}.txt`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p
                className="text-[0.65rem] font-medium uppercase tracking-[0.1em]"
                style={{ color: "var(--text-muted)" }}
              >
                English
              </p>
              <pre
                className="whitespace-pre-wrap rounded-[var(--radius-md)] border p-4 text-[0.83rem] leading-[1.75]"
                style={{
                  background: "var(--bg-inset)",
                  borderColor: "var(--border-default)",
                  color: "var(--text-primary)",
                }}
              >
                {emailEn}
              </pre>
            </div>
            <div className="flex flex-col gap-2">
              <p
                className="text-[0.65rem] font-medium uppercase tracking-[0.1em]"
                style={{ color: "var(--text-muted)" }}
              >
                Arabic
              </p>
              <pre
                dir="rtl"
                className="whitespace-pre-wrap rounded-[var(--radius-md)] border p-4 text-[0.83rem] leading-[1.75]"
                style={{
                  background: "var(--bg-inset)",
                  borderColor: "var(--border-default)",
                  color: "var(--text-primary)",
                }}
              >
                {emailAr}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
