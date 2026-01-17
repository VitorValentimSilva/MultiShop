import { Plan } from "../entities/plan.entity";

/**
 * Plan Has Valid Price Specification
 *
 * Business rule: Checks if a plan has at least one active price.
 */
export class PlanHasValidPriceSpecification {
  /**
   * Check if plan satisfies the specification
   */
  isSatisfiedBy(plan: Plan): boolean {
    return plan.hasActivePrices;
  }

  /**
   * Get error message if specification is not satisfied
   */
  getErrorMessage(plan: Plan): string {
    return `Plan ${plan.key} has no active prices`;
  }
}
