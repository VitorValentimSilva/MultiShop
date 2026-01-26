import type { ReactNode } from "react";
import type { TFunction } from "i18next";

import type { I18N_NAMESPACES } from "@/core/constants";
import type { LocaleCode } from "@/core/types";

/**
 * * Type representing all available i18n namespaces.
 * * This ensures that namespace usage is always type-safe.
 */
export type I18nNamespace =
  (typeof I18N_NAMESPACES)[keyof typeof I18N_NAMESPACES];

/**
 * * Represents an entity that supports translations.
 * * T is a translation object that must contain id and locale.
 */
export interface TranslatableEntity<
  T extends { id: string; locale: LocaleCode },
> {
  id: string;
  translations?: T[];
}

/**
 * * Result of resolving a translation for an entity.
 * * Includes fallback info and available locales for better handling in UI.
 */
export interface TranslatedEntity<
  TEntity,
  TTranslation extends { id: string; locale: LocaleCode },
> {
  entity: TEntity;
  translation: TTranslation | null;

  // * The locale that was resolved (could be fallback or exact)
  resolvedLocale: LocaleCode;

  // * True when translation was resolved from fallback logic
  isFallback: boolean;

  // * Locales that are available in the translations list
  availableLocales: readonly LocaleCode[];
}

/**
 * * Flattened version of a translated entity.
 * * Useful when you want a single object with both entity fields and translated fields.
 * ! It removes "translations" and merges selected translated fields.
 */
export type FlattenedTranslatedEntity<
  TEntity extends TranslatableEntity<TTranslation>,
  TTranslation extends { id: string; locale: LocaleCode },
  TFields extends keyof TTranslation,
> = Omit<TEntity, "translations"> &
  Pick<TTranslation, TFields> & {
    // * Locale used for the translation
    _locale: LocaleCode;

    // * Flag to indicate if translation is fallback
    _isFallback: boolean;
  };

/**
 * * Context value exposed by the i18n provider.
 * * It provides the current locale, translation function, and control functions.
 */
export interface I18nContextValue {
  locale: LocaleCode;
  changeLocale: (locale: LocaleCode) => void;

  // * i18next translation function (t)
  t: TFunction;

  // * Flag indicating if i18n is fully loaded and ready
  isReady: boolean;

  // * Supported locales list (read-only)
  supportedLocales: readonly LocaleCode[];
}

/**
 * * Props for the i18n provider component.
 * * Allows passing initial locale and resources for SSR or initial hydration.
 */
export interface I18nProviderProps {
  children: ReactNode;

  // * Optional locale to initialize i18n with
  initialLocale?: LocaleCode;

  // * Optional translations resources (namespace -> locale -> translations)
  initialResources?: Record<string, Record<string, unknown>>;
}
