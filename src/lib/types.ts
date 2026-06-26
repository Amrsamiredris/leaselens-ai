export type UploadState = "idle" | "loading" | "done";

export type LeaseExtraction = {
  tenantName: string;
  annualRent: string;
  ejariExpiry: string;
  paymentTerms: string;
  propertyAddress: string;
};
