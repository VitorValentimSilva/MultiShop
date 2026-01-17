import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { WebSocket } from "ws";

// Fix for WebSocket in Node.js environment
global.WebSocket = WebSocket as unknown as typeof global.WebSocket;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

/**
 * Prisma Client Instance
 *
 * Singleton pattern to prevent multiple Prisma Client instances.
 * Uses PrismaNeon adapter for better performance with Neon database.
 */
const createPrismaClient = () => {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL,
  });

  return new PrismaClient({ adapter });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
