import { z } from "zod";

/**
 * Billing Interval Schema
 */
export const BillingIntervalSchema = z.enum(["MONTH", "YEAR", "WEEK", "DAY"]);

/**
 * Plan Translation Schema
 */
export const PlanTranslationSchema = z.object({
  locale: z.string().min(2).max(10),
  title: z.string().min(1).max(255),
  subtitle: z.string().max(500).optional(),
  description: z.string().max(5000).optional(),
});

/**
 * Plan Price Schema
 */
export const PlanPriceSchema = z.object({
  amountCents: z.number().int().min(0),
  currency: z.string().length(3),
  interval: BillingIntervalSchema,
  stripePriceId: z.string().optional(),
  active: z.boolean().optional().default(true),
});

/**
 * Plan Feature Schema
 */
export const PlanFeatureSchema = z.object({
  featureId: z.string().uuid(),
  included: z.boolean().optional().default(true),
  note: z.string().max(500).optional(),
  limitValue: z.number().int().min(0).optional(),
  limitUnit: z.string().max(50).optional(),
});

/**
 * Create Plan Schema
 */
export const CreatePlanSchema = z.object({
  key: z
    .string()
    .min(2)
    .max(100)
    .regex(
      /^[a-z0-9-]+$/,
      "Key must contain only lowercase letters, numbers, and hyphens",
    ),
  active: z.boolean().optional().default(true),
  stripeProductId: z.string().optional(),
  translations: z
    .array(PlanTranslationSchema)
    .min(1, "At least one translation is required"),
  prices: z.array(PlanPriceSchema).min(1, "At least one price is required"),
  features: z.array(PlanFeatureSchema).optional(),
});

export type CreatePlanInput = z.infer<typeof CreatePlanSchema>;
