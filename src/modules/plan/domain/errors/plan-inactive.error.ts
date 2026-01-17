import { DomainError } from "@/shared/errors";

/**
 * Plan Inactive Error
 *
 * Thrown when attempting to use an inactive plan.
 */
export class PlanInactiveError extends DomainError {
  constructor(planId: string) {
    super(
      "PLAN_INACTIVE",
      400,
      { planId },
      `Plan ${planId} is inactive and cannot be used`,
    );
  }
}
