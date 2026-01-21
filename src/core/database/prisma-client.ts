import "server-only";

import { WebSocket } from "ws";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Prisma, PrismaClient } from "@/app/generated/prisma/client";

// * Ensure WebSocket is available in the Node.js runtime
// * Required by the Neon Prisma adapter
if (typeof globalThis.WebSocket === "undefined") {
  globalThis.WebSocket = WebSocket as unknown as typeof globalThis.WebSocket;
}

// * Global Prisma instance holder (used to prevent multiple connections in dev)
const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};

// * Determine if the app is running in development mode
const isDevelopment = process.env.NODE_ENV !== "production";

// * Normalize environment variables
// * - Trims whitespace
// * - Converts empty strings to null
function normalizeEnv(value?: string): string | null {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

// * Checks if a flag-like env value is truthy
// * Accepted values: "1", "true"
function isTruthyFlag(value: string): boolean {
  return value === "1" || value.toLowerCase() === "true";
}

// * Default Prisma log levels used in development
function defaultDevLogLevels(): Prisma.LogLevel[] {
  return ["query", "warn", "error"];
}

// * Parses a comma-separated list of Prisma log levels
// * Ignores invalid values safely
function parseLogLevels(raw: string): Prisma.LogLevel[] | undefined {
  const allowed = new Set<Prisma.LogLevel>(["query", "info", "warn", "error"]);

  const levels = raw
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter((value): value is Prisma.LogLevel =>
      allowed.has(value as Prisma.LogLevel)
    );

  return levels.length ? levels : undefined;
}

// * Returns the raw env value only in development
// * Prevents accidental logging configuration in production
function getRawEnvForDev(isDev: boolean, envValue?: string): string | null {
  if (!isDev) return null;
  return normalizeEnv(envValue);
}

// * Resolves log levels when the env is a boolean-like flag
// * Example: PRISMA_LOG=true
function getFlagLevels(
  raw: string | null | undefined
): Prisma.LogLevel[] | undefined {
  if (!raw) return undefined;
  return isTruthyFlag(raw) ? defaultDevLogLevels() : undefined;
}

// * Resolves log levels when the env contains explicit values
// * Example: PRISMA_LOG=query,warn
function getParsedLevels(
  raw: string | null | undefined
): Prisma.LogLevel[] | undefined {
  if (!raw) return undefined;
  return parseLogLevels(raw);
}

// * Determines Prisma log levels from the raw env value
// * Flag-based config takes precedence over explicit lists
function determineLevelsFromRaw(
  raw: string | null | undefined
): Prisma.LogLevel[] | undefined {
  return getFlagLevels(raw) ?? getParsedLevels(raw);
}

// * Resolves Prisma log levels safely
// * - Only enabled in development
// * - Fully disabled in production
function resolvePrismaLogLevels(
  isDev: boolean,
  envValue?: string
): Prisma.LogLevel[] | undefined {
  return determineLevelsFromRaw(getRawEnvForDev(isDev, envValue));
}

// * Final Prisma log configuration
const prismaLogLevels = resolvePrismaLogLevels(
  isDevelopment,
  process.env.PRISMA_LOG
);

// * Resolve and validate the database connection string
const databaseUrl = normalizeEnv(process.env.DATABASE_URL);

if (!databaseUrl) {
  throw new Error("Missing DATABASE_URL env var for Prisma.");
}

// * Initialize the Neon adapter
const adapter = new PrismaNeon({
  connectionString: databaseUrl,
});

// * Create or reuse a Prisma Client instance
// * Reuse is critical in development to avoid exhausting DB connections
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    ...(prismaLogLevels ? { log: prismaLogLevels } : {}),
  });

// * Cache Prisma client globally in non-production environments
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
