"use server";

import { prisma } from "@/app/_lib/prisma";
import { Tenant } from "@/app/_types/db";
import { Response } from "@/app/_types/api";
import { ok, fail } from "@/app/_lib/response";

export async function getTenantBySlug(slug: string): Promise<Response<Tenant>> {
  if (!slug) {
    return fail("tenant.errors.slugRequired");
  }

  try {
    const tenant = await prisma.tenant.findUnique({
      where: {
        slug,
        isActive: true,
      },
      select: {
        id: true,
        slug: true,
        name: true,
        users: true,
        roles: true,
      },
    });

    if (!tenant) {
      return fail("tenant.notFound");
    }

    return ok(tenant as Tenant);
  } catch (error) {
    console.error("Erro ao buscar tenant:", error);
    return fail("common.errors.internal");
  }
}
