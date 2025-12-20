import type { NextAuthConfig } from "next-auth";
import { googleProvider } from "@/app/_lib/auth/providers/google";
import { credentialsProvider } from "@/app/_lib/auth/providers/credentials";
import { githubProvider } from "@/app/_lib/auth/providers/github";
import { authCallbacks } from "@/app/_lib/auth/callbacks";
import { PrismaTenantAdapter } from "@/app/_lib/auth/prisma-tenant-adapter";

export const authOptions: NextAuthConfig = {
  adapter: PrismaTenantAdapter(),

  providers: [googleProvider, githubProvider, credentialsProvider],

  session: {
    strategy: "database",
  },

  callbacks: authCallbacks,
};
