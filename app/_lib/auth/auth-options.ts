import type { NextAuthConfig } from "next-auth";
import {
  googleProvider,
  githubProvider,
  credentialsProvider,
} from "@/app/_lib/auth/providers";
import { PrismaMultiTenantAdapter, authCallbacks } from "@/app/_lib/auth";
import { MainError } from "@/app/_errors";

export const authOptions: NextAuthConfig = {
  adapter: PrismaMultiTenantAdapter(),

  providers: [googleProvider, githubProvider, credentialsProvider],

  session: {
    strategy: "database",
  },

  callbacks: authCallbacks,

  logger: {
    error(error) {
      if (error instanceof MainError) {
        console.error(`AUTH_ERROR [${error.code}]:`, error);
      } else {
        console.error("AUTH_ERROR:", error);
      }
    },
  },
};
