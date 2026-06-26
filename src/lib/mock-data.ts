import portfolioData from "@/data/lease-portfolio.json";
import { formatAed } from "@/lib/rera";
import { normalizeExtraction } from "@/lib/lease-utils";
import type {
  LeaseExtraction,
  LeaseExtractionRaw,
  LeasePortfolioData,
  ReraCalculation,
} from "./types";

export const PORTFOLIO: LeasePortfolioData = portfolioData as LeasePortfolioData;

export const DASHBOARD_METRICS = PORTFOLIO.metrics;

export function leaseToExtractionRaw(): LeaseExtractionRaw {
  const lease = PORTFOLIO.demoLease;
  return {
    tenantName: lease.tenant_name,
    annualRentAED: lease.price_aed,
    ejariExpiryDate: lease.ejari_expiry,
    paymentTerms: lease.payment_terms,
    landlordName: "LeaseLens Property Management LLC",
    propertyAddress: lease.property_label,
    districtName: lease.district,
    contractStartDate: "2025-10-15",
    specialClauses: [
      "No subletting without written landlord consent",
      "24-hour notice required for property inspections",
      "Ejari registration must remain valid throughout tenancy",
    ],
  };
}

export function leaseToExtraction(): LeaseExtraction {
  return normalizeExtraction(leaseToExtractionRaw());
}

export const MOCK_LEASE_EXTRACTION = leaseToExtraction();

/** Curated demo lease for one-click dashboard walkthrough */
export const DEMO_DASHBOARD_LEASE_RAW: LeaseExtractionRaw = {
  tenantName: "Mohammed Al Rashidi",
  annualRentAED: 95_000,
  ejariExpiryDate: "2026-09-28",
  paymentTerms: "2 cheques",
  landlordName: "Future Communities Property Management",
  propertyAddress: "Marina Heights Tower, Apt 1204, Abu Dhabi",
  contractStartDate: "2025-09-28",
  specialClauses: [],
};

export const DEMO_DASHBOARD_LEASE = normalizeExtraction(DEMO_DASHBOARD_LEASE_RAW);

export type NoticeContext = {
  lease: LeaseExtraction;
  rera: ReraCalculation;
};

export function buildWhatsAppMessage({ lease, rera }: NoticeContext): string {
  return `Dear ${lease.tenantName}, please be advised that your tenancy at ${lease.propertyAddress} is approaching renewal.

Your Ejari registration expires on ${lease.ejariExpiry}. Current annual rent is ${lease.annualRent} (${lease.paymentTerms}).

Under RERA Decree No. 43 of 2013, the maximum legal renewal rent is ${formatAed(rera.newMaxRent)} (up to ${rera.maxIncreasePercent}% increase).

Please reply within 14 days to confirm renewal intent. We are happy to discuss terms.

Best regards,
${lease.landlordName}`;
}

export function buildWhatsAppMessageArabic({ lease, rera }: NoticeContext): string {
  return `عزيزي ${lease.tenantName}،

نود إبلاغكم بأن عقد الإيجار الخاص بكم في ${lease.propertyAddress} يقترب من موعد التجديد.

ينتهي تسجيل إيجاري في ${lease.ejariExpiry}. الإيجار السنوي الحالي ${lease.annualRent} (${lease.paymentTerms}).

وفقاً لمرسوم RERA رقم 43 لسنة 2013، الحد الأقصى القانوني لإيجار التجديد هو ${formatAed(rera.newMaxRent)} (زيادة تصل إلى ${rera.maxIncreasePercent}٪).

يرجى الرد خلال 14 يوماً لتأكيد نية التجديد.

مع التحية،
${lease.landlordName}`;
}

export function buildEmailMessage({ lease, rera }: NoticeContext): string {
  return `Subject: Formal 90-Day Tenancy Renewal Notice — ${lease.propertyAddress}

${lease.landlordName}
Property Management Division
Abu Dhabi, United Arab Emirates

Date: ${new Date().toLocaleDateString("en-AE", { day: "numeric", month: "long", year: "numeric" })}

To: ${lease.tenantName}
Re: Tenancy Renewal Notice — ${lease.propertyAddress}

Dear ${lease.tenantName},

1. NOTICE PERIOD
This letter constitutes formal notice under UAE Federal Law and Abu Dhabi DMT regulations that your tenancy registration (Ejari) for the property at ${lease.propertyAddress} will expire on ${lease.ejariExpiry}.

2. CURRENT LEASE TERMS
   a) Annual rent: ${lease.annualRent}
   b) Payment terms: ${lease.paymentTerms}
   c) Contract start: ${lease.contractStartDate}
   d) Landlord: ${lease.landlordName}

3. RERA RENT INCREASE (Decree No. 43 of 2013)
Based on the applicable Smart Rental Index band, the maximum permitted annual rent upon renewal is ${formatAed(rera.newMaxRent)}, representing a maximum increase of ${rera.maxIncreasePercent}% over the current rent of ${lease.annualRent}.

4. SPECIAL CLAUSES (for reference)
${lease.specialClauses.map((clause, index) => `   ${index + 1}. ${clause}`).join("\n")}

5. REQUIRED ACTION
Please confirm your renewal intent in writing within 14 days of receipt of this notice. Failure to respond may result in non-renewal proceedings in accordance with UAE tenancy law.

Kind regards,

LeaseLens Property Management Team
${lease.landlordName}`;
}

export function buildEmailMessageArabic({ lease, rera }: NoticeContext): string {
  return `الموضوع: إشعار رسمي بتجديد عقد الإيجار لمدة 90 يوماً — ${lease.propertyAddress}

${lease.landlordName}
قسم إدارة العقارات
أبوظبي، الإمارات العربية المتحدة

التاريخ: ${new Date().toLocaleDateString("ar-AE", { day: "numeric", month: "long", year: "numeric" })}

إلى: ${lease.tenantName}
بخصوص: إشعار تجديد عقد الإيجار — ${lease.propertyAddress}

عزيزي ${lease.tenantName}،

1. فترة الإشعار
يُعد هذا الخطاب إشعاراً رسمياً بموجب القانون الاتحادي ولوائح دائرة البلديات والنقل في أبوظبي بأن تسجيل إيجاري لعقاركم في ${lease.propertyAddress} سينتهي في ${lease.ejariExpiry}.

2. شروط العقد الحالية
   أ) الإيجار السنوي: ${lease.annualRent}
   ب) شروط الدفع: ${lease.paymentTerms}
   ج) تاريخ بدء العقد: ${lease.contractStartDate}
   د) المالك: ${lease.landlordName}

3. زيادة الإيجار وفق RERA (المرسوم رقم 43 لسنة 2013)
بناءً على نطاق مؤشر الإيجار الذكي المعتمد، الحد الأقصى المسموح للإيجار السنوي عند التجديد هو ${formatAed(rera.newMaxRent)}، بزيادة قصوى ${rera.maxIncreasePercent}٪ عن الإيجار الحالي ${lease.annualRent}.

4. بنود خاصة (للمرجعية)
${lease.specialClauses.map((clause, index) => `   ${index + 1}. ${clause}`).join("\n")}

5. الإجراء المطلوب
يرجى تأكيد نية التجديد كتابياً خلال 14 يوماً من استلام هذا الإشعار.

مع التحية،

فريق إدارة LeaseLens
${lease.landlordName}`;
}
