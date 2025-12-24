import { cookies } from "next/headers";
import { getTenantBySlug } from "@/app/_actions/tenant";
import { Tenant } from "@/app/_types/db";
import { TenantError } from "@/app/_errors";

export async function getTenantFromCookie(): Promise<Tenant> {
  try {
    const slug = (await cookies()).get("tenant")?.value;

    if (!slug) {
      throw new TenantError("TENANT_COOKIE_NOT_FOUND");
    }

    const tenantRes = await getTenantBySlug(slug);

    if (!tenantRes.success) {
      throw new Error(tenantRes.errorCode);
    }

    return tenantRes.data;
  } catch (error) {
    console.warn("GET_TENANT_FROM_COOKIE_FAILED", error);

    throw new TenantError("GET_TENANT_FROM_COOKIE_FAILED", 500, error);
  }
}
