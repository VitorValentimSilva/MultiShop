import type { NextAuthConfig } from "next-auth";
import {
  signInWithTenant,
  resolveTenantFromRequest,
} from "@/app/_actions/auth";
import { getSessionUser } from "@/app/_actions/user";

export const authCallbacks: NextAuthConfig["callbacks"] = {
  async signIn({ user, account }) {
    if (!user?.id || !account) return false;

    const oauthProviders = ["google", "github"];

    if (oauthProviders.includes(account.provider)) {
      const tenantSlug = await resolveTenantFromRequest();
      if (!tenantSlug) return false;

      const result = await signInWithTenant({
        user: {
          id: user.id,
          email: user.email!,
          name: user.name,
          image: user.image,
        },
        slug: tenantSlug,
      });

      return result.success;
    }

    if (account.provider === "credentials") {
      return true;
    }

    return false;
  },

  async session({ session, user }) {
    if (!session.user) return session;

    const res = await getSessionUser({ userId: user.id });
    if (!res.success) return session;

    session.user = res.data as never;
    return session;
  },
};
