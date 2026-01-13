import { Role } from "@/app/_types/db";

export interface RoleTranslation {
  id: string;
  locale: string;
  name: string;
  description?: string | null;
  roleId: Role["id"];
  role: Role;
}

export interface RoleTranslationWithoutRelations {
  id: string;
  locale: string;
  name: string;
  description?: string | null;
  roleId: Role["id"];
}
