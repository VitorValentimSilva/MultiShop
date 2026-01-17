import { Plan } from "../../domain/entities/plan.entity";
import { PlanPrice } from "../../domain/entities/plan-price.entity";
import { PlanFeature } from "../../domain/entities/plan-feature.entity";
import { PlanTranslation } from "../../domain/entities/plan-translation.entity";
import { Price } from "../../domain/value-objects/price.value-object";
import { IPlanRepository } from "../../domain/repositories/plan.repository.interface";
import { UpdatePlanDTO } from "../dtos/update-plan.dto";
import { PlanNotFoundError } from "../../domain/errors/plan-not-found.error";
import { ApplicationError } from "@/shared/errors";
import { randomUUID } from "crypto";

/**
 * Update Plan Use Case
 *
 * Business logic for updating an existing plan.
 */
export class UpdatePlanUseCase {
  constructor(private readonly planRepository: IPlanRepository) {}

  async execute(id: string, dto: UpdatePlanDTO): Promise<Plan> {
    // Get existing plan
    const existingPlan = await this.planRepository.findById(id);
    if (!existingPlan) {
      throw new PlanNotFoundError(id);
    }

    // Check if key is being changed and is available
    if (dto.key && dto.key !== existingPlan.key) {
      const isKeyAvailable = await this.planRepository.isKeyAvailable(
        dto.key,
        id,
      );
      if (!isKeyAvailable) {
        throw new ApplicationError("PLAN_KEY_ALREADY_EXISTS", 400, {
          key: dto.key,
        });
      }
    }

    // Update translations if provided
    let translations = existingPlan.translations;
    if (dto.translations) {
      translations = dto.translations.map(
        (t) =>
          new PlanTranslation({
            id: randomUUID(),
            planId: id,
            locale: t.locale,
            title: t.title,
            subtitle: t.subtitle,
            description: t.description,
          }),
      );
    }

    // Update prices if provided
    let prices = existingPlan.prices;
    if (dto.prices) {
      prices = dto.prices.map(
        (p) =>
          new PlanPrice({
            id: randomUUID(),
            planId: id,
            price: Price.fromCents(p.amountCents, p.currency),
            interval: p.interval,
            stripePriceId: p.stripePriceId,
            active: p.active ?? true,
          }),
      );
    }

    // Update features if provided
    let features = existingPlan.features;
    if (dto.features) {
      features = dto.features.map(
        (f) =>
          new PlanFeature({
            planId: id,
            featureId: f.featureId,
            included: f.included ?? true,
            note: f.note,
            limitValue: f.limitValue,
            limitUnit: f.limitUnit,
          }),
      );
    }

    // Create updated plan entity
    const updatedPlan = new Plan({
      id,
      key: dto.key ?? existingPlan.key,
      active: dto.active ?? existingPlan.active,
      stripeProductId: dto.stripeProductId ?? existingPlan.stripeProductId,
      createdAt: existingPlan.createdAt,
      updatedAt: new Date(),
      translations,
      prices,
      features,
    });

    // Persist updated plan
    return await this.planRepository.update(updatedPlan);
  }
}
