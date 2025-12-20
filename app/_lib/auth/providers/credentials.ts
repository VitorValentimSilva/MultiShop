import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/_lib/prisma";
import { getTenantFromCookie } from "@/app/_actions/auth";

export const credentialsProvider = Credentials({
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Senha", type: "password" },
  },

  async authorize(credentials) {
    if (!credentials?.email || !credentials.password) return null;

    const tenant = await getTenantFromCookie();

    if (!tenant || !tenant.slug) return null;

    const tenantRecord = await prisma.tenant.findUnique({
      where: { slug: tenant.slug },
    });

    if (!tenantRecord) return null;

    const user = await prisma.user.findUnique({
      where: {
        email_tenantId: {
          email: credentials.email as string,
          tenantId: tenant.id,
        },
      },
    });

    if (!user?.passwordHash) return null;

    const isValid = await bcrypt.compare(
      credentials.password as string,
      user.passwordHash,
    );

    if (!isValid) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
    };
  },
});
