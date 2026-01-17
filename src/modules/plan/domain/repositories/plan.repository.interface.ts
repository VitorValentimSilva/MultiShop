import { Plan } from "../entities/plan.entity";

/**
 * Plan Repository Interface
 *
 * Defines the contract for plan persistence operations.
 * Infrastructure layer must implement this interface.
 */
export interface IPlanRepository {
  /**
   * Find a plan by ID
   */
  findById(id: string, locale?: string): Promise<Plan | null>;

  /**
   * Find a plan by key
   */
  findByKey(key: string, locale?: string): Promise<Plan | null>;

  /**
   * Find all plans
   */
  findAll(locale?: string): Promise<Plan[]>;

  /**
   * Find all active plans
   */
  findAllActive(locale?: string): Promise<Plan[]>;

  /**
   * Create a new plan
   */
  create(plan: Plan): Promise<Plan>;

  /**
   * Update an existing plan
   */
  update(plan: Plan): Promise<Plan>;

  /**
   * Delete a plan
   */
  delete(id: string): Promise<void>;

  /**
   * Check if a plan exists
   */
  exists(id: string): Promise<boolean>;

  /**
   * Check if a plan key is available
   */
  isKeyAvailable(key: string, excludeId?: string): Promise<boolean>;
}
