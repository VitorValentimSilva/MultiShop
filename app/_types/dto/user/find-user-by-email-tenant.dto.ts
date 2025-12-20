import { User, Tenant } from "@/app/_types/db";

export interface FindUserByEmailAndTenantInput {
  email: User["email"];
  tenantId: Tenant["id"];
}

export interface FindUserByEmailAndTenantResult {
  id: User["id"];
}
