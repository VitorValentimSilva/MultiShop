import { seedPermissions } from "@/prisma/seed/permissions.seed";
import { seedTenants } from "@/prisma/seed/tenants.seed";
import { seedRoles } from "@/prisma/seed/roles.seed";
import { seedUsers } from "@/prisma/seed/users.seed";
import { seedDomain } from "@/prisma/seed/domain.seed";

export async function runSeeds() {
  await seedPermissions();

  await seedDomain();

  const tenant = await seedTenants();
  const adminRole = await seedRoles(tenant.id);

  await seedUsers(tenant.id, adminRole.id);
}
