"use client";

import { useState } from "react";
import { Check, Copy, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";

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
import { buildEmailMessage, buildWhatsAppMessage } from "@/lib/mock-data";
import type { LeaseExtraction, UploadState } from "@/lib/types";

type RenewalNoticeDialogProps = {
  uploadState: UploadState;
  lease: LeaseExtraction;
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

export function RenewalNoticeDialog({
  uploadState,
  lease,
}: RenewalNoticeDialogProps) {
  const isEnabled = uploadState === "done";
  const whatsappMessage = buildWhatsAppMessage(lease);
  const emailMessage = buildEmailMessage(lease);

  return (
    <Dialog>
      <DialogTrigger
        disabled={!isEnabled}
        render={<Button className="w-full" size="lg" />}
      >
        Generate 90-day renewal notice
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>90-day renewal notice</DialogTitle>
          <DialogDescription>
            Drafted for {lease.tenantName} at {lease.propertyAddress}. Ready
            for WhatsApp or email — copy and send.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <MessageCircle className="size-4 text-primary" />
                WhatsApp message
              </div>
              <CopyButton text={whatsappMessage} label="WhatsApp" />
            </div>
            <pre className="whitespace-pre-wrap rounded-lg border border-border bg-muted/30 p-4 text-sm leading-relaxed text-foreground/80">
              {whatsappMessage}
            </pre>
          </section>

          <Separator />

          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Mail className="size-4 text-primary" />
                Email draft
              </div>
              <CopyButton text={emailMessage} label="Email" />
            </div>
            <pre className="whitespace-pre-wrap rounded-lg border border-border bg-muted/30 p-4 text-sm leading-relaxed text-foreground/80">
              {emailMessage}
            </pre>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
