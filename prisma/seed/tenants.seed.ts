import { prisma } from "@/app/_lib/prisma";

export async function seedTenants() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: "default" },
    update: {},
    create: {
      slug: "default",
      name: "Tenant Default",
      isActive: true,
    },
  });

  return tenant;
}
