"use client";

import { useState } from "react";
import { Check, Copy, Mail, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  buildEmailMessage,
  buildWhatsAppMessage,
  MOCK_LEASE_EXTRACTION,
} from "@/lib/mock-data";
import type { UploadState } from "@/lib/types";

type RenewalNoticeDialogProps = {
  uploadState: UploadState;
};

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <Check className="size-4" />
          Copied
        </>
      ) : (
        <>
          <Copy className="size-4" />
          Copy {label}
        </>
      )}
    </Button>
  );
}

export function RenewalNoticeDialog({ uploadState }: RenewalNoticeDialogProps) {
  const isEnabled = uploadState === "done";
  const whatsappMessage = buildWhatsAppMessage(MOCK_LEASE_EXTRACTION);
  const emailMessage = buildEmailMessage(MOCK_LEASE_EXTRACTION);

  return (
    <Dialog>
      <DialogTrigger
        disabled={!isEnabled}
        render={<Button className="w-full" size="lg" />}
      >
        Generate 90-Day Renewal Notice
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>90-Day Renewal Notice</DialogTitle>
          <DialogDescription>
            Drafted messages for {MOCK_LEASE_EXTRACTION.tenantName} based on
            extracted lease data. Ready to send via WhatsApp or email.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                <MessageCircle className="size-4 text-primary" />
                WhatsApp Message
              </div>
              <CopyButton text={whatsappMessage} label="WhatsApp" />
            </div>
            <pre className="whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
              {whatsappMessage}
            </pre>
          </section>

          <Separator />

          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                <Mail className="size-4 text-primary" />
                Email Draft
              </div>
              <CopyButton text={emailMessage} label="Email" />
            </div>
            <pre className="whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
              {emailMessage}
            </pre>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
