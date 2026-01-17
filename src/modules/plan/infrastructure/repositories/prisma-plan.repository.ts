import { prisma } from "@/shared/lib/database";
import { Plan } from "../../domain/entities/plan.entity";
import { IPlanRepository } from "../../domain/repositories/plan.repository.interface";
import { PlanMapper } from "../mappers/plan.mapper";
import { PlanPriceMapper } from "../mappers/plan-price.mapper";
import { PlanFeatureMapper } from "../mappers/plan-feature.mapper";
import { PlanTranslationMapper } from "../mappers/plan.mapper";
import { InfrastructureError } from "@/shared/errors";

/**
 * Prisma Plan Repository
 *
 * Implementation of IPlanRepository using Prisma ORM.
 */
export class PrismaPlanRepository implements IPlanRepository {
  /**
   * Find a plan by ID
   */
  async findById(id: string, locale?: string): Promise<Plan | null> {
    try {
      const plan = await prisma.plan.findUnique({
        where: { id },
        include: {
          translations: locale ? { where: { locale } } : true,
          prices: true,
          features: true,
        },
      });

      return plan ? PlanMapper.toDomain(plan) : null;
    } catch (error) {
      throw new InfrastructureError("DATABASE_ERROR", 503, { error }, error);
    }
  }

  /**
   * Find a plan by key
   */
  async findByKey(key: string, locale?: string): Promise<Plan | null> {
    try {
      const plan = await prisma.plan.findUnique({
        where: { key },
        include: {
          translations: locale ? { where: { locale } } : true,
          prices: true,
          features: true,
        },
      });

      return plan ? PlanMapper.toDomain(plan) : null;
    } catch (error) {
      throw new InfrastructureError("DATABASE_ERROR", 503, { error }, error);
    }
  }

  /**
   * Find all plans
   */
  async findAll(locale?: string): Promise<Plan[]> {
    try {
      const plans = await prisma.plan.findMany({
        include: {
          translations: locale ? { where: { locale } } : true,
          prices: true,
          features: true,
        },
        orderBy: { createdAt: "desc" },
      });

      return plans.map((plan) => PlanMapper.toDomain(plan));
    } catch (error) {
      throw new InfrastructureError("DATABASE_ERROR", 503, { error }, error);
    }
  }

  /**
   * Find all active plans
   */
  async findAllActive(locale?: string): Promise<Plan[]> {
    try {
      const plans = await prisma.plan.findMany({
        where: { active: true },
        include: {
          translations: locale ? { where: { locale } } : true,
          prices: { where: { active: true } },
          features: true,
        },
        orderBy: { createdAt: "desc" },
      });

      return plans.map((plan) => PlanMapper.toDomain(plan));
    } catch (error) {
      throw new InfrastructureError("DATABASE_ERROR", 503, { error }, error);
    }
  }

  /**
   * Create a new plan
   */
  async create(plan: Plan): Promise<Plan> {
    try {
      const created = await prisma.plan.create({
        data: {
          ...PlanMapper.toPrisma(plan),
          translations: {
            create: plan.translations.map((t) =>
              PlanTranslationMapper.toPrisma(t),
            ),
          },
          prices: {
            create: plan.prices.map((p) => PlanPriceMapper.toPrisma(p)),
          },
          features: {
            create: plan.features.map((f) => PlanFeatureMapper.toPrisma(f)),
          },
        },
        include: {
          translations: true,
          prices: true,
          features: true,
        },
      });

      return PlanMapper.toDomain(created);
    } catch (error) {
      throw new InfrastructureError("DATABASE_ERROR", 503, { error }, error);
    }
  }

  /**
   * Update an existing plan
   */
  async update(plan: Plan): Promise<Plan> {
    try {
      // Delete existing relations
      await prisma.$transaction([
        prisma.planTranslation.deleteMany({ where: { planId: plan.id } }),
        prisma.planPrice.deleteMany({ where: { planId: plan.id } }),
        prisma.planFeature.deleteMany({ where: { planId: plan.id } }),
      ]);

      // Update plan with new relations
      const updated = await prisma.plan.update({
        where: { id: plan.id },
        data: {
          ...PlanMapper.toPrisma(plan),
          translations: {
            create: plan.translations.map((t) =>
              PlanTranslationMapper.toPrisma(t),
            ),
          },
          prices: {
            create: plan.prices.map((p) => PlanPriceMapper.toPrisma(p)),
          },
          features: {
            create: plan.features.map((f) => PlanFeatureMapper.toPrisma(f)),
          },
        },
        include: {
          translations: true,
          prices: true,
          features: true,
        },
      });

      return PlanMapper.toDomain(updated);
    } catch (error) {
      throw new InfrastructureError("DATABASE_ERROR", 503, { error }, error);
    }
  }

  /**
   * Delete a plan
   */
  async delete(id: string): Promise<void> {
    try {
      await prisma.plan.delete({ where: { id } });
    } catch (error) {
      throw new InfrastructureError("DATABASE_ERROR", 503, { error }, error);
    }
  }

  /**
   * Check if a plan exists
   */
  async exists(id: string): Promise<boolean> {
    try {
      const count = await prisma.plan.count({ where: { id } });
      return count > 0;
    } catch (error) {
      throw new InfrastructureError("DATABASE_ERROR", 503, { error }, error);
    }
  }

  /**
   * Check if a plan key is available
   */
  async isKeyAvailable(key: string, excludeId?: string): Promise<boolean> {
    try {
      const count = await prisma.plan.count({
        where: {
          key,
          ...(excludeId && { id: { not: excludeId } }),
        },
      });
      return count === 0;
    } catch (error) {
      throw new InfrastructureError("DATABASE_ERROR", 503, { error }, error);
    }
  }
}
