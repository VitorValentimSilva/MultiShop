import { Tenant, User, UserRole } from "@/app/_types/db";

export interface GetSessionUserInput {
  userId: User["id"];
}

export interface GetSessionUserResult {
  id: User["id"];
  name?: User["name"] | null;
  email: User["email"];
  image?: User["image"] | null;
  tenant: {
    id: Tenant["id"];
    slug: Tenant["slug"];
    name: Tenant["name"];
  };
  roles: UserRole["role"]["name"][];
  permissions: UserRole["role"]["permissions"][number]["permission"]["key"][];
}
