"use server";

import { prisma } from "@/app/_lib/prisma";
import { ok, fail } from "@/app/_lib/response";
import { Response } from "@/app/_types/api";
import {
  EnsureTenantActiveInput,
  EnsureTenantActiveResult,
} from "@/app/_types/dto/tenant";

export async function ensureTenantActive(
  input: EnsureTenantActiveInput,
): Promise<Response<EnsureTenantActiveResult>> {
  const { slug, id } = input;

  if (!slug && !id) {
    return fail("tenant.errors.identifierRequired");
  }

  try {
    const tenant = await prisma.tenant.findFirst({
      where: {
        ...(slug ? { slug } : {}),
        ...(id ? { id } : {}),
        isActive: true,
      },
      select: {
        id: true,
        slug: true,
        name: true,
      },
    });

    if (!tenant) {
      return fail("tenant.notFoundOrInactive");
    }

    return ok(tenant);
  } catch (error) {
    console.error(error);
    return fail("common.errors.internal");
  }
}
