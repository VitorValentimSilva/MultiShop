import { User } from "@/app/_types/db/user";
import { Role } from "@/app/_types/db/role";

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  isActive: boolean;
  users?: User[];
  roles?: Role[];
}
