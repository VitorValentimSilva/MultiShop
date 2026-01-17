import { Plan } from "../../domain/entities/plan.entity";
import { IPlanRepository } from "../../domain/repositories/plan.repository.interface";

/**
 * Get All Plans Use Case
 *
 * Retrieves all plans from the system.
 */
export class GetAllPlansUseCase {
  constructor(private readonly planRepository: IPlanRepository) {}

  async execute(locale?: string, activeOnly = false): Promise<Plan[]> {
    if (activeOnly) {
      return await this.planRepository.findAllActive(locale);
    }
    return await this.planRepository.findAll(locale);
  }
}
