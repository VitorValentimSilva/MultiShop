import NextAuth from "next-auth";
import { authOptions } from "@/app/_lib/auth";

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
