import { User, Role } from "@/app/_types/db";

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  isActive: boolean;
  users: User[];
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
}
