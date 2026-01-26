"use client";

import { useMemo, useCallback } from "react";

import { useI18n, useTranslation } from "@/core/infrastructure";
import type { CurrencyCode, I18nNamespace } from "@/core/types";
import type {
  UseEntityTranslationOptionsDto,
  UseEntityTranslationResultDto,
  UsePluralTranslationOptionsDto,
} from "@/core/types/dtos";
import {
  formatNumberForLocale,
  formatCurrencyForLocale,
  formatDateTimeForLocale,
} from "@/core/utils";

/**
 * * Returns translations for a single entity based on a key.
 * * Falls back to provided default values until i18n is ready.
 */
export function useEntityTranslation(
  namespace: I18nNamespace,
  options: UseEntityTranslationOptionsDto
): UseEntityTranslationResultDto {
  const { key, fallback = key } = options;
  const { t, locale, isReady } = useTranslation(namespace);

  return useMemo(() => {
    // * While i18n is loading, return fallback values
    if (!isReady) {
      return {
        label: fallback,
        description: null,
        title: null,
        subtitle: null,
        locale,
        isReady: false,
      };
    }

    // * Try to translate each field, fallback to empty string if missing
    const label = t(`${key}.label`, { defaultValue: fallback });
    const description = t(`${key}.description`, { defaultValue: "" }) || null;
    const title = t(`${key}.title`, { defaultValue: "" }) || null;
    const subtitle = t(`${key}.subtitle`, { defaultValue: "" }) || null;

    return {
      // * Ensure result is a string before returning
      label: typeof label === "string" ? label : fallback,
      description: typeof description === "string" ? description : null,
      title: typeof title === "string" ? title : null,
      subtitle: typeof subtitle === "string" ? subtitle : null,
      locale,
      isReady: true,
    };
  }, [t, key, fallback, locale, isReady]);
}

/**
 * * Returns pluralized translation based on count.
 * * Uses i18next pluralization rules automatically.
 */
export function usePluralTranslation(
  namespace: I18nNamespace,
  options: UsePluralTranslationOptionsDto
): string {
  const { key, count, values = {} } = options;
  const { t, isReady } = useTranslation(namespace);

  return useMemo(() => {
    // * Use i18next's `count` feature for pluralization
    const result = t(key, { count, ...values });

    // ? If i18n is not ready, fallback to the key itself
    return !isReady ? key : typeof result === "string" ? result : key;
  }, [t, key, count, values, isReady]);
}

/**
 * * Returns a formatted translation with values interpolated.
 * * Example: t("greeting", { name: "John" })
 */
export function useFormattedTranslation(
  namespace: I18nNamespace,
  key: string,
  values: Record<string, unknown>
): string {
  const { t, isReady } = useTranslation(namespace);

  return useMemo(() => {
    const result = t(key, values);

    return !isReady ? key : typeof result === "string" ? result : key;
  }, [t, key, values, isReady]);
}

/**
 * * Formats a date based on the current locale.
 * * Falls back to default Date.toString() until ready.
 */
export function useLocalizedDate(
  date: Date,
  dateStyle: Intl.DateTimeFormatOptions["dateStyle"] = "medium",
  timeStyle?: Intl.DateTimeFormatOptions["timeStyle"]
): string {
  const { locale, isReady } = useI18n();

  return useMemo(() => {
    return !isReady
      ? date.toString()
      : formatDateTimeForLocale(date, locale, dateStyle, timeStyle);
  }, [date, locale, dateStyle, timeStyle, isReady]);
}

/**
 * * Formats a number based on the current locale.
 */
export function useLocalizedNumber(
  value: number,
  options?: Intl.NumberFormatOptions
): string {
  const { locale, isReady } = useI18n();

  return useMemo(() => {
    return isReady
      ? formatNumberForLocale(value, locale, options)
      : value.toString();
  }, [value, locale, options, isReady]);
}

/**
 * * Formats a currency value based on locale + currency code.
 */
export function useLocalizedCurrency(
  value: number,
  currency: CurrencyCode = "BRL"
): string {
  const { locale, isReady } = useI18n();

  return useMemo(() => {
    return isReady
      ? formatCurrencyForLocale(value, locale, currency)
      : value.toString();
  }, [value, locale, currency, isReady]);
}

/**
 * * Returns a namespaced translation function.
 * * Useful when you want to avoid manually prefixing keys.
 */
export function useNamespacedTranslation(namespace: I18nNamespace) {
  const { t, locale, isReady } = useTranslation(namespace);

  const translate = useCallback(
    (key: string, options?: Record<string, unknown>): string => {
      const result = isReady ? t(key, options) : key;

      // * Ensure return type is always string
      return String(result);
    },
    [t, isReady]
  );

  return { t: translate, locale, isReady };
}

/**
 * * Checks if a translation exists for a key.
 * * Uses defaultValue to detect missing translations.
 */
export function useHasTranslation(
  namespace: I18nNamespace,
  key: string
): boolean {
  const { t, isReady } = useTranslation(namespace);

  return useMemo(() => {
    const result = isReady
      ? t(key, { defaultValue: "__NOT_FOUND__" })
      : "__NOT_FOUND__";

    // * If translation is missing, i18next returns defaultValue
    return result !== "__NOT_FOUND__";
  }, [t, key, isReady]);
}
