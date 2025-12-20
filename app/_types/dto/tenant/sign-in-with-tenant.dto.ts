import { Tenant, User } from "@/app/_types/db";

export interface SignInWithTenantInput {
  user: {
    id: User["id"];
    email: User["email"];
    name?: User["name"] | null;
    image?: User["image"] | null;
  };
  slug: Tenant["slug"];
}
