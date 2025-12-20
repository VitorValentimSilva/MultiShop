import { User, Role, Account, Session } from "@/app/_types/db";

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  isActive: boolean;
  users: User[];
  roles: Role[];
  accounts: Account[];
  sessions: Session[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
