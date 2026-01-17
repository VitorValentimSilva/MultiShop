/**
 * Currency Utilities
 *
 * Functions for currency formatting and conversion.
 */

/**
 * Format cents to currency string
 *
 * @param amountCents - Amount in cents
 * @param currency - Currency code (ISO 4217)
 * @param locale - Locale for formatting
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(9990, "USD", "en") // "$99.90"
 * formatCurrency(9990, "BRL", "pt-BR") // "R$ 99,90"
 */
export function formatCurrency(
  amountCents: number,
  currency = "USD",
  locale = "en",
): string {
  const amount = amountCents / 100;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
}

/**
 * Convert dollars to cents
 */
export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}

/**
 * Convert cents to dollars
 */
export function centsToDollars(cents: number): number {
  return cents / 100;
}

/**
 * Parse currency string to cents
 *
 * @example
 * parseCurrencyToCents("$99.90") // 9990
 * parseCurrencyToCents("R$ 99,90") // 9990
 */
export function parseCurrencyToCents(value: string): number {
  const cleanValue = value.replace(/[^0-9.,]/g, "");
  const normalized = cleanValue.replace(",", ".");
  const parsed = parseFloat(normalized);
  return dollarsToCents(parsed);
}
