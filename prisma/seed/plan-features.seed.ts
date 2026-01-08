import { prisma } from "@/app/_lib/prisma";
import { PLAN_FEATURES } from "@/prisma/seed/data";

export async function seedPlanFeatures() {
  console.log("🌱 Seeding plan features...");

  for (const pf of PLAN_FEATURES) {
    const plan = await prisma.plan.findUnique({ where: { key: pf.planKey } });

    if (!plan) {
      console.warn(
        `⚠️  Plan '${pf.planKey}' not found, skipping feature ${pf.featureKey}`,
      );
      continue;
    }

    const feature = await prisma.feature.findUnique({
      where: { key: pf.featureKey },
    });
    if (!feature) {
      console.warn(`⚠️  Feature '${pf.featureKey}' not found, skipping`);
      continue;
    }

    await prisma.planFeature.upsert({
      where: { planId_featureId: { planId: plan.id, featureId: feature.id } },
      update: {
        included: pf.included,
        limitValue: pf.limitValue,
        limitUnit: pf.limitUnit,
        note: pf.note,
      },
      create: {
        planId: plan.id,
        featureId: feature.id,
        included: pf.included,
        limitValue: pf.limitValue,
        limitUnit: pf.limitUnit,
        note: pf.note,
      },
    });
  }
  console.log("✅ PlanFeature seed completed.");
}
