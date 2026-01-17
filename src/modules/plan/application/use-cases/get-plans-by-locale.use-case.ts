import { Plan } from "../../domain/entities/plan.entity";
import { IPlanRepository } from "../../domain/repositories/plan.repository.interface";

/**
 * Get Plans By Locale Use Case
 *
 * Retrieves active plans with translations for a specific locale.
 */
export class GetPlansByLocaleUseCase {
  constructor(private readonly planRepository: IPlanRepository) {}

  async execute(locale: string): Promise<Plan[]> {
    return await this.planRepository.findAllActive(locale);
  }
}
