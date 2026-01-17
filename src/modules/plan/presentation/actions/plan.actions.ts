"use server";

import { Response } from "@/shared/types/api.types";
import { ok, fail } from "@/shared/lib/utils/response";
import { PrismaPlanRepository } from "../../infrastructure/repositories/prisma-plan.repository";
import { CreatePlanUseCase } from "../../application/use-cases/create-plan.use-case";
import { GetAllPlansUseCase } from "../../application/use-cases/get-all-plans.use-case";
import { GetPlanByIdUseCase } from "../../application/use-cases/get-plan-by-id.use-case";
import { UpdatePlanUseCase } from "../../application/use-cases/update-plan.use-case";
import { DeletePlanUseCase } from "../../application/use-cases/delete-plan.use-case";
import { GetPlansByLocaleUseCase } from "../../application/use-cases/get-plans-by-locale.use-case";
import { CreatePlanSchema } from "../../infrastructure/schemas/create-plan.schema";
import { UpdatePlanSchema } from "../../infrastructure/schemas/update-plan.schema";
import { PlanResponseDTO } from "../../application/dtos/plan-response.dto";
import { Plan } from "../../domain/entities/plan.entity";

// Initialize repository (singleton pattern could be used here)
const planRepository = new PrismaPlanRepository();

/**
 * Convert Plan entity to Response DTO
 */
function planToResponseDTO(plan: Plan, locale?: string): PlanResponseDTO {
  const translation = locale ? plan.getTranslation(locale) : undefined;

  return {
    id: plan.id,
    key: plan.key,
    active: plan.active,
    stripeProductId: plan.stripeProductId,
    createdAt: plan.createdAt.toISOString(),
    updatedAt: plan.updatedAt.toISOString(),
    translation: translation
      ? {
          locale: translation.locale,
          title: translation.title,
          subtitle: translation.subtitle,
          description: translation.description,
        }
      : undefined,
    prices: plan.prices.map((price) => ({
      id: price.id,
      amountCents: price.price.amountCents,
      currency: price.price.currency,
      interval: price.interval,
      stripePriceId: price.stripePriceId,
      active: price.active,
      formattedPrice: price.price.format(locale),
    })),
    features: plan.features.map((feature) => ({
      featureId: feature.featureId,
      included: feature.included,
      note: feature.note,
      limitValue: feature.limitValue,
      limitUnit: feature.limitUnit,
    })),
  };
}

/**
 * Create a new plan
 */
export async function createPlanAction(
  data: unknown,
): Promise<Response<PlanResponseDTO>> {
  try {
    // Validate input
    const validated = CreatePlanSchema.parse(data);

    // Execute use case
    const useCase = new CreatePlanUseCase(planRepository);
    const plan = await useCase.execute(validated);

    // Return response
    return ok(planToResponseDTO(plan));
  } catch (error: unknown) {
    const err = error as { code?: string };
    return fail(err.code || "CREATE_PLAN_FAILED");
  }
}

/**
 * Update an existing plan
 */
export async function updatePlanAction(
  id: string,
  data: unknown,
): Promise<Response<PlanResponseDTO>> {
  try {
    // Validate input
    const validated = UpdatePlanSchema.parse(data);

    // Execute use case
    const useCase = new UpdatePlanUseCase(planRepository);
    const plan = await useCase.execute(id, validated);

    // Return response
    return ok(planToResponseDTO(plan));
  } catch (error: unknown) {
    const err = error as { code?: string };
    return fail(err.code || "UPDATE_PLAN_FAILED");
  }
}

/**
 * Delete a plan
 */
export async function deletePlanAction(id: string): Promise<Response<void>> {
  try {
    const useCase = new DeletePlanUseCase(planRepository);
    await useCase.execute(id);
    return ok(undefined);
  } catch (error: unknown) {
    const err = error as { code?: string };
    return fail(err.code || "DELETE_PLAN_FAILED");
  }
}

/**
 * Get all plans
 */
export async function getAllPlansAction(
  locale?: string,
  activeOnly?: boolean,
): Promise<Response<PlanResponseDTO[]>> {
  try {
    const useCase = new GetAllPlansUseCase(planRepository);
    const plans = await useCase.execute(locale, activeOnly);
    return ok(plans.map((plan) => planToResponseDTO(plan, locale)));
  } catch (error: unknown) {
    const err = error as { code?: string };
    return fail(err.code || "GET_PLANS_FAILED");
  }
}

/**
 * Get plan by ID
 */
export async function getPlanByIdAction(
  id: string,
  locale?: string,
): Promise<Response<PlanResponseDTO>> {
  try {
    const useCase = new GetPlanByIdUseCase(planRepository);
    const plan = await useCase.execute(id, locale);
    return ok(planToResponseDTO(plan, locale));
  } catch (error: unknown) {
    const err = error as { code?: string };
    return fail(err.code || "GET_PLAN_FAILED");
  }
}

/**
 * Get plans by locale (active only)
 */
export async function getPlansByLocaleAction(
  locale: string,
): Promise<Response<PlanResponseDTO[]>> {
  try {
    const useCase = new GetPlansByLocaleUseCase(planRepository);
    const plans = await useCase.execute(locale);
    return ok(plans.map((plan) => planToResponseDTO(plan, locale)));
  } catch (error: unknown) {
    const err = error as { code?: string };
    return fail(err.code || "GET_PLANS_FAILED");
  }
}
