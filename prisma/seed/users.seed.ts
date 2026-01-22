import { createLogger } from "@/core/lib";
import { prismaSeedClient } from "@/core/database/prisma-seed-client";
import { USERS } from "@/seed/data";
import { getTenantOrThrow } from "@/seed/helpers";

const log = createLogger({ scope: "seed", seed: "users" });

// * Retrieves the admin user for a given tenant
// ! Throws an error if the admin user was not created during seeding
async function getAdminUserOrThrow(tenantId: string) {
  const adminUser = await prismaSeedClient.user.findFirst({
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

// * Finds a tenant by its slug
async function getUserTenantBySlug(slug: string) {
  return prismaSeedClient.tenant.findUnique({
    where: { slug },
  });
}

// * Creates or updates a user scoped to a tenant
// * Uses a composite unique key (email + tenantId)
async function upsertUser(userData: (typeof USERS)[number], tenantId: string) {
  return prismaSeedClient.user.upsert({
    where: {
      email_tenantId: {
        email: userData.email,
        tenantId,
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
      tenantId,
    },
  });
}

// * In-memory cache for roles per tenant
// * Avoids querying roles repeatedly during user seeding
const rolesByTenantIdCache = new Map<string, Map<string, { id: string }>>();

// * Loads all roles for a tenant and indexes them by name
async function getRolesByNameForTenant(tenantId: string) {
  const cached = rolesByTenantIdCache.get(tenantId);
  if (cached) {
    return cached;
  }

  const roles = await prismaSeedClient.role.findMany({
    where: { tenantId },
    select: { id: true, name: true },
  });

  const map = new Map(roles.map((r) => [r.name, { id: r.id }]));
  rolesByTenantIdCache.set(tenantId, map);

  return map;
}

// * Assigns roles to a user
// * Skips roles that do not exist for the tenant
async function assignUserRoles(
  userId: string,
  roleNames: readonly string[],
  tenantId: string,
  userEmail: string
) {
  const roleByName = await getRolesByNameForTenant(tenantId);

  for (const roleName of roleNames) {
    const role = roleByName.get(roleName);

    if (!role) {
      log.warn(`⚠️  Role '${roleName}' not found for user ${userEmail}`);
      continue;
    }

    await prismaSeedClient.userRole.upsert({
      where: {
        userId_roleId: {
          userId,
          roleId: role.id,
        },
      },
      update: {},
      create: {
        userId,
        roleId: role.id,
      },
    });
  }
}

// * Seeds a single user
// * Resolves tenant, upsert user, and assigns roles
async function seedSingleUser(userData: (typeof USERS)[number]) {
  const userTenant = await getUserTenantBySlug(userData.tenantSlug);

  if (!userTenant) {
    log.warn(
      `⚠️  Tenant '${userData.tenantSlug}' not found, skipping user ${userData.email}`
    );
    return;
  }

  const user = await upsertUser(userData, userTenant.id);

  await assignUserRoles(user.id, userData.roles, userTenant.id, userData.email);
}

// * Seeds all users defined in static data
async function seedAllUsers() {
  for (const userData of USERS) {
    await seedSingleUser(userData);
  }
}

// * Entry point for users seeding
// * Validates tenant existence and ensures admin user creation
export async function seedUsers(tenantId: string) {
  log.warn("🌱 Seeding users...");

  await getTenantOrThrow(tenantId);

  await seedAllUsers();

  const adminUser = await getAdminUserOrThrow(tenantId);

  log.warn("✅ Users seed completed.");

  return adminUser;
}
