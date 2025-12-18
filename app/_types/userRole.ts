import { Role } from "@/app/_types/role";
import { User } from "@/app/_types/user";

export interface UserRole {
  userId: User["id"];
  roleId: Role["id"];
  user?: User;
  role?: Role;
}
