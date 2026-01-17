import { BillingInterval } from "../../domain/value-objects/billing-interval.value-object";

/**
 * Create Plan DTO
 *
 * Data transfer object for creating a new plan.
 */
export interface CreatePlanDTO {
  key: string;
  active?: boolean;
  stripeProductId?: string;

  // Translations
  translations: {
    locale: string;
    title: string;
    subtitle?: string;
    description?: string;
  }[];

  // Prices
  prices: {
    amountCents: number;
    currency: string;
    interval: BillingInterval;
    stripePriceId?: string;
    active?: boolean;
  }[];

  // Features (optional)
  features?: {
    featureId: string;
    included?: boolean;
    note?: string;
    limitValue?: number;
    limitUnit?: string;
  }[];
}
