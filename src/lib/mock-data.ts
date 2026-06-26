import portfolioData from "@/data/lease-portfolio.json";
import type { LeaseExtraction, LeasePortfolioData } from "./types";

export const PORTFOLIO: LeasePortfolioData = portfolioData as LeasePortfolioData;

export const DASHBOARD_METRICS = PORTFOLIO.metrics;

export function leaseToExtraction(): LeaseExtraction {
  const lease = PORTFOLIO.demoLease;
  return {
    tenantName: lease.tenant_name,
    annualRent: `AED ${lease.price_aed.toLocaleString("en-AE")}`,
    ejariExpiry: lease.ejari_expiry_display,
    paymentTerms: lease.payment_terms,
    propertyAddress: lease.property_label,
  };
}

export const MOCK_LEASE_EXTRACTION = leaseToExtraction();

export function buildWhatsAppMessage(lease: LeaseExtraction): string {
  return `Dear ${lease.tenantName},

This is a friendly reminder that your tenancy registration for ${lease.propertyAddress} expires on ${lease.ejariExpiry}.

Per UAE regulations, we are providing 90 days' notice to discuss renewal terms.

Annual rent: ${lease.annualRent} (${lease.paymentTerms}).

Please contact us to schedule your renewal and avoid any compliance gaps with RERA and Abu Dhabi DMT requirements.

Best regards,
LeaseLens Property Management`;
}

export function buildEmailMessage(lease: LeaseExtraction): string {
  return `Subject: 90-Day Tenancy Renewal Notice - ${lease.propertyAddress}

Dear ${lease.tenantName},

We hope this message finds you well.

This letter serves as formal notice that your tenancy contract registration for the property at ${lease.propertyAddress} will expire on ${lease.ejariExpiry}.

In accordance with UAE rental regulations, we are providing the statutory 90-day notice period to discuss renewal of your tenancy agreement.

Current lease summary:
- Annual rent: ${lease.annualRent}
- Payment terms: ${lease.paymentTerms}
- Registration expiry: ${lease.ejariExpiry}

Please reply to this email or contact our office within 14 days to confirm your renewal intent and schedule the updated registration.

Kind regards,
LeaseLens Property Management Team`;
}
