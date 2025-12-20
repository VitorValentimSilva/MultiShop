import { Tenant, User } from "@/app/_types/db";

export interface Session {
  id: string;
  sessionToken: string;
  userId: User["id"];
  tenantId: Tenant["id"];
  expires: Date;
  user: User;
  tenant: Tenant;
}
