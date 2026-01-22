import { createLogger } from "@/core/lib";
import { prismaSeedClient } from "@/core/database/prisma-seed-client";
import { TENANTS } from "@/seed/data";

const log = createLogger({ scope: "seed", seed: "tenants" });

// * Extracts unique plan keys from tenant seed data
function extractPlanKeys() {
  return Array.from(
    new Set(TENANTS.map((t) => t.planKey).filter(Boolean))
  ) as string[];
}

// * Loads all referenced plans and maps them by key
async function getPlanByKeyMap() {
  const planKeys = extractPlanKeys();

  if (planKeys.length === 0) {
    return new Map<string, string>();
  }

  const plans = await prismaSeedClient.plan.findMany({
    where: { key: { in: planKeys } },
    select: { id: true, key: true },
  });

  return new Map(plans.map((p) => [p.key, p.id]));
}

// * Resolves a plan ID from the map
function resolvePlanId(
  planByKey: ReadonlyMap<string, string>,
  planKey?: string | null
) {
  return planKey ? (planByKey.get(planKey) ?? null) : null;
}

function shouldValidatePlan(planKey?: string | null): boolean {
  return Boolean(planKey);
}

function throwIfMissingPlan(planId: string | null, planKey: string): string {
  if (!planId) {
    throw new Error(`Plan '${planKey}' not found. Did you seed plans first?`);
  }

  return planId;
}

// * Ensures a plan exists when a plan key is provided
// ! Throws an error if the plan was not seeded
function ensurePlanIdOrThrow(
  planId: string | null,
  planKey?: string | null
): string | null {
  return shouldValidatePlan(planKey)
    ? throwIfMissingPlan(planId, planKey!)
    : null;
}

// * Resolves and validates a plan ID
async function getPlanIdOrThrow(
  planByKey: ReadonlyMap<string, string>,
  planKey?: string | null
) {
  const planId = resolvePlanId(planByKey, planKey);
  return ensurePlanIdOrThrow(planId, planKey);
}

// * Creates or updates a tenant and its subscription data
async function upsertTenant(
  planByKey: ReadonlyMap<string, string>,
  tenantData: (typeof TENANTS)[number]
) {
  const planId = await getPlanIdOrThrow(planByKey, tenantData.planKey);

  await prismaSeedClient.tenant.upsert({
    where: { slug: tenantData.slug },
    update: {
      name: tenantData.name,
      isActive: tenantData.isActive,
      stripeCustomerId: tenantData.stripeCustomerId,
      stripeSubscriptionId: tenantData.stripeSubscriptionId,
      subscriptionStatus: tenantData.subscriptionStatus,
      planId,
    },
    create: {
      slug: tenantData.slug,
      name: tenantData.name,
      isActive: tenantData.isActive,
      stripeCustomerId: tenantData.stripeCustomerId,
      stripeSubscriptionId: tenantData.stripeSubscriptionId,
      subscriptionStatus: tenantData.subscriptionStatus,
      planId,
    },
  });
}

// * Seeds all tenants defined in static data
async function seedAllTenants(planByKey: ReadonlyMap<string, string>) {
  for (const tenantData of TENANTS) {
    await upsertTenant(planByKey, tenantData);
  }
}

// * Retrieves the main tenant used by the platform
// ! Throws if the main tenant was not created
async function getMainTenantOrThrow() {
  const mainTenant = await prismaSeedClient.tenant.findUnique({
    where: { slug: "multishop" },
  });

  if (!mainTenant) {
    throw new Error("Main tenant 'multishop' not found after seeding");
  }

  return mainTenant;
}

// * Entry point for tenants seeding
export async function seedTenants() {
  log.warn("🌱 Seeding tenants...");

  const planByKey = await getPlanByKeyMap();

  await seedAllTenants(planByKey);

  const mainTenant = await getMainTenantOrThrow();

  log.warn("✅ Tenants seed completed.");

  return mainTenant;
}
