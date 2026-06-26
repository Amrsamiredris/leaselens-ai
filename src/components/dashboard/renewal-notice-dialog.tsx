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
    <button type="button" onClick={handleCopy} className="ll-action-btn w-auto shrink-0 px-4">
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
    <button type="button" onClick={handleDownload} className="ll-action-btn w-auto px-4">
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
          <button
            type="button"
            disabled={!isEnabled}
            className="ll-action-btn"
          />
        }
      >
        Generate 90-day renewal notice
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] max-w-[600px] overflow-y-auto rounded-2xl border border-gold-token bg-[var(--modal-bg)] p-0 text-white-token shadow-none sm:max-w-[600px] [&>button]:text-slate-token [&>button]:hover:text-white-token">
        <DialogHeader className="border-b border-token px-6 pb-4 pt-6">
          <div className="flex flex-wrap items-center gap-2">
            <DialogTitle className="ll-card-heading text-white-token">
              90-day renewal notice
            </DialogTitle>
            <span className="rounded-full border border-gold-token bg-[var(--gold-action-bg)] px-3 py-1 text-[0.72rem] font-medium text-gold-light">
              RERA Compliant · Decree No. 43 of 2013
            </span>
          </div>
          <DialogDescription className="ll-body">
            Drafted for {lease.tenantName} at {lease.propertyAddress}. Current
            rent {lease.annualRent}, max renewal {formatAed(rera.newMaxRent)},
            Ejari expires {lease.ejariExpiry}.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="whatsapp" className="px-6 pb-6">
          <TabsList className="h-auto w-full justify-start gap-6 rounded-none border-b border-token bg-transparent p-0">
            <TabsTrigger
              value="whatsapp"
              className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 text-[0.85rem] text-slate-token shadow-none data-[state=active]:border-[var(--gold)] data-[state=active]:bg-transparent data-[state=active]:text-white-token data-[state=active]:shadow-none"
            >
              WhatsApp Message
            </TabsTrigger>
            <TabsTrigger
              value="email"
              className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 text-[0.85rem] text-slate-token shadow-none data-[state=active]:border-[var(--gold)] data-[state=active]:bg-transparent data-[state=active]:text-white-token data-[state=active]:shadow-none"
            >
              Formal Email
            </TabsTrigger>
          </TabsList>

          <TabsContent value="whatsapp" className="mt-5 flex flex-col gap-4">
            <div className="flex items-center justify-end">
              <CopyButton text={whatsappEn} label="WhatsApp" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.1em] text-slate-token">
                English
              </p>
              <pre className="whitespace-pre-wrap rounded-lg border border-token bg-[rgba(255,255,255,0.03)] p-4 text-[0.85rem] leading-[1.7] text-white-token">
                {whatsappEn}
              </pre>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.1em] text-slate-token">
                Arabic
              </p>
              <pre
                dir="rtl"
                className="whitespace-pre-wrap rounded-lg border border-token bg-[rgba(255,255,255,0.03)] p-4 text-[0.85rem] leading-[1.7] text-white-token"
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
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.1em] text-slate-token">
                English
              </p>
              <pre className="whitespace-pre-wrap rounded-lg border border-token bg-[rgba(255,255,255,0.03)] p-4 text-[0.85rem] leading-[1.7] text-white-token">
                {emailEn}
              </pre>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.1em] text-slate-token">
                Arabic
              </p>
              <pre
                dir="rtl"
                className="whitespace-pre-wrap rounded-lg border border-token bg-[rgba(255,255,255,0.03)] p-4 text-[0.85rem] leading-[1.7] text-white-token"
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
