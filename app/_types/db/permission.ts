import { RolePermission } from "@/app/_types/db/role-permission";

export interface Permission {
  id: string;
  key: string;
  label: string;
  roles: RolePermission[];
}
