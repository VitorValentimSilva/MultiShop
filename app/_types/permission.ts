import { RolePermission } from "@/app/_types/rolePermission";

export interface Permission {
  id: string;
  key: string;
  label: string;
  roles: RolePermission[];
}
