import { Role, User } from "@/app/_types/db";

export interface UserRole {
  userId: User["id"];
  roleId: Role["id"];
  user: User;
  role: Role;
}

export interface UserRoleWithoutRelations {
  userId: User["id"];
  roleId: Role["id"];
}
