import {
  PlanTranslation,
  PlanFeature,
  Review,
  Tenant,
  PlanPrice,
} from "@/app/_types/db";

export type BillingInterval = "MONTH" | "YEAR" | "ONE_TIME";

export interface Plan {
  id: string;
  key: string;
  active: boolean;
  stripeProductId?: string | null;
  translations: PlanTranslation[];
  prices: PlanPrice[];
  features: PlanFeature[];
  reviews: Review[];
  tenants: Tenant[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface PlanWithoutRelations {
  id: string;
  key: string;
  active: boolean;
  stripeProductId?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
