"use client";

import i18next from "i18next";
import { createContext } from "react";

import {
  i18nClientConfig,
  i18nHttpBackend,
} from "@/core/infrastructure/i18n/i18n.config";
import type { LocaleCode, I18nContextValue } from "@/core/types";

// * Creates a React context to share i18n state across the app.
export const I18nContext = createContext<I18nContextValue | null>(null);

// * Holds the i18next instance for the client.
let clientInstance: typeof i18next | null = null;

// * Tracks if i18next has already been initialized on the client.
let isClientInitialized = false;

/**
 * * Initializes the i18next client instance only once.
 * * If already initialized, it simply changes the language.
 */
export async function initI18nClient(
  locale: LocaleCode,
  resources?: Record<string, Record<string, unknown>>
): Promise<typeof i18next> {
  // * Create instance only once
  if (!clientInstance) {
    clientInstance = i18next.createInstance();
  }

  // * Initialize i18next with config on first call
  if (!isClientInitialized) {
    // * Use HTTP backend to load translations from public/locales
    clientInstance.use(i18nHttpBackend);

    await clientInstance.init({
      ...i18nClientConfig,
      lng: locale,
      resources: resources ? { [locale]: resources } : undefined,
    });

    isClientInitialized = true;

    return clientInstance;
  }

  // * If already initialized, just switch the language
  await clientInstance.changeLanguage(locale);

  return clientInstance;
}

/**
 * ? Returns the current i18next instance if it exists.
 * ? Useful when you need direct access to the instance.
 */
export function getClientInstance(): typeof i18next | null {
  return clientInstance;
}

/**
 * ? Checks if i18next was initialized on the client.
 * ? This is used to prevent multiple initializations.
 */
export function isClientReady(): boolean {
  return isClientInitialized;
}
