import { WebSocket } from "ws";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Prisma, PrismaClient } from "@/app/generated/prisma/client";
import { normalizeEnv, isTruthyFlag } from "@/core/utils";

// * Ensure WebSocket is available in the Node.js runtime
// * Required by the Neon Prisma adapter
if (typeof globalThis.WebSocket === "undefined") {
  globalThis.WebSocket = WebSocket as unknown as typeof globalThis.WebSocket;
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
export function resolvePrismaLogLevels(
  isDev: boolean,
  envValue?: string
): Prisma.LogLevel[] | undefined {
  return determineLevelsFromRaw(getRawEnvForDev(isDev, envValue));
}

// * Creates a Neon adapter for Prisma
export function createNeonAdapter(connectionString: string): PrismaNeon {
  return new PrismaNeon({ connectionString });
}

// * Validates and returns the database URL
export function getDatabaseUrl(): string {
  const databaseUrl = normalizeEnv(process.env.DATABASE_URL);

  if (!databaseUrl) {
    throw new Error("Missing DATABASE_URL env var for Prisma.");
  }

  return databaseUrl;
}

// * Options for creating a Prisma client
export interface CreatePrismaClientOptions {
  logLevels?: Prisma.LogLevel[];
}

// * Creates a new PrismaClient instance with the Neon adapter
export function createPrismaClient(
  options?: CreatePrismaClientOptions
): PrismaClient {
  const databaseUrl = getDatabaseUrl();
  const adapter = createNeonAdapter(databaseUrl);

  return new PrismaClient({
    adapter,
    ...(options?.logLevels ? { log: options.logLevels } : {}),
  });
}
