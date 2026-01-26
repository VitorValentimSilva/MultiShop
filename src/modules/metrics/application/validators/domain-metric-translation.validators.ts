import { z } from "zod";

import {
  descriptionSchema,
  labelSchema,
  localeCodeSchema,
} from "@/src/core/utils";

/**
 * * Schema used to create a domain metric translation.
 * * Requires all translatable fields to be provided.
 */
export const createDomainMetricTranslationSchema = z.object({
  locale: localeCodeSchema,
  label: labelSchema,
  description: descriptionSchema,
});

/**
 * * Schema used to update an existing domain metric translation.
 * * Allows partial updates for translatable fields.
 */
export const updateDomainMetricTranslationSchema = z.object({
  locale: localeCodeSchema,
  label: labelSchema.optional(),
  description: descriptionSchema,
});

/**
 * * Inferred types from schemas.
 */
export type CreateDomainMetricTranslationSchemaType = z.infer<
  typeof createDomainMetricTranslationSchema
>;
export type UpdateDomainMetricTranslationSchemaType = z.infer<
  typeof updateDomainMetricTranslationSchema
>;
