import { Feature, Review } from "@/app/_types/db";

export type BillingInterval = "MONTH" | "YEAR" | "ONE_TIME";

export interface Plan {
  id: string;
  key: string;
  title: string;
  subtitle?: string;
  description?: string;
  active: boolean;
  priceCents?: number;
  currency?: string;
  interval: BillingInterval;
  stripeProductId?: string;
  stripePriceId?: string;
  features: Feature[];
  reviews: Review[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PlanWithoutRelations {
  id: string;
  key: string;
  title: string;
  subtitle?: string;
  description?: string;
  active: boolean;
  priceCents?: number;
  currency?: string;
  interval: BillingInterval;
  stripeProductId?: string;
  stripePriceId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
