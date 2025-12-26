import { prisma } from "@/app/_lib/prisma";

export async function seedTenants() {
  const starterPlan = await prisma.plan.findUnique({
    where: { key: "starter" },
  });

  const tenant = await prisma.tenant.upsert({
    where: { slug: "default" },
    update: {
      planId: starterPlan?.id,
    },
    create: {
      slug: "default",
      name: "Tenant Default",
      isActive: true,
      subscriptionStatus: "active",
      planId: starterPlan?.id,
    },
  });

  return tenant;
}
