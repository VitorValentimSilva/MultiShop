import { BillingInterval } from "../value-objects/billing-interval.value-object";
import { Price } from "../value-objects/price.value-object";

/**
 * Plan Price Entity
 *
 * Represents a pricing option for a plan.
 * A plan can have multiple prices (different currencies, intervals).
 */
export class PlanPrice {
  readonly id: string;
  readonly planId: string;
  readonly price: Price;
  readonly interval: BillingInterval;
  readonly stripePriceId: string | null;
  readonly active: boolean;

  constructor(props: {
    id: string;
    planId: string;
    price: Price;
    interval: BillingInterval;
    stripePriceId?: string | null;
    active?: boolean;
  }) {
    this.id = props.id;
    this.planId = props.planId;
    this.price = props.price;
    this.interval = props.interval;
    this.stripePriceId = props.stripePriceId ?? null;
    this.active = props.active ?? true;
  }

  /**
   * Check if this price is active and can be used
   */
  get isAvailable(): boolean {
    return this.active;
  }

  /**
   * Get formatted price display
   */
  getDisplayPrice(locale?: string): string {
    return this.price.format(locale);
  }

  /**
   * Calculate monthly equivalent price
   */
  getMonthlyEquivalent(): number {
    const months = BillingIntervalHelpers.getMonths(this.interval);
    return this.price.dollars / months;
  }
}

import { BillingIntervalHelpers } from "../value-objects/billing-interval.value-object";
