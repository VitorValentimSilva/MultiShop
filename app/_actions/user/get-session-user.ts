"use server";

import { prisma } from "@/app/_lib/prisma";
import { Response } from "@/app/_types/api";
import { ok, fail } from "@/app/_lib/response";
import {
  GetSessionUserInput,
  GetSessionUserResult,
} from "@/app/_types/dto/user";

export async function getSessionUser(
  input: GetSessionUserInput,
): Promise<Response<GetSessionUserResult>> {
  try {
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

    if (!user) return fail("user.notFound");

    return ok({
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
    });
  } catch (error) {
    console.error(error);
    return fail("common.errors.internal");
  }
}
