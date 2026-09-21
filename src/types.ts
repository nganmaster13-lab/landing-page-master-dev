export interface CompanyInfo {
  name: string;
  legalName: string;
  badge: string;
  tagline: string;
  subtagline: string;
  email: string;
  location: string;
  founded: string;
  workingHours: string;
}

export interface StoreLinkConfig {
  name: string;
  shortName: string;
  url: string;
  isConfigured: boolean;
  placeholderNote: string;
  badgeLabel: string;
  storePlatform: string;
}

export interface StoresConfig {
  appStore: StoreLinkConfig;
  googlePlay: StoreLinkConfig;
}

export interface MetricItem {
  id: string;
  label: string;
  value: string;
  subtext: string;
}

export interface AppProduct {
  id: string;
  name: string;
  tagline: string;
  category: string;
  rating: number;
  reviewsCount: string;
  downloads: string;
  platforms: string[];
  accentColor: string;
  isFlagship: boolean;
  icon: string;
  coverImage: string;
  description: string;
  highlights: string[];
  appStoreUrl: string;
  googlePlayUrl: string;
  version: string;
  size: string;
}

export interface EngineeringPillar {
  icon: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PolicySection {
  id: string;
  title: string;
  content: string;
}

export interface LegalDocument {
  lastUpdated: string;
  effectiveDate: string;
  company: string;
  contactEmail: string;
  introduction: string;
  sections: PolicySection[];
}

export interface DatabaseSchema {
  company: CompanyInfo;
  stores: StoresConfig;
  metrics: MetricItem[];
  products: AppProduct[];
  pillars: EngineeringPillar[];
  faq: FAQItem[];
  policyDocument: LegalDocument;
  termsDocument: LegalDocument;
}

export type PageRoute = "/" | "/policy" | "/terms";
