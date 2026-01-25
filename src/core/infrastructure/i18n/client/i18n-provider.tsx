"use client";

import * as Sentry from "@sentry/nextjs";
import i18next, { TFunction } from "i18next";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  LOCALE_COOKIE_NAME,
  LOCALE_COOKIE_MAX_AGE,
} from "@/core/constants";
import { I18nContext, initI18nClient } from "@/core/infrastructure";
import type { LocaleCode, I18nProviderProps } from "@/core/types";
import { isValidLocale } from "@/core/utils";

/**
 * * Saves the selected locale into a cookie.
 * * This is used to persist user preference between sessions.
 */
export function setLocaleCookie(locale: LocaleCode) {
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}`;
}

/**
 * * Saves the selected locale into localStorage.
 * * This is used as a fallback if cookies are unavailable.
 */
export function setLocaleStorage(locale: LocaleCode) {
  try {
    localStorage.setItem(LOCALE_COOKIE_NAME, locale);
  } catch (error) {
    // ! localStorage can be blocked in some browsers or environments (e.g., incognito).
    Sentry.captureMessage("Could not access localStorage to save locale", {
      level: "warning",
      extra: { locale, error },
    });
  }
}

/**
 * ? Replace the locale segment in the URL path (e.g., /en-US/home -> /pt-BR/home).
 * ? If the first path segment is not a supported locale, it returns null.
 */
export function replaceLocaleInPath(pathname: string, newLocale: LocaleCode) {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && SUPPORTED_LOCALES.includes(firstSegment as LocaleCode)) {
    segments[0] = newLocale;

    return `/${segments.join("/")}`;
  }

  return null;
}

export function I18nProvider({
  children,
  initialLocale,
  initialResources,
}: I18nProviderProps) {
  // * locale state holds the current selected locale
  const [locale, setLocale] = useState<LocaleCode>(
    initialLocale ?? DEFAULT_LOCALE
  );

  // * isReady indicates if i18next has been initialized
  const [isReady, setIsReady] = useState(false);

  // * i18n instance is stored here for translation calls
  const [i18n, setI18n] = useState<typeof i18next | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const init = async () => {
      // * Initialize i18next client with the selected locale and optional resources
      const instance = await initI18nClient(locale, initialResources);

      setI18n(instance);
      setIsReady(true);
    };

    init();
  }, [locale, initialResources]);

  const changeLocale = useCallback(
    (newLocale: LocaleCode) => {
      // ! Validate locale before applying it
      if (!isValidLocale(newLocale)) {
        Sentry.captureMessage(`Invalid locale attempted: ${newLocale}`, {
          level: "warning",
          extra: { attemptedLocale: newLocale },
        });

        return;
      }

      // * Update state and persist the new locale
      setLocale(newLocale);
      setLocaleCookie(newLocale);
      setLocaleStorage(newLocale);

      // * Update the URL if the current path contains a locale segment
      const newPath = replaceLocaleInPath(pathname, newLocale);

      if (newPath) router.push(newPath);
    },
    [pathname, router]
  );

  // * Provide a fallback translator function while i18next is not ready
  const t: TFunction =
    i18n && isReady ? i18n.t : (((key: string) => key) as TFunction);

  const value = {
    locale,
    changeLocale,
    t,
    isReady,
    supportedLocales: SUPPORTED_LOCALES,
  };

  return <I18nContext value={value}>{children}</I18nContext>;
}
