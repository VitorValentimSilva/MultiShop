import { prisma } from "@/app/_lib/prisma";
import { BillingInterval } from "@/src/app/generated/prisma/enums";
import { PLANS } from "@/prisma/seed/data";

export async function seedPlans() {
  console.log("🌱 Seeding plans...");

  for (const p of PLANS) {
    const plan = await prisma.plan.upsert({
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

    for (const price of p.prices) {
      await prisma.planPrice.upsert({
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

    for (const [locale, tr] of Object.entries(p.translations)) {
      await prisma.planTranslation.upsert({
        where: {
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

  console.log("✅ Plans seed completed.");
}
