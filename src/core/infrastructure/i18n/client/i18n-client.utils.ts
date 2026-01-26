"use client";

import * as Sentry from "@sentry/nextjs";

import { getClientInstance, isClientReady } from "@/core/infrastructure";
import type { LocaleCode } from "@/core/types";

/**
 * * Adds translation resources to the i18next client instance.
 * * This is used when you want to dynamically load translations after init.
 */
export function addClientResources(
  locale: LocaleCode,
  namespace: string,
  resources: Record<string, unknown>
): void {
  const clientInstance = getClientInstance();

  // ! If the client is not ready, log a warning to Sentry and exit.
  if (!clientInstance || !isClientReady()) {
    Sentry.captureMessage("i18next client not initialized yet", {
      level: "warning",
      extra: { locale, namespace },
    });

    return;
  }

  // * Add or merge the resource bundle for the given locale and namespace.
  // * The last two boolean flags ensure the bundle is merged and updated.
  clientInstance.addResourceBundle(locale, namespace, resources, true, true);
}

/**
 * ? Convenience wrapper to access the i18next client instance.
 * ? Useful when you want to use the instance directly.
 */
export function getClientI18nInstance() {
  return getClientInstance();
}
