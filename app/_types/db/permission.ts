import { RolePermission } from "@/app/_types/db";

export interface Permission {
  id: string;
  key: string;
  label: string;
  roles: RolePermission[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface PermissionWithoutRelations {
  id: string;
  key: string;
  label: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
