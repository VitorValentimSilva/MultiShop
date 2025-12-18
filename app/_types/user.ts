import { Tenant } from "@/app/_types/tenant";
import { UserRole } from "@/app/_types/userRole";

export interface User {
  id: string;
  email: string;
  name?: string;
  tenantId: Tenant["id"];
  tenant?: Tenant;
  roles?: UserRole[];
}
