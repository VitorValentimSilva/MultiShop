import { prisma } from "@/app/_lib/prisma";

export async function seedUsers(tenantId: string, roleId: string) {
  const user = await prisma.user.upsert({
    where: {
      email_tenantId: {
        email: "admin@admin.com",
        tenantId,
      },
    },
    update: {},
    create: {
      email: "admin@admin.com",
      name: "Admin",
      tenantId,
    },
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: user.id,
        roleId,
      },
    },
    update: {},
    create: {
      userId: user.id,
      roleId,
    },
  });
}
