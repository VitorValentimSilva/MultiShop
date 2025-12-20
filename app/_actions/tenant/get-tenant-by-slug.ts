"use server";

import { prisma } from "@/app/_lib/prisma";
import { Response } from "@/app/_types/api";
import { ok, fail } from "@/app/_lib/response";
import { Tenant } from "@/app/_types/db";

export async function getTenantBySlug(
  slug: Tenant["slug"],
): Promise<Response<Tenant>> {
  if (!slug) {
    return fail("tenant.errors.slugRequired");
  }

  try {
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
      return fail("tenant.notFound");
    }

    return ok(tenant as Tenant);
  } catch (error) {
    console.error(error);
    return fail("common.errors.internal");
  }
}
