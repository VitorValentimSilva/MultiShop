import { BillingInterval } from "../../domain/value-objects/billing-interval.value-object";

/**
 * Plan Response DTO
 *
 * Data transfer object for plan responses.
 */
export interface PlanResponseDTO {
  id: string;
  key: string;
  active: boolean;
  stripeProductId: string | null;
  createdAt: string;
  updatedAt: string;

  // Translation for requested locale
  translation?: {
    locale: string;
    title: string;
    subtitle: string | null;
    description: string | null;
  };

  // Prices
  prices: {
    id: string;
    amountCents: number;
    currency: string;
    interval: BillingInterval;
    stripePriceId: string | null;
    active: boolean;
    formattedPrice: string;
  }[];

  // Features
  features: {
    featureId: string;
    included: boolean;
    note: string | null;
    limitValue: number | null;
    limitUnit: string | null;
  }[];
}
