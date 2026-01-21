// * List of supported application locales
// * Used across i18n, permissions, translations, and seeds
export const LOCALES = ["pt-BR", "en-US"] as const;

// * Strongly-typed locale union
// * Ensures only supported locales are used throughout the codebase
export type Locale = (typeof LOCALES)[number];
