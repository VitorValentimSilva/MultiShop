import { z } from "zod";

/**
 * Plan Query Schema
 *
 * Validation for plan query parameters.
 */
export const PlanQuerySchema = z.object({
  locale: z.string().min(2).max(10).optional(),
  activeOnly: z.boolean().optional().default(false),
});

export type PlanQueryInput = z.infer<typeof PlanQuerySchema>;
