import { createLogger } from "@/core/lib";
import { prismaSeedClient } from "@/core/database/prisma-seed-client";
import { PLAN_FEATURES } from "@/seed/data";

const log = createLogger({ scope: "seed", seed: "plan-features" });

// * Loads all plans and features from the database
// * Maps them by key for fast lookup during seeding
async function loadPlanAndFeatureMaps() {
  const [plans, features] = await Promise.all([
    prismaSeedClient.plan.findMany({ select: { id: true, key: true } }),
    prismaSeedClient.feature.findMany({ select: { id: true, key: true } }),
  ]);

  return {
    planByKey: new Map(plans.map((p) => [p.key, p.id])),
    featureByKey: new Map(features.map((f) => [f.key, f.id])),
  };
}

// * Resolves plan ID from its key
// ? Returns null when the plan does not exist
function resolvePlanId(
  planByKey: ReadonlyMap<string, string>,
  planKey: string
) {
  return planByKey.get(planKey) ?? null;
}

// * Resolves feature ID from its key
// ? Returns null when the feature does not exist
function resolveFeatureId(
  featureByKey: ReadonlyMap<string, string>,
  featureKey: string
) {
  return featureByKey.get(featureKey) ?? null;
}

// * Creates or updates the relationship between a plan and a feature
// * Uses a composite unique key (planId + featureId)
async function upsertPlanFeature(
  planId: string,
  featureId: string,
  pf: (typeof PLAN_FEATURES)[number]
) {
  await prismaSeedClient.planFeature.upsert({
    where: {
      planId_featureId: { planId, featureId },
    },
    update: {
      included: pf.included,
      limitValue: pf.limitValue,
      limitUnit: pf.limitUnit,
      note: pf.note,
    },
    create: {
      planId,
      featureId,
      included: pf.included,
      limitValue: pf.limitValue,
      limitUnit: pf.limitUnit,
      note: pf.note,
    },
  });
}

// * Seeds a single plan-feature association
// ! Skips gracefully if plan or feature does not exist
async function seedSinglePlanFeature(
  pf: (typeof PLAN_FEATURES)[number],
  planByKey: ReadonlyMap<string, string>,
  featureByKey: ReadonlyMap<string, string>
) {
  const planId = resolvePlanId(planByKey, pf.planKey);
  if (!planId) {
    log.warn(
      `⚠️  Plan '${pf.planKey}' not found, skipping feature ${pf.featureKey}`
    );
    return;
  }

  const featureId = resolveFeatureId(featureByKey, pf.featureKey);
  if (!featureId) {
    log.warn(`⚠️  Feature '${pf.featureKey}' not found, skipping`);
    return;
  }

  await upsertPlanFeature(planId, featureId, pf);
}

// * Seeds all plan-feature relationships defined in static data
async function seedAllPlanFeatures(
  planByKey: ReadonlyMap<string, string>,
  featureByKey: ReadonlyMap<string, string>
) {
  for (const pf of PLAN_FEATURES) {
    await seedSinglePlanFeature(pf, planByKey, featureByKey);
  }
}

// * Entry point for PlanFeature seeding
// * Links plans to features with limits and inclusion rules
export async function seedPlanFeatures() {
  log.info("🌱 Seeding plan features...");

  const { planByKey, featureByKey } = await loadPlanAndFeatureMaps();

  await seedAllPlanFeatures(planByKey, featureByKey);

  log.info("✅ PlanFeature seed completed.");
}
