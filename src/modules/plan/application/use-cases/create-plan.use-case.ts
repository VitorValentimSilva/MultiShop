import { Plan } from "../../domain/entities/plan.entity";
import { PlanPrice } from "../../domain/entities/plan-price.entity";
import { PlanFeature } from "../../domain/entities/plan-feature.entity";
import { PlanTranslation } from "../../domain/entities/plan-translation.entity";
import { Price } from "../../domain/value-objects/price.value-object";
import { IPlanRepository } from "../../domain/repositories/plan.repository.interface";
import { CreatePlanDTO } from "../dtos/create-plan.dto";
import { ApplicationError } from "@/shared/errors";
import { randomUUID } from "crypto";

/**
 * Create Plan Use Case
 *
 * Business logic for creating a new plan.
 */
export class CreatePlanUseCase {
  constructor(private readonly planRepository: IPlanRepository) {}

  async execute(dto: CreatePlanDTO): Promise<Plan> {
    // Check if key is available
    const isKeyAvailable = await this.planRepository.isKeyAvailable(dto.key);
    if (!isKeyAvailable) {
      throw new ApplicationError("PLAN_KEY_ALREADY_EXISTS", 400, {
        key: dto.key,
      });
    }

    // Validate that at least one translation is provided
    if (!dto.translations || dto.translations.length === 0) {
      throw new ApplicationError("PLAN_REQUIRES_TRANSLATION", 400);
    }

    // Validate that at least one price is provided
    if (!dto.prices || dto.prices.length === 0) {
      throw new ApplicationError("PLAN_REQUIRES_PRICE", 400);
    }

    const planId = randomUUID();

    // Create translations
    const translations = dto.translations.map(
      (t) =>
        new PlanTranslation({
          id: randomUUID(),
          planId,
          locale: t.locale,
          title: t.title,
          subtitle: t.subtitle,
          description: t.description,
        }),
    );

    // Create prices
    const prices = dto.prices.map(
      (p) =>
        new PlanPrice({
          id: randomUUID(),
          planId,
          price: Price.fromCents(p.amountCents, p.currency),
          interval: p.interval,
          stripePriceId: p.stripePriceId,
          active: p.active ?? true,
        }),
    );

    // Create features if provided
    const features = (dto.features ?? []).map(
      (f) =>
        new PlanFeature({
          planId,
          featureId: f.featureId,
          included: f.included ?? true,
          note: f.note,
          limitValue: f.limitValue,
          limitUnit: f.limitUnit,
        }),
    );

    // Create plan entity
    const plan = new Plan({
      id: planId,
      key: dto.key,
      active: dto.active ?? true,
      stripeProductId: dto.stripeProductId,
      translations,
      prices,
      features,
    });

    // Persist plan
    return await this.planRepository.create(plan);
  }
}
