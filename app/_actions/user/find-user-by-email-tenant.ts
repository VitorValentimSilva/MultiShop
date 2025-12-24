"use server";

import { prisma, ok, fail } from "@/app/_lib";
import { Response } from "@/app/_types/api";
import {
  FindUserByEmailAndTenantInput,
  FindUserByEmailAndTenantResult,
} from "@/app/_types/dto/user";

export async function findUserByEmailAndTenant(
  input: FindUserByEmailAndTenantInput,
): Promise<Response<FindUserByEmailAndTenantResult>> {
  try {
    if (!input) {
      return fail("INPUT_REQUIRED_FIND_USER_BY_EMAIL_AND_TENANT");
    }

    const user = await prisma.user.findUnique({
      where: {
        email_tenantId: { email: input.email, tenantId: input.tenantId },
      },
      select: { id: true },
    });

    if (!user) {
      return fail("USER_NOT_FOUND_FIND_USER_BY_EMAIL_AND_TENANT");
    }

    return ok(user);
  } catch (error) {
    console.error("FIND_USER_BY_EMAIL_AND_TENANT_FAILED", error);

    return fail("FIND_USER_BY_EMAIL_AND_TENANT_FAILED");
  }
}
