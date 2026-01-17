// Domain exports
export { Plan } from "./domain/entities/plan.entity";
export { PlanPrice } from "./domain/entities/plan-price.entity";
export { PlanFeature } from "./domain/entities/plan-feature.entity";
export { PlanTranslation } from "./domain/entities/plan-translation.entity";

export { Price } from "./domain/value-objects/price.value-object";
export {
  BillingInterval,
  BillingIntervalHelpers,
} from "./domain/value-objects/billing-interval.value-object";

export type { IPlanRepository } from "./domain/repositories/plan.repository.interface";

export { PlanNotFoundError } from "./domain/errors/plan-not-found.error";
export { InvalidPlanPriceError } from "./domain/errors/invalid-plan-price.error";
export { PlanInactiveError } from "./domain/errors/plan-inactive.error";

export { PlanIsActiveSpecification } from "./domain/specifications/plan-is-active.specification";
export { PlanHasValidPriceSpecification } from "./domain/specifications/plan-has-valid-price.specification";

// Application exports
export { CreatePlanUseCase } from "./application/use-cases/create-plan.use-case";
export { UpdatePlanUseCase } from "./application/use-cases/update-plan.use-case";
export { DeletePlanUseCase } from "./application/use-cases/delete-plan.use-case";
export { GetAllPlansUseCase } from "./application/use-cases/get-all-plans.use-case";
export { GetPlanByIdUseCase } from "./application/use-cases/get-plan-by-id.use-case";
export { GetPlansByLocaleUseCase } from "./application/use-cases/get-plans-by-locale.use-case";

export type { CreatePlanDTO } from "./application/dtos/create-plan.dto";
export type { UpdatePlanDTO } from "./application/dtos/update-plan.dto";
export type { PlanResponseDTO } from "./application/dtos/plan-response.dto";

// Infrastructure exports
export { PrismaPlanRepository } from "./infrastructure/repositories/prisma-plan.repository";
export {
  PlanMapper,
  PlanTranslationMapper,
} from "./infrastructure/mappers/plan.mapper";
export { PlanPriceMapper } from "./infrastructure/mappers/plan-price.mapper";
export { PlanFeatureMapper } from "./infrastructure/mappers/plan-feature.mapper";

export {
  CreatePlanSchema,
  type CreatePlanInput,
} from "./infrastructure/schemas/create-plan.schema";
export {
  UpdatePlanSchema,
  type UpdatePlanInput,
} from "./infrastructure/schemas/update-plan.schema";
export {
  PlanQuerySchema,
  type PlanQueryInput,
} from "./infrastructure/schemas/plan-query.schema";

// Presentation exports
export {
  createPlanAction,
  updatePlanAction,
  deletePlanAction,
  getAllPlansAction,
  getPlanByIdAction,
  getPlansByLocaleAction,
} from "./presentation/actions/plan.actions";
