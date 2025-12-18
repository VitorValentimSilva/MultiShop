import { User } from "@/app/_types/user";
import { Role } from "@/app/_types/role";

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  isActive: boolean;
  users?: User[];
  roles?: Role[];
}
