import {
  Plan as PrismaPlan,
  PlanTranslation as PrismaTranslation,
} from "@/app/generated/prisma/client";
import { Plan } from "../../domain/entities/plan.entity";
import { PlanTranslation } from "../../domain/entities/plan-translation.entity";
import { PlanPriceMapper } from "./plan-price.mapper";
import { PlanFeatureMapper } from "./plan-feature.mapper";

/**
 * Plan Mapper
 *
 * Converts between Prisma models and domain entities.
 */
export class PlanMapper {
  /**
   * Convert Prisma Plan to Domain Entity
   */
  static toDomain(
    prisma: PrismaPlan & {
      translations?: PrismaTranslation[];
      prices?: unknown[];
      features?: unknown[];
    },
  ): Plan {
    return new Plan({
      id: prisma.id,
      key: prisma.key,
      active: prisma.active,
      stripeProductId: prisma.stripeProductId,
      createdAt: prisma.createdAt,
      updatedAt: prisma.updatedAt,
      translations: prisma.translations
        ? prisma.translations.map((t) => PlanTranslationMapper.toDomain(t))
        : [],
      prices: prisma.prices
        ? prisma.prices.map((p) => PlanPriceMapper.toDomain(p))
        : [],
      features: prisma.features
        ? prisma.features.map((f) => PlanFeatureMapper.toDomain(f))
        : [],
    });
  }

  /**
   * Convert Domain Entity to Prisma Model
   */
  static toPrisma(domain: Plan) {
    return {
      id: domain.id,
      key: domain.key,
      active: domain.active,
      stripeProductId: domain.stripeProductId,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}

/**
 * Plan Translation Mapper
 */
export class PlanTranslationMapper {
  static toDomain(prisma: PrismaTranslation): PlanTranslation {
    return new PlanTranslation({
      id: prisma.id,
      planId: prisma.planId,
      locale: prisma.locale,
      title: prisma.title,
      subtitle: prisma.subtitle,
      description: prisma.description,
    });
  }

  static toPrisma(domain: PlanTranslation) {
    return {
      id: domain.id,
      planId: domain.planId,
      locale: domain.locale,
      title: domain.title,
      subtitle: domain.subtitle,
      description: domain.description,
    };
  }
}
