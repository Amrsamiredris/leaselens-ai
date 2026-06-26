"use client";

import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
      toast.error("Could not copy — check browser permissions");
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="shrink-0"
    >
      {copied ? (
        <>
          <Check data-icon="inline-start" />
          Copied
        </>
      ) : (
        <>
          <Copy data-icon="inline-start" />
          Copy to clipboard
        </>
      )}
    </Button>
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
    <Button type="button" variant="secondary" size="sm" onClick={handleDownload}>
      <Download data-icon="inline-start" />
      Download as .txt
    </Button>
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
        render={<Button className="w-full" size="lg" />}
      >
        Generate 90-day renewal notice
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <DialogTitle>90-day renewal notice</DialogTitle>
            <Badge variant="secondary" className="border border-primary/20 bg-primary/5 text-primary">
              RERA Compliant — Decree No. 43 of 2013
            </Badge>
          </div>
          <DialogDescription>
            Drafted for {lease.tenantName} at {lease.propertyAddress}. Current
            rent {lease.annualRent}, max renewal {formatAed(rera.newMaxRent)},
            Ejari expires {lease.ejariExpiry}.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="whatsapp">
          <TabsList className="w-full">
            <TabsTrigger value="whatsapp" className="flex-1">
              WhatsApp Message
            </TabsTrigger>
            <TabsTrigger value="email" className="flex-1">
              Formal Email
            </TabsTrigger>
          </TabsList>

          <TabsContent value="whatsapp" className="flex flex-col gap-4">
            <div className="flex items-center justify-end">
              <CopyButton text={whatsappEn} label="WhatsApp" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                English
              </p>
              <pre className="whitespace-pre-wrap rounded-lg border border-border bg-muted/30 p-4 text-sm leading-relaxed text-foreground/80">
                {whatsappEn}
              </pre>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Arabic
              </p>
              <pre
                dir="rtl"
                className="whitespace-pre-wrap rounded-lg border border-border bg-muted/30 p-4 text-sm leading-relaxed text-foreground/80"
              >
                {whatsappAr}
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="email" className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-end gap-2">
              <CopyButton text={emailFull} label="Email" />
              <DownloadTxtButton
                text={emailFull}
                fileName={`renewal-notice-${lease.tenantName.replace(/\s+/g, "-").toLowerCase()}.txt`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                English
              </p>
              <pre className="whitespace-pre-wrap rounded-lg border border-border bg-muted/30 p-4 text-sm leading-relaxed text-foreground/80">
                {emailEn}
              </pre>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Arabic
              </p>
              <pre
                dir="rtl"
                className="whitespace-pre-wrap rounded-lg border border-border bg-muted/30 p-4 text-sm leading-relaxed text-foreground/80"
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
