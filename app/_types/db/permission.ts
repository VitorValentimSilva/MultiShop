import { RolePermission } from "@/app/_types/db/rolePermission";

export interface Permission {
  id: string;
  key: string;
  label: string;
  roles: RolePermission[];
}
