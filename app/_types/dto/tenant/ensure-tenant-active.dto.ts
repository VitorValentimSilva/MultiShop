import { Tenant } from "@/app/_types/db";

export interface EnsureTenantActiveInput {
  slug?: Tenant["slug"] | null;
  id?: Tenant["id"] | null;
}

export interface EnsureTenantActiveResult {
  id: Tenant["id"];
  slug: Tenant["slug"];
  name: Tenant["name"];
}
