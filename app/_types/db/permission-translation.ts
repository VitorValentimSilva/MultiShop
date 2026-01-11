import { Permission } from "@/app/_types/db";

export interface PermissionTranslation {
  id: string;
  locale: string;
  label: string;
  permissionId: Permission["id"];
  permission: Permission;
}

export interface PermissionTranslationWithoutRelations {
  id: string;
  locale: string;
  label: string;
  permissionId: Permission["id"];
}
