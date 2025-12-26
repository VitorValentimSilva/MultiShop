import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/_lib";
import { getTenantFromCookie } from "@/app/_actions/auth";
import {
  AdapterUser,
  AdapterAccount,
  AdapterSession,
} from "next-auth/adapters";
import { User } from "@/app/_types/db";
import { GetUserByAccountInput } from "@/app/_types/dto/user";
import {
  AccountError,
  SessionError,
  TenantError,
  UserError,
} from "@/app/_errors";

export function PrismaMultiTenantAdapter() {
  const base = PrismaAdapter(prisma);

  return {
    ...base,

    async getUserByEmail(email: User["email"]): Promise<AdapterUser> {
      try {
        const tenant = await getTenantFromCookie();

        if (!tenant) {
          throw new TenantError("TENANT_NOT_FOUND_GET_USER_BY_EMAIL");
        }

        const user = await prisma.user.findUnique({
          where: {
            email_tenantId: {
              email,
              tenantId: tenant.id,
            },
          },
        });

        if (!user) {
          throw new UserError("USER_NOT_FOUND_GET_USER_BY_EMAIL");
        }

        return {
          id: user.id,
          name: user.name ?? null,
          email: user.email,
          emailVerified: user.emailVerified ?? null,
          image: user.image ?? null,
        };
      } catch (error) {
        console.error("GET_USER_BY_EMAIL_FAILED", error);

        throw new UserError("GET_USER_BY_EMAIL_FAILED", 500, {
          error,
        });
      }
    },

    async createUser(data: AdapterUser): Promise<AdapterUser> {
      try {
        const tenant = await getTenantFromCookie();

        if (!tenant) {
          throw new TenantError("TENANT_NOT_FOUND_CREATE_USER");
        }

        const user = await prisma.user.create({
          data: {
            id: data.id,
            email: data.email,
            name: data.name,
            image: data.image,
            emailVerified: data.emailVerified,
            tenantId: tenant.id,
          },
        });

        if (!user) {
          throw new UserError("USER_NOT_FOUND_CREATE_USER");
        }

        return {
          id: user.id,
          name: user.name ?? null,
          email: user.email,
          emailVerified: user.emailVerified ?? null,
          image: user.image ?? null,
        };
      } catch (error) {
        console.error("CREATE_USER_FAILED", error);

        throw new UserError("CREATE_USER_FAILED", 500, {
          error,
        });
      }
    },

    async getUserByAccount({
      provider,
      providerAccountId,
    }: GetUserByAccountInput): Promise<AdapterUser | null> {
      try {
        const tenant = await getTenantFromCookie();

        if (!tenant) {
          throw new TenantError("TENANT_NOT_FOUND_GET_USER_BY_ACCOUNT");
        }

        const account = await prisma.account.findUnique({
          where: {
            provider_providerAccountId_tenantId: {
              provider,
              providerAccountId,
              tenantId: tenant.id,
            },
          },
          include: {
            user: true,
          },
        });

        if (!account) {
          return null;
        }

        return {
          id: account.user.id,
          name: account.user.name ?? null,
          email: account.user.email,
          emailVerified: account.user.emailVerified ?? null,
          image: account.user.image ?? null,
        };
      } catch (error) {
        console.error("GET_USER_BY_ACCOUNT_FAILED", error);

        throw new UserError("GET_USER_BY_ACCOUNT_FAILED", 500, {
          error,
        });
      }
    },

    async linkAccount(account: AdapterAccount): Promise<AdapterAccount> {
      try {
        const tenant = await getTenantFromCookie();

        if (!tenant) {
          throw new TenantError("TENANT_NOT_FOUND_LINK_ACCOUNT");
        }

        const accountCreated = await prisma.account.create({
          data: {
            userId: account.userId,
            tenantId: tenant.id,
            type: account.type,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            refresh_token: account.refresh_token,
            access_token: account.access_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
            session_state: String(account.session_state),
          },
        });

        if (!accountCreated) {
          throw new AccountError("ACCOUNT_NOT_FOUND_LINK_ACCOUNT");
        }

        return {
          userId: accountCreated.userId,
          type: accountCreated.type as AdapterAccount["type"],
          provider: accountCreated.provider,
          providerAccountId: accountCreated.providerAccountId,
          refresh_token: accountCreated.refresh_token ?? undefined,
          access_token: accountCreated.access_token ?? undefined,
          expires_at: accountCreated.expires_at ?? undefined,
          token_type:
            (accountCreated.token_type?.toLowerCase() as Lowercase<string>) ??
            undefined,
          scope: accountCreated.scope ?? undefined,
          id_token: accountCreated.id_token ?? undefined,
          session_state: accountCreated.session_state ?? undefined,
        };
      } catch (error) {
        console.error("LINK_ACCOUNT_FAILED", error);

        throw new AccountError("LINK_ACCOUNT_FAILED", 500, {
          error,
        });
      }
    },

    async createSession(data: AdapterSession): Promise<AdapterSession> {
      try {
        const tenant = await getTenantFromCookie();

        if (!tenant) {
          throw new TenantError("TENANT_NOT_FOUND_CREATE_SESSION");
        }

        const session = await prisma.session.create({
          data: {
            sessionToken: data.sessionToken,
            userId: data.userId,
            expires: data.expires,
            tenantId: tenant.id,
          },
        });

        if (!session) {
          throw new SessionError("SESSION_NOT_FOUND_CREATE_SESSION");
        }

        return session;
      } catch (error) {
        console.error("CREATE_SESSION_FAILED", error);

        throw new SessionError("CREATE_SESSION_FAILED", 500, {
          error,
        });
      }
    },
  };
}
