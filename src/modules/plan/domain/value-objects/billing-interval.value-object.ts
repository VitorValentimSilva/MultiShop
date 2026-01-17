/**
 * Billing Interval Value Object
 *
 * Represents the billing interval for plan pricing.
 */
export enum BillingInterval {
  MONTH = "MONTH",
  YEAR = "YEAR",
  WEEK = "WEEK",
  DAY = "DAY",
}

/**
 * Helper functions for BillingInterval
 */
export const BillingIntervalHelpers = {
  /**
   * Get display label for billing interval
   */
  getLabel(interval: BillingInterval): string {
    const labels: Record<BillingInterval, string> = {
      [BillingInterval.MONTH]: "Monthly",
      [BillingInterval.YEAR]: "Yearly",
      [BillingInterval.WEEK]: "Weekly",
      [BillingInterval.DAY]: "Daily",
    };
    return labels[interval];
  },

  /**
   * Get interval in months
   */
  getMonths(interval: BillingInterval): number {
    const months: Record<BillingInterval, number> = {
      [BillingInterval.DAY]: 1 / 30,
      [BillingInterval.WEEK]: 1 / 4,
      [BillingInterval.MONTH]: 1,
      [BillingInterval.YEAR]: 12,
    };
    return months[interval];
  },
};
