import {
  seedPermissions,
  seedFeatures,
  seedPlans,
  seedPlanFeatures,
  seedReviews,
  seedDomainMetrics,
  seedTenants,
  seedRoles,
  seedUsers,
} from "@/seed/index";

// * Runs all seeds in the correct dependency order
// * This function acts as the main seeding pipeline
export async function runSeeds() {
  // * Global / shared data
  await seedPermissions();
  await seedFeatures();
  await seedPlans();
  await seedPlanFeatures();
  await seedReviews();
  await seedDomainMetrics();

  // * Tenant-scoped data
  const tenant = await seedTenants();
  await seedRoles(tenant.id);
  await seedUsers(tenant.id);
}
