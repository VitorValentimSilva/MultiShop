import { Feature, Review, Tenant } from "@/app/_types/db";

export type BillingInterval = "MONTH" | "YEAR" | "ONE_TIME";

export interface Plan {
  id: string;
  key: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  active: boolean;
  priceCents?: number | null;
  currency?: string | null;
  interval: BillingInterval;
  stripeProductId?: string | null;
  stripePriceId?: string | null;
  features: Feature[];
  reviews: Review[];
  tenants: Tenant[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface PlanWithoutRelations {
  id: string;
  key: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  active: boolean;
  priceCents?: number | null;
  currency?: string | null;
  interval: BillingInterval;
  stripeProductId?: string | null;
  stripePriceId?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
