import { Tenant } from "@/app/_types/tenant";
import { UserRole } from "@/app/_types/userRole";
import { RolePermission } from "@/app/_types/rolePermission";

export interface Role {
  id: string;
  name: string;
  tenantId: Tenant["id"];
  tenant?: Tenant;
  users?: UserRole[];
  permissions?: RolePermission[];
}
