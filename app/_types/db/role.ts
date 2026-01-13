import {
  Tenant,
  UserRole,
  RolePermission,
  RoleTranslation,
} from "@/app/_types/db/";

export interface Role {
  id: string;
  name: string;
  tenantId: Tenant["id"];
  tenant: Tenant;
  translations: RoleTranslation[];
  permissions: RolePermission[];
  users: UserRole[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface RoleWithoutRelations {
  id: string;
  name: string;
  tenantId: Tenant["id"];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
