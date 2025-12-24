"use server";

import { prisma, ok, fail } from "@/app/_lib";
import { Response } from "@/app/_types/api";
import {
  GetSessionUserInput,
  GetSessionUserResult,
} from "@/app/_types/dto/user";

export async function getSessionUser(
  input: GetSessionUserInput,
): Promise<Response<GetSessionUserResult>> {
  try {
    if (!input) {
      return fail("INPUT_REQUIRED_GET_SESSION_USER");
    }

    const user = await prisma.user.findUnique({
      where: { id: input.userId },
      include: {
        tenant: true,
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: { permission: true },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      return fail("USER_NOT_FOUND_GET_SESSION_USER");
    }

    const result: GetSessionUserResult = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      tenant: {
        id: user.tenant.id,
        slug: user.tenant.slug,
        name: user.tenant.name,
      },
      roles: user.roles.map((r) => r.role.name),
      permissions: user.roles.flatMap((r) =>
        r.role.permissions.map((p) => p.permission.key),
      ),
    };

    if (!result) {
      return fail("RESULT_NOT_FOUND_GET_SESSION_USER");
    }

    return ok(result);
  } catch (error) {
    console.error("GET_SESSION_USER_FAILED", error);

    return fail("GET_SESSION_USER_FAILED");
  }
}
