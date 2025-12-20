import { User } from "@/app/_types/db";

export interface Session {
  id: string;
  sessionToken: string;
  userId: User["id"];
  expires: Date;
  user: User;
}
