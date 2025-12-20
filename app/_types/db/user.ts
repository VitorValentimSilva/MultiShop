import { Tenant, UserRole, Account, Session } from "@/app/_types/db";

export interface User {
  id: string;
  name?: string | null;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  passwordHash?: string | null;
  tenantId: Tenant["id"];
  tenant: Tenant;
  roles: UserRole[];
  accounts: Account[];
  sessions: Session[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
