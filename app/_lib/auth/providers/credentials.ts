import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/_lib";
import { getTenantFromCookie } from "@/app/_actions/auth";
import { TenantError, UserError } from "@/app/_errors";

export const credentialsProvider = Credentials({
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Senha", type: "password" },
  },

  async authorize(credentials) {
    try {
      if (!credentials?.email || !credentials.password) {
        throw new TenantError("INVALID_CREDENTIALS_AUTHORIZE");
      }

      const tenant = await getTenantFromCookie();

      if (!tenant || !tenant.slug) {
        throw new TenantError("TENANT_NOT_FOUND_AUTHORIZE");
      }

      const tenantRecord = await prisma.tenant.findUnique({
        where: { slug: tenant.slug },
      });

      if (!tenantRecord) {
        throw new TenantError("TENANT_RECORD_NOT_FOUND_AUTHORIZE");
      }

      const user = await prisma.user.findUnique({
        where: {
          email_tenantId: {
            email: credentials.email as string,
            tenantId: tenant.id,
          },
        },
      });

      if (!user || !user.passwordHash) {
        throw new UserError("USER_PASSWORD_HASH_NOT_FOUND_AUTHORIZE");
      }

      const isValid = await bcrypt.compare(
        credentials.password as string,
        user.passwordHash,
      );

      if (!isValid) {
        throw new UserError("USER_PASSWORD_INVALID_AUTHORIZE");
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      };
    } catch (error) {
      console.error("AUTHORIZE_FAILED", error);

      throw new UserError("AUTHORIZE_FAILED", 500, {
        error,
      });
    }
  },
});
