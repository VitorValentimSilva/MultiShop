import { User, Role, Account, Session, Plan } from "@/app/_types/db";

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  isActive: boolean;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  subscriptionStatus?: string | null;
  planId?: Plan["id"] | null;
  users: User[];
  roles: Role[];
  accounts: Account[];
  sessions: Session[];
  plan?: Plan | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface TenantWithoutRelations {
  id: string;
  slug: string;
  name: string;
  isActive: boolean;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  subscriptionStatus?: string | null;
  planId?: Plan["id"] | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
