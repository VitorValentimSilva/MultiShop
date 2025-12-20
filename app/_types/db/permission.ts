import { RolePermission } from "@/app/_types/db";

export interface Permission {
  id: string;
  key: string;
  label: string;
  roles: RolePermission[];
  createdAt: Date;
  updatedAt: Date;
}
