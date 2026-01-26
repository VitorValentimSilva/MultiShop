import { Prisma } from "@/app/generated/prisma/client";
import {
  BaseEntityDto,
  PaginatedResponseDto,
  TranslatableDto,
} from "@/core/types/dtos";
import {
  CreateDomainMetricTranslationDto,
  DomainMetricTranslationDto,
  UpdateDomainMetricTranslationDto,
} from "@/modules/metrics";

/**
 * * Main DTO representing a Domain Metric.
 * * Supports translations via the TranslatableDto contract.
 */
export interface DomainMetricDto
  extends BaseEntityDto, TranslatableDto<DomainMetricTranslationDto> {
  // * Unique key used to identify the metric internally
  readonly key: string;

  // * Optional namespace to logically group metrics
  readonly namespace?: string;

  // * Numeric value of the metric (stored as Decimal for precision)
  readonly value: Prisma.Decimal;

  // * Optional unit of measurement (e.g. %, ms, kg)
  readonly unit?: string;

  // * Optional JSON metadata for extensibility
  readonly meta?: Prisma.JsonValue;
}

/**
 * * DTO used when creating a new Domain Metric.
 * * Requires at least one translation.
 */
export interface CreateDomainMetricDto {
  // * Unique metric identifier
  readonly key: string;

  // * Optional namespace for grouping
  readonly namespace?: string;

  // * Initial metric value
  readonly value: Prisma.Decimal;

  // * Optional unit of measurement
  readonly unit?: string;

  // * Optional metadata for custom use cases
  readonly meta?: Prisma.JsonValue;

  // * Initial set of translations for the metric
  readonly translations: CreateDomainMetricTranslationDto[];
}

/**
 * * DTO used to update an existing Domain Metric.
 * * All fields are optional to support partial updates.
 */
export interface UpdateDomainMetricDto {
  // * Updated key (optional)
  readonly key?: string;

  // * Updated namespace (optional)
  readonly namespace?: string;

  // * Updated metric value (optional)
  readonly value?: Prisma.Decimal;

  // * Updated unit (optional)
  readonly unit?: string;

  // * Updated metadata (optional)
  readonly meta?: Prisma.JsonValue;

  // * Updated translations (optional)
  readonly translations?: UpdateDomainMetricTranslationDto[];
}

/**
 * * Paginated response wrapper for Domain Metrics.
 * * Used in list/search endpoints.
 */
export type PaginatedDomainMetricsResponseDto =
  PaginatedResponseDto<DomainMetricDto>;
