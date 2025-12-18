import { Tenant } from "@/app/_types/db/tenant";
import { UserRole } from "@/app/_types/db/userRole";
import { RolePermission } from "@/app/_types/db/rolePermission";

export interface Role {
  id: string;
  name: string;
  tenantId: Tenant["id"];
  tenant?: Tenant;
  users?: UserRole[];
  permissions?: RolePermission[];
}
