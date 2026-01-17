/**
 * Application Configuration
 *
 * Centralized configuration for the application.
 * Add application-wide settings here.
 */
export const appConfig = {
  name: "MultiShop",
  defaultLocale: "en",
  supportedLocales: ["en", "pt-BR", "es"],

  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },

  features: {
    multiTenancy: true,
    i18n: true,
    stripe: true,
  },
} as const;

export type AppConfig = typeof appConfig;
