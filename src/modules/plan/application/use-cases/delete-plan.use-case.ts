import { IPlanRepository } from "../../domain/repositories/plan.repository.interface";
import { PlanNotFoundError } from "../../domain/errors/plan-not-found.error";

/**
 * Delete Plan Use Case
 *
 * Deletes a plan from the system.
 */
export class DeletePlanUseCase {
  constructor(private readonly planRepository: IPlanRepository) {}

  async execute(id: string): Promise<void> {
    const exists = await this.planRepository.exists(id);

    if (!exists) {
      throw new PlanNotFoundError(id);
    }

    await this.planRepository.delete(id);
  }
}
