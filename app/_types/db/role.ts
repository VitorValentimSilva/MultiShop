import { Tenant, UserRole, RolePermission } from "@/app/_types/db/";

export interface Role {
  id: string;
  name: string;
  tenantId: Tenant["id"];
  tenant: Tenant;
  permissions: RolePermission[];
  users: UserRole[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
