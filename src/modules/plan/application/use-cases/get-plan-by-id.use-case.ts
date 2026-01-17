import { Plan } from "../../domain/entities/plan.entity";
import { IPlanRepository } from "../../domain/repositories/plan.repository.interface";
import { PlanNotFoundError } from "../../domain/errors/plan-not-found.error";

/**
 * Get Plan By ID Use Case
 *
 * Retrieves a plan by its unique identifier.
 */
export class GetPlanByIdUseCase {
  constructor(private readonly planRepository: IPlanRepository) {}

  async execute(id: string, locale?: string): Promise<Plan> {
    const plan = await this.planRepository.findById(id, locale);

    if (!plan) {
      throw new PlanNotFoundError(id);
    }

    return plan;
  }
}
