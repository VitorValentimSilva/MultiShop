"use client";

import * as Sentry from "@sentry/nextjs";
import { useContext, useMemo } from "react";
import type { TFunction } from "i18next";

import { I18nContext } from "@/core/infrastructure";
import type { LocaleCode, I18nNamespace, I18nContextValue } from "@/core/types";

/**
 * * Hook to access i18n context.
 * * Throws if used outside of I18nProvider.
 */
export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);

  if (!context) {
    const error = new Error("useI18n must be used within an I18nProvider");

    // ! Capture in Sentry for better debugging in production
    Sentry.captureException(error);

    throw error;
  }

  return context;
}

/**
 * * Returns current locale from i18n context.
 */
export function useLocale(): LocaleCode {
  const { locale } = useI18n();

  return locale;
}

/**
 * * Returns the function to change locale from i18n context.
 */
export function useChangeLocale(): (locale: LocaleCode) => void {
  const { changeLocale } = useI18n();

  return changeLocale;
}

/**
 * * Hook to get a translation function scoped to a specific namespace.
 * * If namespace is provided, it prefixes the key automatically.
 */
export function useTranslation(namespace?: I18nNamespace) {
  const { t, locale, isReady } = useI18n();

  const boundT = useMemo(() => {
    // * Prefix the key with namespace if provided
    const prefix = namespace ? `${namespace}:` : "";

    return ((key: string, options?: Record<string, unknown>) =>
      t(`${prefix}${key}`, options)) as TFunction;
  }, [t, namespace]);

  return { t: boundT, locale, isReady };
}
