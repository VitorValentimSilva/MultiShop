import { DomainError } from "@/shared/errors";

/**
 * Plan Not Found Error
 *
 * Thrown when a plan cannot be found by its identifier.
 */
export class PlanNotFoundError extends DomainError {
  constructor(planId: string) {
    super(
      "PLAN_NOT_FOUND",
      404,
      { planId },
      `Plan with ID ${planId} not found`,
    );
  }
}
