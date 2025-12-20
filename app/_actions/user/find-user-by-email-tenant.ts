"use server";

import { prisma } from "@/app/_lib/prisma";
import { Response } from "@/app/_types/api";
import { ok, fail } from "@/app/_lib/response";
import {
  FindUserByEmailAndTenantInput,
  FindUserByEmailAndTenantResult,
} from "@/app/_types/dto/user";

export async function findUserByEmailAndTenant(
  input: FindUserByEmailAndTenantInput,
): Promise<Response<FindUserByEmailAndTenantResult>> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email_tenantId: { email: input.email, tenantId: input.tenantId },
      },
      select: { id: true },
    });

    if (!user) {
      return fail("user.notFound");
    }

    return ok(user);
  } catch (error) {
    console.error(error);
    return fail("common.errors.internal");
  }
}
