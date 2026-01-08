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
} from "@/prisma/seed/index";

export async function runSeeds() {
  await seedPermissions();

  await seedFeatures();
  await seedPlans();
  await seedPlanFeatures();
  await seedReviews();
  await seedDomainMetrics();

  const tenant = await seedTenants();
  await seedRoles(tenant.id);

  await seedUsers(tenant.id);
}
