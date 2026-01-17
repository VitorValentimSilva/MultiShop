import { BillingInterval } from "../../domain/value-objects/billing-interval.value-object";

/**
 * Update Plan DTO
 *
 * Data transfer object for updating an existing plan.
 */
export interface UpdatePlanDTO {
  key?: string;
  active?: boolean;
  stripeProductId?: string;

  // Translations (if provided, replaces all existing)
  translations?: {
    locale: string;
    title: string;
    subtitle?: string;
    description?: string;
  }[];

  // Prices (if provided, replaces all existing)
  prices?: {
    amountCents: number;
    currency: string;
    interval: BillingInterval;
    stripePriceId?: string;
    active?: boolean;
  }[];

  // Features (if provided, replaces all existing)
  features?: {
    featureId: string;
    included?: boolean;
    note?: string;
    limitValue?: number;
    limitUnit?: string;
  }[];
}
