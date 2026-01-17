import { PlanPrice } from "./plan-price.entity";
import { PlanFeature } from "./plan-feature.entity";
import { PlanTranslation } from "./plan-translation.entity";

/**
 * Plan Entity (Aggregate Root)
 *
 * Represents a subscription plan in the system.
 * This is the aggregate root that manages prices, features, and translations.
 */
export class Plan {
  readonly id: string;
  readonly key: string;
  readonly active: boolean;
  readonly stripeProductId: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  // Aggregate relationships
  readonly translations: PlanTranslation[];
  readonly prices: PlanPrice[];
  readonly features: PlanFeature[];

  constructor(props: {
    id: string;
    key: string;
    active?: boolean;
    stripeProductId?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    translations?: PlanTranslation[];
    prices?: PlanPrice[];
    features?: PlanFeature[];
  }) {
    this.id = props.id;
    this.key = props.key;
    this.active = props.active ?? true;
    this.stripeProductId = props.stripeProductId ?? null;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.translations = props.translations ?? [];
    this.prices = props.prices ?? [];
    this.features = props.features ?? [];
  }

  /**
   * Check if plan is available for purchase
   */
  get isAvailable(): boolean {
    return this.active && this.hasActivePrices;
  }

  /**
   * Check if plan has at least one active price
   */
  get hasActivePrices(): boolean {
    return this.prices.some((price) => price.active);
  }

  /**
   * Get translation for a specific locale
   */
  getTranslation(locale: string): PlanTranslation | undefined {
    return this.translations.find((t) => t.locale === locale);
  }

  /**
   * Get translation or fallback to default
   */
  getTranslationOrDefault(
    locale: string,
    defaultLocale = "en",
  ): PlanTranslation | undefined {
    return this.getTranslation(locale) ?? this.getTranslation(defaultLocale);
  }

  /**
   * Get active prices
   */
  getActivePrices(): PlanPrice[] {
    return this.prices.filter((price) => price.active);
  }

  /**
   * Get price by currency and interval
   */
  getPrice(currency: string, interval: string): PlanPrice | undefined {
    return this.prices.find(
      (price) =>
        price.price.currency === currency.toUpperCase() &&
        price.interval === interval &&
        price.active,
    );
  }

  /**
   * Get included features
   */
  getIncludedFeatures(): PlanFeature[] {
    return this.features.filter((feature) => feature.included);
  }

  /**
   * Check if plan has a specific feature
   */
  hasFeature(featureId: string): boolean {
    return this.features.some(
      (feature) => feature.featureId === featureId && feature.included,
    );
  }

  /**
   * Get the cheapest active price
   */
  getCheapestPrice(): PlanPrice | undefined {
    const activePrices = this.getActivePrices();
    if (activePrices.length === 0) return undefined;

    return activePrices.reduce((cheapest, current) => {
      const cheapestMonthly = cheapest.getMonthlyEquivalent();
      const currentMonthly = current.getMonthlyEquivalent();
      return currentMonthly < cheapestMonthly ? current : cheapest;
    });
  }
}
