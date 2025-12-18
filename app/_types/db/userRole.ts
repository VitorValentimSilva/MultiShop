import { Role } from "@/app/_types/db/role";
import { User } from "@/app/_types/db/user";

export interface UserRole {
  userId: User["id"];
  roleId: Role["id"];
  user?: User;
  role?: Role;
}
