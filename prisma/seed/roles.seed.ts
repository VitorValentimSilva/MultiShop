import { prisma } from "@/app/_lib/prisma";
import { ROLES } from "@/prisma/seed/data";

export async function seedRoles(tenantId: string) {
  console.log("🌱 Seeding roles...");

  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
  });

  if (!tenant) {
    throw new Error(`Tenant with id ${tenantId} not found`);
  }

  let adminRole;

  for (const roleData of ROLES) {
    const role = await prisma.role.upsert({
      where: {
        name_tenantId: {
          name: roleData.name,
          tenantId,
        },
      },
      update: {},
      create: {
        name: roleData.name,
        tenantId,
      },
    });

    if (roleData.name === "admin") {
      adminRole = role;
    }

    for (const [locale, translation] of Object.entries(roleData.translations)) {
      await prisma.roleTranslation.upsert({
        where: { roleId_locale: { roleId: role.id, locale } },
        update: {
          name: translation.name,
          description: translation.description,
        },
        create: {
          roleId: role.id,
          locale,
          name: translation.name,
          description: translation.description,
        },
      });
    }

    for (const permissionKey of roleData.permissions) {
      const permission = await prisma.permission.findUnique({
        where: { key: permissionKey },
      });

      if (permission) {
        await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: role.id,
              permissionId: permission.id,
            },
          },
          update: {},
          create: {
            roleId: role.id,
            permissionId: permission.id,
          },
        });
      }
    }
  }

  console.log("✅ Roles seed completed.");

  if (!adminRole) {
    throw new Error("Admin role not found after seeding");
  }

  return adminRole;
}
