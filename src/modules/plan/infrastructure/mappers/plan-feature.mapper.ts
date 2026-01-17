import { PlanFeature as PrismaPlanFeature } from "@/app/generated/prisma/client";
import { PlanFeature } from "../../domain/entities/plan-feature.entity";

/**
 * Plan Feature Mapper
 *
 * Converts between Prisma PlanFeature and domain entity.
 */
export class PlanFeatureMapper {
  /**
   * Convert Prisma PlanFeature to Domain Entity
   */
  static toDomain(prisma: PrismaPlanFeature): PlanFeature {
    return new PlanFeature({
      planId: prisma.planId,
      featureId: prisma.featureId,
      included: prisma.included,
      note: prisma.note,
      limitValue: prisma.limitValue,
      limitUnit: prisma.limitUnit,
    });
  }

  /**
   * Convert Domain Entity to Prisma Model
   */
  static toPrisma(domain: PlanFeature) {
    return {
      planId: domain.planId,
      featureId: domain.featureId,
      included: domain.included,
      note: domain.note,
      limitValue: domain.limitValue,
      limitUnit: domain.limitUnit,
    };
  }
}
