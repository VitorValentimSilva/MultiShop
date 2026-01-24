import { LOCALE_CONFIG } from "@/core/constants";
import type { CurrencyCode, LocaleCode } from "@/core/types";
import type { LocaleInfoDto } from "@/core/types/dtos";

// * Returns the locale configuration for a given locale code
export function getLocaleConfig(locale: LocaleCode): LocaleInfoDto {
  return LOCALE_CONFIG[locale];
}

// * Formats a date according to the given locale and date style
export function formatDateForLocale(
  date: Date,
  locale: LocaleCode,
  dateStyle: Intl.DateTimeFormatOptions["dateStyle"] = "medium"
): string {
  return new Intl.DateTimeFormat(locale, { dateStyle }).format(date);
}

// * Formats only the time part of a date according to the locale
export function formatTimeForLocale(
  date: Date,
  locale: LocaleCode,
  timeStyle: Intl.DateTimeFormatOptions["timeStyle"] = "short"
): string {
  return new Intl.DateTimeFormat(locale, { timeStyle }).format(date);
}

// * Formats both date and time according to the locale
export function formatDateTimeForLocale(
  date: Date,
  locale: LocaleCode,
  dateStyle: Intl.DateTimeFormatOptions["dateStyle"] = "medium",
  timeStyle: Intl.DateTimeFormatOptions["timeStyle"] = "short"
): string {
  return new Intl.DateTimeFormat(locale, { dateStyle, timeStyle }).format(date);
}

// * Formats a number using locale-specific number formatting rules
export function formatNumberForLocale(
  value: number,
  locale: LocaleCode,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

// * Formats a number as a currency value using locale and currency settings
// * Falls back to the locale's default currency if none is provided
export function formatCurrencyForLocale(
  value: number,
  locale: LocaleCode,
  currency?: CurrencyCode
): string {
  const config = getLocaleConfig(locale);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency ?? config.currency,
  }).format(value);
}

// * Formats a number as a percentage according to the locale
export function formatPercentForLocale(
  value: number,
  locale: LocaleCode,
  options?: Omit<Intl.NumberFormatOptions, "style">
): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    ...options,
  }).format(value);
}

// * Formats a number using compact notation (e.g., 1K, 1M)
export function formatCompactNumberForLocale(
  value: number,
  locale: LocaleCode,
  notation: Intl.NumberFormatOptions["notation"] = "compact"
): string {
  return new Intl.NumberFormat(locale, {
    notation,
    compactDisplay: "short",
  }).format(value);
}

// * Formats a relative time value (e.g., "3 days ago", "in 2 hours")
export function formatRelativeTimeForLocale(
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
  locale: LocaleCode,
  style: Intl.RelativeTimeFormatStyle = "long"
): string {
  return new Intl.RelativeTimeFormat(locale, { style }).format(value, unit);
}

// * Formats a list of strings using locale-specific list formatting rules
// * Example: ["A", "B", "C"] → "A, B, and C"
export function formatListForLocale(
  items: string[],
  locale: LocaleCode,
  type: Intl.ListFormatType = "conjunction"
): string {
  return new Intl.ListFormat(locale, { type }).format(items);
}
