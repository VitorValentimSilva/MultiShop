import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/_lib/prisma";
import { googleProvider } from "@/app/_lib/auth/providers/google";
import { credentialsProvider } from "@/app/_lib/auth/providers/credentials";
import { githubProvider } from "@/app/_lib/auth/providers/github";
import { authCallbacks } from "@/app/_lib/auth/callbacks";

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),

  providers: [googleProvider, githubProvider, credentialsProvider],

  session: {
    strategy: "database",
  },

  callbacks: authCallbacks,
};
