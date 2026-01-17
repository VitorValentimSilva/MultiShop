import { z } from "zod";
import {
  PlanTranslationSchema,
  PlanPriceSchema,
  PlanFeatureSchema,
} from "./create-plan.schema";

/**
 * Update Plan Schema
 */
export const UpdatePlanSchema = z.object({
  key: z
    .string()
    .min(2)
    .max(100)
    .regex(
      /^[a-z0-9-]+$/,
      "Key must contain only lowercase letters, numbers, and hyphens",
    )
    .optional(),
  active: z.boolean().optional(),
  stripeProductId: z.string().optional(),
  translations: z.array(PlanTranslationSchema).optional(),
  prices: z.array(PlanPriceSchema).optional(),
  features: z.array(PlanFeatureSchema).optional(),
});

export type UpdatePlanInput = z.infer<typeof UpdatePlanSchema>;
