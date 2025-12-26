"use server";

import { prisma, ok, fail } from "@/app/_lib";
import { Response } from "@/app/_types/api";
import { Tenant } from "@/app/_types/db";

export async function getTenantBySlug(
  slug: Tenant["slug"],
): Promise<Response<Tenant>> {
  try {
    if (!slug) {
      return fail("SLUG_REQUIRED_GET_TENANT_BY_SLUG");
    }

    const tenant = await prisma.tenant.findFirst({
      where: {
        slug,
        isActive: true,
      },
      select: {
        id: true,
        slug: true,
        name: true,
      },
    });

    if (!tenant) {
      return fail("TENANT_NOT_FOUND_GET_TENANT_BY_SLUG");
    }

    return ok(tenant as Tenant);
  } catch (error) {
    console.error("GET_TENANT_BY_SLUG_FAILED", error);

    return fail("GET_TENANT_BY_SLUG_FAILED");
  }
}
