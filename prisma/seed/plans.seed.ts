import { createLogger } from "@/core/lib";
import { prismaSeedClient } from "@/core/database/prisma-seed-client";
import { BillingInterval } from "@/app/generated/prisma/enums";
import { PLANS } from "@/seed/data";

const log = createLogger({ scope: "seed", seed: "plans" });

// * Seeds all subscription plans, their prices and translations
// * Uses upsert to ensure idempotent execution
export async function seedPlans() {
  log.info("🌱 Seeding plans...");

  for (const p of PLANS) {
    // * Create or update the plan using its unique key
    const plan = await prismaSeedClient.plan.upsert({
      where: { key: p.key },
      update: {
        active: p.active,
        stripeProductId: p.stripeProductId,
      },
      create: {
        key: p.key,
        active: p.active,
        stripeProductId: p.stripeProductId,
      },
    });

    // * Upsert all prices associated with the plan
    // * Uses a composite unique key (planId + currency + interval)
    for (const price of p.prices) {
      await prismaSeedClient.planPrice.upsert({
        where: {
          planId_currency_interval: {
            planId: plan.id,
            currency: price.currency,
            interval: price.interval as BillingInterval,
          },
        },
        update: {
          amountCents: price.amountCents,
          stripePriceId: price.stripePriceId,
          active: price.active,
        },
        create: {
          planId: plan.id,
          currency: price.currency,
          interval: price.interval as BillingInterval,
          amountCents: price.amountCents,
          stripePriceId: price.stripePriceId,
          active: price.active,
        },
      });
    }

    // * Upsert plan translations for each locale
    for (const [locale, tr] of Object.entries(p.translations)) {
      await prismaSeedClient.planTranslation.upsert({
        where: {
          // * Composite unique constraint: (planId + locale)
          planId_locale: {
            planId: plan.id,
            locale,
          },
        },
        update: {
          title: tr.title,
          subtitle: tr.subtitle ?? null,
          description: tr.description ?? null,
        },
        create: {
          planId: plan.id,
          locale,
          title: tr.title,
          subtitle: tr.subtitle ?? null,
          description: tr.description ?? null,
        },
      });
    }
  }

  log.info("✅ Plans seed completed.");
}
