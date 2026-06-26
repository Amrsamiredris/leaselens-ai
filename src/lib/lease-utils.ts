import type {
  EjariCountdownStatus,
  LeaseExtraction,
  LeaseExtractionRaw,
  ChequeScheduleItem,
} from "@/lib/types";

export function formatDisplayDate(isoDate: string): string {
  const parsed = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return parsed.toLocaleDateString("en-AE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function normalizeExtraction(raw: LeaseExtractionRaw): LeaseExtraction {
  return {
    ...raw,
    annualRent: `AED ${raw.annualRentAED.toLocaleString("en-AE")}`,
    ejariExpiry: formatDisplayDate(raw.ejariExpiryDate),
  };
}

export function parseChequeCount(paymentTerms: string): number | null {
  const match = paymentTerms.match(/(\d+)\s*cheque/i);
  if (!match) return null;
  const count = parseInt(match[1], 10);
  return count > 0 ? count : null;
}

function addMonths(isoDate: string, months: number): string {
  const date = new Date(`${isoDate}T00:00:00`);
  date.setMonth(date.getMonth() + months);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function buildChequeSchedule(
  annualRentAed: number,
  paymentTerms: string,
  contractStartDate: string,
  firstChequeOffsetDays = 0
): ChequeScheduleItem[] {
  const chequeCount = parseChequeCount(paymentTerms);
  if (!chequeCount) return [];

  const amountPerCheque = Math.round(annualRentAed / chequeCount);
  const intervalMonths = 12 / chequeCount;

  const startDate = new Date(`${contractStartDate}T00:00:00`);
  startDate.setDate(startDate.getDate() + firstChequeOffsetDays);
  const adjustedStart = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;

  return Array.from({ length: chequeCount }, (_, index) => ({
    number: index + 1,
    dueDate: addMonths(adjustedStart, Math.round(intervalMonths * index)),
    amountAed: amountPerCheque,
    status: "Pending" as const,
  }));
}

export function getEjariCountdownStatus(
  ejariExpiryDate: string,
  today = new Date()
): EjariCountdownStatus {
  const expiry = new Date(`${ejariExpiryDate}T00:00:00`);
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysRemaining = Math.ceil(
    (expiry.getTime() - todayStart.getTime()) / msPerDay
  );

  const noticeWindowDate = new Date(expiry);
  noticeWindowDate.setDate(noticeWindowDate.getDate() - 90);
  const noticeWindowOpened = formatDisplayDate(
    `${noticeWindowDate.getFullYear()}-${String(noticeWindowDate.getMonth() + 1).padStart(2, "0")}-${String(noticeWindowDate.getDate()).padStart(2, "0")}`
  );

  if (daysRemaining > 90) {
    return {
      daysRemaining,
      label: "Compliant",
      ringClass: "stroke-emerald-500",
      pulse: false,
      flash: false,
      noticeWindowOpened,
    };
  }

  if (daysRemaining >= 60) {
    return {
      daysRemaining,
      label: "Notice window opens",
      ringClass: "stroke-amber-500",
      pulse: true,
      flash: false,
      noticeWindowOpened,
    };
  }

  if (daysRemaining >= 30) {
    return {
      daysRemaining,
      label: "Draft notice now",
      ringClass: "stroke-red-500",
      pulse: false,
      flash: false,
      noticeWindowOpened,
    };
  }

  return {
    daysRemaining,
    label: "URGENT — Ejari at risk",
    ringClass: "stroke-red-500",
    pulse: false,
    flash: true,
    noticeWindowOpened,
  };
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Failed to read file"));
        return;
      }
      const base64 = result.split(",")[1];
      if (!base64) {
        reject(new Error("Invalid base64 data"));
        return;
      }
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("FileReader error"));
    reader.readAsDataURL(file);
  });
}
