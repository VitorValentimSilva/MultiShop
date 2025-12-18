import { Role } from "@/app/_types/db/role";
import { Permission } from "@/app/_types/db/permission";

export interface RolePermission {
  roleId: Role["id"];
  permissionId: Permission["id"];
  role?: Role;
  permission?: Permission;
}
