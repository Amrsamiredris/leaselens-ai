export type UploadState = "idle" | "loading" | "done";

export type Track = "land" | "investment" | "communities" | "decision";

/** Official schema: sample_listings.csv */
export interface Listing {
  listing_id: string;
  district: string;
  community: string;
  listing_type: "rent" | "sale";
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  size_sqm: number;
  price_aed: number;
  price_per_sqm_aed: number;
  furnished: boolean;
  amenities: string;
  latitude: number;
  longitude: number;
  listed_date: string;
  status: string;
  agency_type: string;
}

/** Official schema: sample_communities.csv */
export interface Community {
  community_id: string;
  district: string;
  population_estimate: number;
  occupancy_rate: number;
  service_demand_index: number;
  mobility_score: number;
  resident_experience_score: number;
  optimization_opportunity: string;
}

/** Synthetic compliance layer for demo (not in starter-kit CSV) */
export interface LeaseCompliance extends Listing {
  tenant_name: string;
  ejari_expiry: string;
  ejari_expiry_display: string;
  payment_terms: string;
  property_label: string;
}

export type LeaseExtraction = {
  tenantName: string;
  annualRent: string;
  ejariExpiry: string;
  paymentTerms: string;
  propertyAddress: string;
};

export type DashboardMetrics = {
  activeLeases: number;
  upcomingEjariRenewals: number;
  pendingChequesAed: number;
};

export type CommunityInsight = {
  district: string;
  residentExperienceScore: number;
  serviceDemandIndex: number;
  occupancyRate: number;
  optimizationOpportunity: string;
  summary: string;
};

export type LeasePortfolioData = {
  metrics: DashboardMetrics;
  demoLease: LeaseCompliance;
  communityInsight: CommunityInsight;
  sampleLeases: LeaseCompliance[];
  dataNotice: string;
};
