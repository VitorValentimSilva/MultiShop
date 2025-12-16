import { prisma } from "@/app/_lib/prisma";

export async function seedRoles(tenantId: string) {
  const adminRole = await prisma.role.upsert({
    where: {
      name_tenantId: {
        name: "Admin",
        tenantId,
      },
    },
    update: {},
    create: {
      name: "Admin",
      tenantId,
    },
  });

  const permissions = await prisma.permission.findMany();

  for (const permission of permissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: permission.id,
      },
    });
  }

  return adminRole;
}
