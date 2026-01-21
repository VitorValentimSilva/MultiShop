import pino, { type Logger } from "pino";

// * Generic context type for structured logging
// * Used to enrich logs with request, user, or domain-specific data
type LoggerContext = Record<string, unknown>;

// * Resolves the log level based on the runtime environment
// * Priority:
// * 1. LOG_LEVEL environment variable
// * 2. "info" in production
// * 3. "debug" in non-production environments
function resolveLogLevel(): string {
  return (
    process.env.LOG_LEVEL ??
    (process.env.NODE_ENV === "production" ? "info" : "debug")
  );
}

// * Base application logger instance
// * - Uses ISO timestamps for better interoperability
// * - Disables default base fields (pid, hostname) to reduce noise
export const logger: Logger = pino({
  level: resolveLogLevel(),
  timestamp: pino.stdTimeFunctions.isoTime,
  base: undefined,
});

// * Creates a child logger with additional contextual fields
// * Useful for request-scoped, tenant-scoped, or user-scoped logging
// *
// * Example:
// * const log = createLogger({ requestId, tenantId })
// * log.info("User created")
export function createLogger(context: LoggerContext): Logger {
  return logger.child(context);
}
