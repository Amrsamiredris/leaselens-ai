import type { LeaseExtraction } from "./types";

export const DASHBOARD_METRICS = {
  activeLeases: 142,
  upcomingEjariRenewals: 18,
  pendingChequesAed: 1_240_000,
} as const;

export const MOCK_LEASE_EXTRACTION: LeaseExtraction = {
  tenantName: "John Doe",
  annualRent: "AED 120,000",
  ejariExpiry: "Oct 15, 2026",
  paymentTerms: "4 Cheques",
  propertyAddress: "Marina Gate Tower 2, Unit 1407, Dubai Marina",
};

export function buildWhatsAppMessage(lease: LeaseExtraction): string {
  return `Dear ${lease.tenantName},

This is a friendly reminder that your Ejari registration for your tenancy at ${lease.propertyAddress} expires on ${lease.ejariExpiry}.

Per UAE regulations, we are providing 90 days' notice to discuss renewal terms.

Annual rent: ${lease.annualRent} (${lease.paymentTerms}).

Please contact us to schedule your renewal and avoid any compliance gaps with RERA.

Best regards,
LeaseLens Property Management`;
}

export function buildEmailMessage(lease: LeaseExtraction): string {
  return `Subject: 90-Day Ejari Renewal Notice - ${lease.propertyAddress}

Dear ${lease.tenantName},

We hope this message finds you well.

This letter serves as formal notice that your Ejari tenancy contract registration for the property at ${lease.propertyAddress} will expire on ${lease.ejariExpiry}.

In accordance with Dubai Land Department and RERA requirements, we are providing the statutory 90-day notice period to discuss renewal of your tenancy agreement.

Current lease summary:
- Annual rent: ${lease.annualRent}
- Payment terms: ${lease.paymentTerms}
- Ejari expiry: ${lease.ejariExpiry}

Please reply to this email or contact our office within 14 days to confirm your renewal intent and schedule the updated Ejari registration.

Kind regards,
LeaseLens Property Management Team`;
}
