import type { NextAuthConfig } from "next-auth";
import { signInWithTenant, getTenantFromCookie } from "@/app/_actions/auth";
import { getSessionUser } from "@/app/_actions/user";
import {
  AccountError,
  SessionError,
  TenantError,
  UserError,
} from "@/app/_errors";

export const authCallbacks: NextAuthConfig["callbacks"] = {
  async signIn({ user, account }): Promise<boolean> {
    try {
      if (!user?.id) {
        throw new UserError("MISSING_USER_SIGNIN");
      }

      if (!account) {
        throw new AccountError("MISSING_ACCOUNT_SIGNIN");
      }

      const oauthProviders = ["google", "github"];

      if (oauthProviders.includes(account.provider)) {
        const tenant = await getTenantFromCookie();

        if (!tenant || !tenant.slug) {
          throw new TenantError("TENANT_NOT_FOUND_SIGNIN");
        }

        const result = await signInWithTenant({
          user: {
            id: user.id,
            email: user.email!,
            name: user.name,
            image: user.image,
          },
          slug: tenant.slug,
        });

        if (!result.success) {
          throw new Error(result.errorCode);
        }

        return result.success;
      }

      if (account.provider === "credentials") {
        return true;
      }

      return false;
    } catch (error) {
      console.error("SIGNIN_FAILED", error);

      throw new UserError("SIGNIN_FAILED", 500, error);
    }
  },

  async session({ session, token }) {
    try {
      if (!session.user || !token?.sub) {
        return session;
      }

      const res = await getSessionUser({ userId: token.sub });

      if (!res.success) {
        return session;
      }

      session.user = res.data as never;

      return session;
    } catch (error) {
      console.error("SESSION_FAILED", error);

      throw new SessionError("SESSION_FAILED", 500, error);
    }
  },
};
