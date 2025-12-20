import type { NextAuthConfig } from "next-auth";
import { signInWithTenant, getTenantFromCookie } from "@/app/_actions/auth";
import { getSessionUser } from "@/app/_actions/user";

export const authCallbacks: NextAuthConfig["callbacks"] = {
  async signIn({ user, account }) {
    if (!user?.id || !account) return false;

    const oauthProviders = ["google", "github"];

    if (oauthProviders.includes(account.provider)) {
      const tenant = await getTenantFromCookie();

      if (!tenant || !tenant.slug) return false;

      const result = await signInWithTenant({
        user: {
          id: user.id,
          email: user.email!,
          name: user.name,
          image: user.image,
        },
        slug: tenant.slug,
      });

      return result.success;
    }

    if (account.provider === "credentials") {
      return true;
    }

    return false;
  },

  async session({ session, token }) {
    if (!session.user || !token?.sub) return session;

    const res = await getSessionUser({ userId: token.sub });

    if (!res.success) return session;

    session.user = res.data as never;
    return session;
  },
};
