import { DomainError } from "@/shared/errors";

/**
 * Invalid Plan Price Error
 *
 * Thrown when a plan price is invalid or missing.
 */
export class InvalidPlanPriceError extends DomainError {
  constructor(reason: string, params?: Record<string, unknown>) {
    super("INVALID_PLAN_PRICE", 400, { reason, ...params }, reason);
  }
}
