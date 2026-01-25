import type {
  LocaleCode,
  TranslatableEntity,
  TranslatedEntity,
  FlattenedTranslatedEntity,
} from "@/core/types";
import type {
  BaseTranslationDto,
  LocalizationOptionsDto,
} from "@/core/types/dtos";
import {
  resolveTranslation,
  getAvailableTranslationLocales,
} from "@/core/utils";

export type { TranslatableEntity, TranslatedEntity, FlattenedTranslatedEntity };

export class EntityTranslator<
  TEntity extends TranslatableEntity<TTranslation>,
  TTranslation extends BaseTranslationDto,
> {
  /**
   * * Translate a single entity using the available translations.
   * * Uses resolveTranslation() to choose the best translation based on options.
   */
  translate(
    entity: TEntity,
    options?: LocalizationOptionsDto
  ): TranslatedEntity<TEntity, TTranslation> {
    const result = resolveTranslation<TTranslation>(
      entity.translations as readonly TTranslation[] | undefined,
      options
    );

    return {
      entity,
      translation: result.translation,
      resolvedLocale: result.resolvedLocale,
      isFallback: result.isFallback,
      availableLocales: result.availableLocales,
    };
  }

  /**
   * * Translate many entities in one go.
   * * Uses translate() internally for each item.
   */
  translateMany(
    entities: TEntity[],
    options?: LocalizationOptionsDto
  ): TranslatedEntity<TEntity, TTranslation>[] {
    return entities.map((entity) => this.translate(entity, options));
  }

  /**
   * * Flattens a translated entity into a plain object.
   * * Keeps only the specified translation fields (e.g., label, description).
   * * Adds _locale and _isFallback metadata.
   */
  flatten<TFields extends keyof TTranslation>(
    entity: TEntity,
    fields: TFields[],
    options?: LocalizationOptionsDto
  ): FlattenedTranslatedEntity<TEntity, TTranslation, TFields> | null {
    const translated = this.translate(entity, options);

    // * If strict mode is enabled and there is no translation, return null
    if (!translated.translation && options?.strict) {
      return null;
    }

    const { translations, ...entityWithoutTranslations } = entity;

    // * Avoid unused variable warnings (translations already extracted)
    void translations;

    const translationFields: Partial<Pick<TTranslation, TFields>> = {};

    if (translated.translation) {
      for (const field of fields) {
        translationFields[field] = translated.translation[field];
      }
    }

    return {
      ...entityWithoutTranslations,
      ...translationFields,

      // * Store resolved locale and fallback flag for later use
      _locale: translated.resolvedLocale,
      _isFallback: translated.isFallback,
    } as FlattenedTranslatedEntity<TEntity, TTranslation, TFields>;
  }

  /**
   * * Flatten multiple entities.
   * * Filters out null results (when strict mode fails).
   */
  flattenMany<TFields extends keyof TTranslation>(
    entities: TEntity[],
    fields: TFields[],
    options?: LocalizationOptionsDto
  ): FlattenedTranslatedEntity<TEntity, TTranslation, TFields>[] {
    return entities
      .map((entity) => this.flatten(entity, fields, options))
      .filter(
        (
          result
        ): result is FlattenedTranslatedEntity<
          TEntity,
          TTranslation,
          TFields
        > => result !== null
      );
  }

  /**
   * * Returns a list of locales that have translations available for the entity.
   */
  getAvailableLocales(entity: TEntity): readonly LocaleCode[] {
    return getAvailableTranslationLocales(
      entity.translations as readonly TTranslation[] | undefined
    );
  }

  /**
   * * Checks if the entity has a translation for the given locale.
   */
  hasTranslation(entity: TEntity, locale: LocaleCode): boolean {
    if (!entity.translations) return false;
    return entity.translations.some((t) => t.locale === locale);
  }

  /**
   * * Returns the exact translation for a specific locale (no fallback).
   */
  getExactTranslation(
    entity: TEntity,
    locale: LocaleCode
  ): TTranslation | null {
    if (!entity.translations) return null;
    return entity.translations.find((t) => t.locale === locale) ?? null;
  }
}

/**
 * * Factory helper to create an EntityTranslator instance.
 */
export function createEntityTranslator<
  TEntity extends TranslatableEntity<TTranslation>,
  TTranslation extends BaseTranslationDto,
>(): EntityTranslator<TEntity, TTranslation> {
  return new EntityTranslator<TEntity, TTranslation>();
}

/**
 * * Convenience function to translate a single entity without creating an instance manually.
 */
export function translateEntity<
  TEntity extends TranslatableEntity<TTranslation>,
  TTranslation extends BaseTranslationDto,
>(
  entity: TEntity,
  options?: LocalizationOptionsDto
): TranslatedEntity<TEntity, TTranslation> {
  const translator = new EntityTranslator<TEntity, TTranslation>();

  return translator.translate(entity, options);
}

/**
 * * Convenience function to flatten a single entity without creating an instance manually.
 */
export function flattenEntity<
  TEntity extends TranslatableEntity<TTranslation>,
  TTranslation extends BaseTranslationDto,
  TFields extends keyof TTranslation,
>(
  entity: TEntity,
  fields: TFields[],
  options?: LocalizationOptionsDto
): FlattenedTranslatedEntity<TEntity, TTranslation, TFields> | null {
  const translator = new EntityTranslator<TEntity, TTranslation>();

  return translator.flatten(entity, fields, options);
}
