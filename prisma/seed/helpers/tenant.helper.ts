import { prismaSeedClient } from "@/core/database/prisma-seed-client";

// * Fetches a tenant by ID or throws an error if it does not exist
// * Centralizes tenant validation logic to avoid duplication
export async function getTenantOrThrow(tenantId: string) {
  // * Queries the database using Prisma
  // ! Uses findUnique because tenant ID is expected to be unique
  const tenant = await prismaSeedClient.tenant.findUnique({
    where: { id: tenantId },
  });

  // * Fails fast if the tenant does not exist
  // ! Prevents downstream logic from running with invalid tenant data
  if (!tenant) {
    throw new Error(`Tenant with id ${tenantId} not found`);
  }

  // * Returns a valid tenant entity
  return tenant;
}
