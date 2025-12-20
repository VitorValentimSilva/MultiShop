"use server";

import { prisma } from "@/app/_lib/prisma";
import { Response } from "@/app/_types/api";
import { ok, fail } from "@/app/_lib/response";
import { createUserForTenantInput } from "@/app/_types/dto/user";

export async function createUserForTenant(
  data: createUserForTenantInput,
): Promise<Response<void>> {
  try {
    await prisma.user.create({ data });
    return ok(undefined);
  } catch (error) {
    console.error(error);
    return fail("user.createFailed");
  }
}
