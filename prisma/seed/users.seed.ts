import { prisma } from "@/app/_lib/prisma";
import { USERS } from "@/prisma/seed/data/users.data";

export async function seedUsers(tenantId: string) {
  console.log("🌱 Seeding users...");

  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
  });

  if (!tenant) {
    throw new Error(`Tenant with id ${tenantId} not found`);
  }

  for (const userData of USERS) {
    const userTenant = await prisma.tenant.findUnique({
      where: { slug: userData.tenantSlug },
    });

    if (!userTenant) {
      console.warn(
        `⚠️  Tenant '${userData.tenantSlug}' not found, skipping user ${userData.email}`,
      );
      continue;
    }

    const user = await prisma.user.upsert({
      where: {
        email_tenantId: {
          email: userData.email,
          tenantId: userTenant.id,
        },
      },
      update: {
        name: userData.name,
        emailVerified: userData.emailVerified,
        image: userData.image,
      },
      create: {
        email: userData.email,
        name: userData.name,
        emailVerified: userData.emailVerified,
        image: userData.image,
        passwordHash: userData.passwordHash,
        tenantId: userTenant.id,
      },
    });

    for (const roleName of userData.roles) {
      const role = await prisma.role.findUnique({
        where: {
          name_tenantId: {
            name: roleName,
            tenantId: userTenant.id,
          },
        },
      });

      if (role) {
        await prisma.userRole.upsert({
          where: {
            userId_roleId: {
              userId: user.id,
              roleId: role.id,
            },
          },
          update: {},
          create: {
            userId: user.id,
            roleId: role.id,
          },
        });
      } else {
        console.warn(
          `⚠️  Role '${roleName}' not found for user ${userData.email}`,
        );
      }
    }
  }

  console.log("✅ Users seed completed.");

  const adminUser = await prisma.user.findFirst({
    where: {
      email: "admin@multishop.com",
      tenantId,
    },
  });

  if (!adminUser) {
    throw new Error("Admin user not found after seeding");
  }

  return adminUser;
}
