import { createLogger } from "@/core/lib";
import { prismaSeedClient } from "@/core/database/prisma-seed-client";
import { getTenantOrThrow } from "@/seed/helpers";
import { ROLES } from "@/seed/data";

const log = createLogger({ scope: "seed", seed: "roles" });

// * Ensures that the admin role was created during seeding
// ! Throws an error if the admin role is missing
function ensureAdminRoleOrThrow(adminRole: unknown) {
  if (!adminRole) {
    throw new Error("Admin role not found after seeding");
  }

  return adminRole;
}

// * Creates or updates a role scoped to a tenant
// * Uses a composite unique key (name + tenantId)
async function upsertRole(name: string, tenantId: string) {
  return prismaSeedClient.role.upsert({
    where: {
      name_tenantId: { name, tenantId },
    },
    update: {},
    create: {
      name,
      tenantId,
    },
  });
}

// * Seeds role translations for all locales
async function seedRoleTranslations(
  roleId: string,
  translations: Record<string, { name: string; description: string }>
) {
  for (const [locale, translation] of Object.entries(translations)) {
    await prismaSeedClient.roleTranslation.upsert({
      where: {
        roleId_locale: { roleId, locale },
      },
      update: {
        name: translation.name,
        description: translation.description,
      },
      create: {
        roleId,
        locale,
        name: translation.name,
        description: translation.description,
      },
    });
  }
}

// * Assigns permissions to a role
// * Skips permissions that were not found in the database
async function seedRolePermissions(
  roleId: string,
  permissionByKey: ReadonlyMap<string, { id: string }>,
  permissionKeys: readonly string[]
) {
  for (const permissionKey of permissionKeys) {
    const permission = permissionByKey.get(permissionKey);

    if (!permission) {
      log.warn(`⚠️  Permission '${permissionKey}' not found, skipping`);
      continue;
    }

    await prismaSeedClient.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId,
        permissionId: permission.id,
      },
    });
  }
}

// * Seeds a single role with translations and permissions
// * Returns the admin role if the current role is "admin"
async function seedSingleRole(
  roleData: (typeof ROLES)[number],
  tenantId: string,
  permissionByKey: ReadonlyMap<string, { id: string }>
) {
  const role = await upsertRole(roleData.name, tenantId);

  await seedRoleTranslations(role.id, roleData.translations);
  await seedRolePermissions(role.id, permissionByKey, roleData.permissions);

  return roleData.name === "admin" ? role : null;
}

// * Seeds all roles for a tenant
// * Collects and resolves permissions in advance for performance
async function seedAllRoles(tenantId: string) {
  let adminRole = null;

  const permissionKeys = Array.from(
    new Set(ROLES.flatMap((r) => r.permissions))
  );

  const permissions = await prismaSeedClient.permission.findMany({
    where: { key: { in: permissionKeys } },
    select: { id: true, key: true },
  });

  const permissionByKey = new Map(
    permissions.map((p) => [p.key, { id: p.id }])
  );

  for (const roleData of ROLES) {
    adminRole ??= await seedSingleRole(roleData, tenantId, permissionByKey);
  }

  return adminRole;
}

// * Entry point for roles seeding
// * Validates tenant existence and guarantees admin role creation
export async function seedRoles(tenantId: string) {
  log.warn("🌱 Seeding roles...");

  await getTenantOrThrow(tenantId);

  const adminRole = await seedAllRoles(tenantId);

  const ensuredAdminRole = ensureAdminRoleOrThrow(adminRole);

  log.warn("✅ Roles seed completed.");

  return ensuredAdminRole;
}
