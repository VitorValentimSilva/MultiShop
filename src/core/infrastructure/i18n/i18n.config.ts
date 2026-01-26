import type { InitOptions } from "i18next";
import HttpBackend, { HttpBackendOptions } from "i18next-http-backend";

import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  FALLBACK_LOCALE,
  I18N_NAMESPACES,
  DEFAULT_I18N_NAMESPACE,
  LOCALE_COOKIE_MAX_AGE,
} from "@/core/constants";

/**
 * * HTTP Backend for loading translations from public/locales
 */
export const i18nHttpBackend = HttpBackend;

/**
 * * Base i18next configuration shared between server and client.
 */
export const i18nBaseConfig: InitOptions = {
  // * Supported locales list
  supportedLngs: SUPPORTED_LOCALES as unknown as string[],

  // * Default language when none is provided
  lng: DEFAULT_LOCALE,

  // * Fallback language when translation is missing
  fallbackLng: FALLBACK_LOCALE,

  // * Default namespace to be used for translations
  defaultNS: DEFAULT_I18N_NAMESPACE,

  // * All available namespaces
  ns: Object.values(I18N_NAMESPACES),

  interpolation: {
    // * Prevent XSS escaping because React already handles it
    escapeValue: false,

    // * Custom formatter for interpolation values (numbers & dates)
    format: (value, format, lng) =>
      value instanceof Date
        ? new Intl.DateTimeFormat(lng, {
            dateStyle: format as Intl.DateTimeFormatOptions["dateStyle"],
          }).format(value)
        : typeof value === "number"
          ? new Intl.NumberFormat(lng).format(value)
          : String(value),
  },

  react: {
    // * Enable suspense for React i18next (recommended)
    useSuspense: true,
  },

  // * Enable debug logs in development mode
  debug: process.env.NODE_ENV === "development",

  // * Return keys when translations are empty instead of empty strings
  returnEmptyString: false,

  // * Prevent null values from being returned
  returnNull: false,

  // * Dot separator for nested translation keys
  keySeparator: ".",

  // * Namespace separator (e.g., "common:button.save")
  nsSeparator: ":",
};

/**
 * * Server-side configuration
 * * Preloads all locales to reduce latency in SSR.
 */
export const i18nServerConfig: InitOptions = {
  ...i18nBaseConfig,

  preload: SUPPORTED_LOCALES as unknown as string[],

  // * Disable immediate initialization for server side
  initImmediate: false,
};

/**
 * * Client-side configuration
 * * Enables locale detection, caching, and HTTP backend for loading translations.
 */
export const i18nClientConfig: InitOptions<HttpBackendOptions> = {
  ...i18nBaseConfig,

  // * Backend configuration to load translations from public/locales
  backend: {
    // * Path to load translations from
    loadPath: "/locales/{{lng}}/{{ns}}.json",
  },

  detection: {
    // * Order of locale detection
    order: ["cookie", "localStorage", "navigator"],

    // * Cache locale in cookie and localStorage
    caches: ["cookie", "localStorage"],

    cookieOptions: {
      path: "/",
      maxAge: LOCALE_COOKIE_MAX_AGE,
    },
  },

  // * Partition namespaces to optimize loading
  partialBundledLanguages: true,
};
