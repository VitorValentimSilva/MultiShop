import { prisma } from "@/app/_lib/prisma";
import { TENANTS } from "@/prisma/seed/data/tenants.data";

export async function seedTenants() {
  console.log("🌱 Seeding tenants...");

  for (const tenantData of TENANTS) {
    const plan = tenantData.planKey
      ? await prisma.plan.findUnique({ where: { key: tenantData.planKey } })
      : null;

    await prisma.tenant.upsert({
      where: { slug: tenantData.slug },
      update: {
        name: tenantData.name,
        isActive: tenantData.isActive,
        stripeCustomerId: tenantData.stripeCustomerId,
        stripeSubscriptionId: tenantData.stripeSubscriptionId,
        subscriptionStatus: tenantData.subscriptionStatus,
        planId: plan?.id ?? null,
      },
      create: {
        slug: tenantData.slug,
        name: tenantData.name,
        isActive: tenantData.isActive,
        stripeCustomerId: tenantData.stripeCustomerId,
        stripeSubscriptionId: tenantData.stripeSubscriptionId,
        subscriptionStatus: tenantData.subscriptionStatus,
        planId: plan?.id ?? null,
      },
    });
  }

  console.log("✅ Tenants seed completed.");

  const mainTenant = await prisma.tenant.findUnique({
    where: { slug: "multishop" },
  });

  if (!mainTenant) {
    throw new Error("Main tenant 'multishop' not found after seeding");
  }

  return mainTenant;
}
