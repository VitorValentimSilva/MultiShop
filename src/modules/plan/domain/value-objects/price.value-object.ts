import { DomainError } from "@/shared/errors";

/**
 * Price Value Object
 *
 * Represents a monetary amount with currency.
 * Ensures price validity at construction time.
 */
export class Price {
  readonly amountCents: number;
  readonly currency: string;

  private constructor(amountCents: number, currency: string) {
    this.amountCents = amountCents;
    this.currency = currency.toUpperCase();
  }

  /**
   * Create a Price from cents
   */
  static fromCents(amountCents: number, currency: string): Price {
    if (amountCents < 0) {
      throw new DomainError("INVALID_PRICE_AMOUNT", 400, {
        amountCents,
        reason: "Price amount cannot be negative",
      });
    }

    if (!currency || currency.length !== 3) {
      throw new DomainError("INVALID_CURRENCY", 400, {
        currency,
        reason: "Currency must be a 3-letter ISO 4217 code",
      });
    }

    return new Price(amountCents, currency);
  }

  /**
   * Create a Price from dollars
   */
  static fromDollars(amount: number, currency: string): Price {
    const amountCents = Math.round(amount * 100);
    return Price.fromCents(amountCents, currency);
  }

  /**
   * Get amount in dollars
   */
  get dollars(): number {
    return this.amountCents / 100;
  }

  /**
   * Format price for display
   */
  format(locale = "en"): string {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: this.currency,
    }).format(this.dollars);
  }

  /**
   * Check if price is free
   */
  get isFree(): boolean {
    return this.amountCents === 0;
  }

  /**
   * Compare with another price
   */
  equals(other: Price): boolean {
    return (
      this.amountCents === other.amountCents && this.currency === other.currency
    );
  }

  /**
   * Check if this price is greater than another
   */
  isGreaterThan(other: Price): boolean {
    if (this.currency !== other.currency) {
      throw new DomainError("CURRENCY_MISMATCH", 400, {
        thisCurrency: this.currency,
        otherCurrency: other.currency,
        reason: "Cannot compare prices with different currencies",
      });
    }
    return this.amountCents > other.amountCents;
  }
}
