import { Plan } from "../entities/plan.entity";

/**
 * Plan Is Active Specification
 *
 * Business rule: Checks if a plan is active and available for use.
 */
export class PlanIsActiveSpecification {
  /**
   * Check if plan satisfies the specification
   */
  isSatisfiedBy(plan: Plan): boolean {
    return plan.active;
  }

  /**
   * Get error message if specification is not satisfied
   */
  getErrorMessage(plan: Plan): string {
    return `Plan ${plan.key} is not active`;
  }
}
