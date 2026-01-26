import "server-only";

import * as Sentry from "@sentry/nextjs";
import fs from "fs/promises";
import i18next, { TFunction } from "i18next";
import path from "path";
import { cache } from "react";
import { cookies, headers } from "next/headers";

import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  LOCALE_HEADER_NAME,
} from "@/core/constants";
import { i18nServerConfig } from "@/core/infrastructure";
import { createLogger } from "@/core/lib";
import type { LocaleCode, I18nNamespace } from "@/core/types";
import {
  isValidLocale,
  ensureValidLocale,
  parseAcceptLanguage,
} from "@/core/utils";

const logger = createLogger({ module: "i18n-server" });

let isInitialized = false;

/**
 * * Initializes the i18next server instance only once.
 * * Subsequent calls return the already initialized instance.
 */
export async function initI18nServer(): Promise<typeof i18next> {
  if (isInitialized) {
    logger.debug("i18next server already initialized");

    return i18next;
  }

  logger.info("Initializing i18next server");

  await i18next.init({
    ...i18nServerConfig,
    resources: {},
  });

  isInitialized = true;

  logger.info("i18next server initialized successfully");

  return i18next;
}

/**
 * * Retrieves the locale from cookie, header, or accept-language.
 * * Uses caching to avoid repeated parsing on the same request.
 */
export const getServerLocale = cache(async (): Promise<LocaleCode> => {
  const headersList = await headers();
  const cookieStore = await cookies();

  const localeSources = [
    cookieStore.get(LOCALE_COOKIE_NAME)?.value,
    headersList.get(LOCALE_HEADER_NAME) ?? undefined,
    headersList.get("accept-language")
      ? parseAcceptLanguage(headersList.get("accept-language")!)
      : undefined,
  ];

  for (const locale of localeSources) {
    if (!locale) continue;

    const normalized = ensureValidLocale(locale);

    if (isValidLocale(normalized)) return normalized;
  }

  // * If none is valid, fallback to default locale
  return DEFAULT_LOCALE;
});

/**
 * * Returns a translation function for a single namespace.
 * * Uses cache to avoid reinitializing for the same locale + namespace.
 */
export const getTranslation = cache(
  async (
    locale?: LocaleCode,
    namespace: I18nNamespace = "common"
  ): Promise<TFunction> => {
    await initI18nServer();

    const resolvedLocale = locale ?? (await getServerLocale());

    const instance = i18next.cloneInstance({
      lng: resolvedLocale,
      defaultNS: namespace,
    });

    await instance.changeLanguage(resolvedLocale);

    return instance.getFixedT(resolvedLocale, namespace);
  }
);

/**
 * * Returns translation functions for multiple namespaces.
 * * Useful when you need translations from more than one namespace.
 */
export const getTranslations = cache(
  async (
    locale?: LocaleCode,
    namespaces: I18nNamespace[] = ["common"]
  ): Promise<Record<I18nNamespace, TFunction>> => {
    await initI18nServer();

    const resolvedLocale = locale ?? (await getServerLocale());

    const translations: Partial<Record<I18nNamespace, TFunction>> = {};

    for (const ns of namespaces) {
      const instance = i18next.cloneInstance({
        lng: resolvedLocale,
        defaultNS: ns,
      });

      await instance.changeLanguage(resolvedLocale);

      translations[ns] = instance.getFixedT(resolvedLocale, ns);
    }

    return translations as Record<I18nNamespace, TFunction>;
  }
);

/**
 * ! Adds resources to the server instance.
 * ! Throws if i18next is not initialized.
 */
export function addServerResources(
  locale: LocaleCode,
  namespace: string,
  resources: Record<string, unknown>
): void {
  if (!isInitialized) {
    const error = new Error(
      "i18next server not initialized. Call initI18nServer first."
    );

    logger.error({ locale, namespace }, error.message);

    Sentry.captureException(error, {
      extra: { locale, namespace },
    });

    throw error;
  }

  logger.debug({ locale, namespace }, "Adding server resources");

  i18next.addResourceBundle(locale, namespace, resources, true, true);
}

/**
 * ? Checks if resources for a locale + namespace already exist.
 */
export function hasServerResources(
  locale: LocaleCode,
  namespace: string
): boolean {
  if (!isInitialized) return false;

  return i18next.hasResourceBundle(locale, namespace);
}

/**
 * ! Returns the i18next instance.
 * ! Throws if i18next is not initialized.
 */
export function getI18nInstance(): typeof i18next {
  if (!isInitialized) {
    const error = new Error(
      "i18next server not initialized. Call initI18nServer first."
    );

    logger.error(error.message);

    Sentry.captureException(error);

    throw error;
  }

  return i18next;
}

/**
 * * Loads a locale JSON file for a given locale and namespace.
 * * Returns null if the file does not exist or cannot be parsed.
 */
export async function loadLocaleFile<T>(
  locale: LocaleCode,
  namespace: I18nNamespace
): Promise<T | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "locales",
      locale,
      `${namespace}.json`
    );

    const content = await fs.readFile(filePath, "utf-8");

    return JSON.parse(content) as T;
  } catch {
    // ? Fail silently and let the caller decide how to handle missing files
    return null;
  }
}

/**
 * * Attempts to load the translation file for the default locale.
 * * Used when a locale-specific translation is missing.
 */
export async function loadFallbackLocaleFile<T>(
  locale: LocaleCode,
  namespace: I18nNamespace
): Promise<T | null> {
  // * No fallback needed if already using the default locale
  if (locale === DEFAULT_LOCALE) {
    logger.warn({ locale, namespace }, "Translation file not found");

    return null;
  }

  logger.debug(
    { locale, namespace },
    "Translation not found, falling back to default locale"
  );

  const fallback = await loadLocaleFile<T>(DEFAULT_LOCALE, namespace);

  if (!fallback) {
    logger.warn(
      { locale: DEFAULT_LOCALE, namespace },
      "Default locale translation also not found"
    );
  }

  return fallback;
}

/**
 * * Loads a translation JSON with automatic fallback to the default locale.
 * * Results are cached per locale + namespace.
 * * Always returns an object to keep consumers safe.
 */
export const loadTranslationJson = cache(
  async <T = Record<string, unknown>>(
    locale: LocaleCode,
    namespace: I18nNamespace = "common"
  ): Promise<T> => {
    const data =
      (await loadLocaleFile<T>(locale, namespace)) ??
      (await loadFallbackLocaleFile<T>(locale, namespace));

    // ? Ensure a stable return type even when translations are missing
    return data ?? ({} as T);
  }
);
