import { Tenant } from "@/app/_types/db/tenant";
import { UserRole } from "@/app/_types/db/user-role";

export interface User {
  id: string;
  email: string;
  name?: string;
  tenantId: Tenant["id"];
  tenant?: Tenant;
  roles?: UserRole[];
}
