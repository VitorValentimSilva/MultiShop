import { z } from "zod";

import { DOMAIN_METRIC_ERROR_CODES } from "@/core/constants";
import {
  baseEntitySchema,
  baseTranslationSchema,
  createPaginatedResponseSchema,
  decimalValueSchema,
  keySchema,
  metaSchema,
  namespaceSchema,
  uuidSchema,
} from "@/core/utils";
import {
  createDomainMetricTranslationSchema,
  updateDomainMetricTranslationSchema,
} from "@/modules/metrics";

/**
 * * Maps domain metric validation errors to their corresponding error codes.
 * * This object is intended to be used directly in Zod validations.
 */
export const DOMAIN_METRIC_ERROR_MESSAGES = {
  UNIT_LENGTH_EXCEEDED:
    DOMAIN_METRIC_ERROR_CODES.DOMAIN_METRIC_UNIT_LENGTH_EXCEEDED,
} as const;

/**
 * * Schema for the metric unit.
 * - Optional field
 * - Maximum length of 50 characters
 */
const unitSchema = z
  .string()
  .max(50, DOMAIN_METRIC_ERROR_MESSAGES.UNIT_LENGTH_EXCEEDED)
  .optional();

/**
 * * Schema used when creating a new domain metric.
 */
export const createDomainMetricSchema = z.object({
  key: keySchema,
  namespace: namespaceSchema,
  value: decimalValueSchema,
  unit: unitSchema,
  meta: metaSchema,
  translations: z.array(createDomainMetricTranslationSchema),
});

/**
 * * Schema used when updating an existing domain metric.
 * * All fields are optional except those enforced by their base schemas.
 */
export const updateDomainMetricSchema = z.object({
  key: keySchema.optional(),
  namespace: namespaceSchema,
  value: decimalValueSchema.optional(),
  unit: unitSchema,
  meta: metaSchema,
  translations: z.array(updateDomainMetricTranslationSchema).optional(),
});

/**
 * * Schema representing a domain metric translation in API responses.
 */
export const domainMetricTranslationResponseSchema =
  baseTranslationSchema.extend({
    label: z.string(),
    description: z.string().optional(),
    metricId: uuidSchema,
  });

/**
 * * Schema representing a domain metric in API responses.
 */
export const domainMetricResponseSchema = baseEntitySchema.extend({
  key: z.string(),
  namespace: z.string().optional(),
  value: z.union([z.string(), z.number()]),
  unit: z.string().optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
  translations: z.array(domainMetricTranslationResponseSchema),
  defaultLocale: z.string().optional(),
});

/**
 * * Paginated response schema for domain metrics.
 */
export const paginatedDomainMetricsResponseSchema =
  createPaginatedResponseSchema(domainMetricResponseSchema);

/**
 * * Inferred types from schemas.
 */
export type CreateDomainMetricSchemaType = z.infer<
  typeof createDomainMetricSchema
>;
export type UpdateDomainMetricSchemaType = z.infer<
  typeof updateDomainMetricSchema
>;
export type DomainMetricTranslationResponseSchemaType = z.infer<
  typeof domainMetricTranslationResponseSchema
>;
export type DomainMetricResponseSchemaType = z.infer<
  typeof domainMetricResponseSchema
>;
export type PaginatedDomainMetricsResponseSchemaType = z.infer<
  typeof paginatedDomainMetricsResponseSchema
>;
