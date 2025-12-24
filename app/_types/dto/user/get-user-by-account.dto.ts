import { Account } from "@/app/_types/db";

export interface GetUserByAccountInput {
  provider: Account["provider"];
  providerAccountId: Account["providerAccountId"];
}
