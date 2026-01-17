import { PlanPrice as PrismaPlanPrice } from "@/app/generated/prisma/client";
import { PlanPrice } from "../../domain/entities/plan-price.entity";
import { Price } from "../../domain/value-objects/price.value-object";
import { BillingInterval } from "../../domain/value-objects/billing-interval.value-object";

/**
 * Plan Price Mapper
 *
 * Converts between Prisma PlanPrice and domain entity.
 */
export class PlanPriceMapper {
  /**
   * Convert Prisma PlanPrice to Domain Entity
   */
  static toDomain(prisma: PrismaPlanPrice): PlanPrice {
    return new PlanPrice({
      id: prisma.id,
      planId: prisma.planId,
      price: Price.fromCents(prisma.amountCents, prisma.currency),
      interval: prisma.interval as BillingInterval,
      stripePriceId: prisma.stripePriceId,
      active: prisma.active,
    });
  }

  /**
   * Convert Domain Entity to Prisma Model
   */
  static toPrisma(domain: PlanPrice) {
    return {
      id: domain.id,
      planId: domain.planId,
      amountCents: domain.price.amountCents,
      currency: domain.price.currency,
      interval: domain.interval,
      stripePriceId: domain.stripePriceId,
      active: domain.active,
    };
  }
}
