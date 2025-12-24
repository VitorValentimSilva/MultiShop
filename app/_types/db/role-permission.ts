import { Role, Permission } from "@/app/_types/db";

export interface RolePermission {
  roleId: Role["id"];
  permissionId: Permission["id"];
  role: Role;
  permission: Permission;
}

export interface RolePermissionWithoutRelations {
  roleId: Role["id"];
  permissionId: Permission["id"];
}
