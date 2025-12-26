import { getTenantBySlug } from "@/app/_actions/tenant";
import {
  findUserByEmailAndTenant,
  createUserForTenant,
} from "@/app/_actions/user";
import { Response } from "@/app/_types/api";
import { ok, fail } from "@/app/_lib";
import { SignInWithTenantInput } from "@/app/_types/dto/tenant";

export async function signInWithTenant({
  user,
  slug,
}: SignInWithTenantInput): Promise<Response<void>> {
  try {
    const tenantRes = await getTenantBySlug(slug);

    if (!tenantRes.success) {
      return fail(tenantRes.errorCode);
    }

    const tenant = tenantRes.data;

    if (!tenant) {
      return fail("TENANT_NOT_FOUND_SIGN_IN_WITH_TENANT");
    }

    const existingUser = await findUserByEmailAndTenant({
      email: user.email,
      tenantId: tenant.id,
    });

    if (!existingUser.success) {
      return createUserForTenant({
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        tenantId: tenant.id,
      });
    }

    return ok(undefined);
  } catch (error) {
    console.error("SIGN_IN_WITH_TENANT_FAILED", error);

    return fail("SIGN_IN_WITH_TENANT_FAILED");
  }
}
