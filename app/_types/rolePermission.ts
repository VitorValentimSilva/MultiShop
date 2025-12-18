import { Role } from "@/app/_types/role";
import { Permission } from "@/app/_types/permission";

export interface RolePermission {
  roleId: Role["id"];
  permissionId: Permission["id"];
  role?: Role;
  permission?: Permission;
}
