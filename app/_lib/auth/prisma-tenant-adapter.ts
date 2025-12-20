import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/_lib/prisma";
import { getTenantFromCookie } from "@/app/_actions/auth";
import {
  AdapterUser,
  AdapterAccount,
  AdapterSession,
} from "next-auth/adapters";

export function PrismaTenantAdapter() {
  const base = PrismaAdapter(prisma);

  return {
    ...base,

    async getUserByEmail(email: string) {
      const tenant = await getTenantFromCookie();
      if (!tenant) return null;

      return prisma.user.findUnique({
        where: {
          email_tenantId: {
            email,
            tenantId: tenant.id,
          },
        },
      });
    },

    async createUser(data: AdapterUser) {
      const tenant = await getTenantFromCookie();
      if (!tenant) {
        throw new Error("Tenant não encontrado ao criar usuário");
      }

      return prisma.user.create({
        data: {
          id: data.id,
          email: data.email,
          name: data.name,
          image: data.image,
          emailVerified: data.emailVerified,
          tenantId: tenant.id,
        },
      });
    },

    async getUserByAccount({
      provider,
      providerAccountId,
    }: {
      provider: string;
      providerAccountId: string;
    }) {
      const tenant = await getTenantFromCookie();
      if (!tenant) return null;

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

      return account?.user ?? null;
    },

    async linkAccount(account: AdapterAccount) {
      const tenant = await getTenantFromCookie();
      if (!tenant) {
        throw new Error("Tenant não encontrado ao linkar conta OAuth");
      }

      await prisma.account.create({
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
    },

    async createSession(data: AdapterSession) {
      const tenant = await getTenantFromCookie();
      if (!tenant) {
        throw new Error("Tenant não encontrado ao criar sessão");
      }

      return prisma.session.create({
        data: {
          sessionToken: data.sessionToken,
          userId: data.userId,
          expires: data.expires,
          tenantId: tenant.id,
        },
      });
    },
  };
}
