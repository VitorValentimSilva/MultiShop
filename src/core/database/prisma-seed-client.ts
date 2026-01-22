import { createPrismaClient } from "@/core/database/prisma-base-client";

// * Create Prisma Client instance for seeding
// * This client is separate from the Next.js app client
// * and does not depend on 'server-only'
export const prismaSeedClient = createPrismaClient({
  logLevels: ["query", "warn", "error"],
});
