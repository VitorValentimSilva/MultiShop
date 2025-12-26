"use server";

import { prisma, ok, fail } from "@/app/_lib";
import { Response } from "@/app/_types/api";
import { createUserForTenantInput } from "@/app/_types/dto/user";

export async function createUserForTenant(
  data: createUserForTenantInput,
): Promise<Response<void>> {
  try {
    if (!data) {
      return fail("DATA_REQUIRED_CREATE_USER_FOR_TENANT");
    }

    await prisma.user.create({ data });

    return ok(undefined);
  } catch (error) {
    console.error("CREATE_USER_FOR_TENANT_FAILED", error);

    return fail("CREATE_USER_FOR_TENANT_FAILED");
  }
}
