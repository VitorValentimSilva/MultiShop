import { Tenant, User } from "@/app/_types/db";

export interface createUserForTenantInput {
  id: User["id"];
  email: User["email"];
  name?: User["name"] | null;
  image?: User["image"] | null;
  tenantId: Tenant["id"];
}
