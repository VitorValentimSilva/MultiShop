import "server-only";

import { PrismaClient } from "@/app/generated/prisma/client";
import {
  createPrismaClient,
  resolvePrismaLogLevels,
} from "@/core/database/prisma-base-client";

// * Global Prisma instance holder (used to prevent multiple connections in dev)
const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};

// * Determine if the app is running in development mode
const isDevelopment = process.env.NODE_ENV !== "production";

// * Final Prisma log configuration
const prismaLogLevels = resolvePrismaLogLevels(
  isDevelopment,
  process.env.PRISMA_LOG
);

// * Create or reuse a Prisma Client instance
// * Reuse is critical in development to avoid exhausting DB connections
export const prismaClient =
  globalForPrisma.prisma ?? createPrismaClient({ logLevels: prismaLogLevels });

// * Cache Prisma client globally in non-production environments
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismaClient;
}
