import { LocaleCode } from "@/core/types";
import { BaseTranslationDto } from "@/core/types/dtos";
import { DomainMetricDto } from "@/modules/metrics";

/**
 * * Represents a localized translation for a Domain Metric.
 * * Extends the base translation contract and links back to its metric.
 */
export interface DomainMetricTranslationDto extends BaseTranslationDto {
  // * Human-readable label shown to users
  readonly label: string;

  // * Optional description providing more context about the metric
  readonly description?: string | null;

  // * Reference to the parent Domain Metric
  readonly metricId: DomainMetricDto["id"];
}

/**
 * * DTO used when creating a new translation for a Domain Metric.
 * * Usually sent during metric creation or when adding a new locale.
 */
export interface CreateDomainMetricTranslationDto {
  // * Locale for this translation (e.g. "en-US", "pt-BR")
  readonly locale: LocaleCode;

  // * Required label for the metric in the given locale
  readonly label: string;

  // * Optional localized description
  readonly description?: string | null;
}

/**
 * * DTO used to update an existing translation.
 * * Fields are optional to allow partial updates.
 */
export interface UpdateDomainMetricTranslationDto {
  // * Locale identifying which translation should be updated
  readonly locale: LocaleCode;

  // * Updated label (optional)
  readonly label?: string;

  // * Updated description (optional)
  readonly description?: string | null;
}
