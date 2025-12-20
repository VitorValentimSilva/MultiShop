import { cookies } from "next/headers";
import { getTenantBySlug } from "@/app/_actions/tenant";
import { Tenant } from "@/app/_types/db";

export async function getTenantFromCookie(): Promise<
  Tenant | undefined | null
> {
  try {
    const slug = (await cookies()).get("tenant")?.value;
    if (!slug) return null;

    const tenantRes = await getTenantBySlug(slug);
    if (!tenantRes.success) return null;

    return tenantRes.data;
  } catch (error) {
    console.warn(error);
    return null;
  }
}
