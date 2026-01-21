import * as Sentry from "@sentry/nextjs";
import {
  isProductionEnvironment,
  parseBoolean,
  parseRate,
  resolveEnvironment,
} from "./config/sentry";

// * Resolve the Sentry DSN
// * Server-side DSN takes precedence over the public one
const dsn = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN;

// * Resolve the runtime environment
// * Priority: explicit Sentry environment > NODE_ENV > fallback
const environment = resolveEnvironment(
  process.env.SENTRY_ENVIRONMENT,
  process.env.NODE_ENV
);

// * Determine whether the application is running in production
// * This affects sampling rates and logging behavior
const isProduction = isProductionEnvironment(environment);

// * Configure performance tracing sampling rate
// * Lower rate in production to reduce overhead
const tracesSampleRate = parseRate(
  process.env.SENTRY_TRACES_SAMPLE_RATE,
  isProduction ? 0.1 : 1
);

// * Control whether Personally Identifiable Information (PII)
// * is sent to Sentry
// * Defaults to false for privacy and compliance reasons
const sendDefaultPii = parseBoolean(process.env.SENTRY_SEND_DEFAULT_PII, false);

// * Control Sentry internal logging
// * Enabled by default outside production to aid debugging
const enableLogs = parseBoolean(process.env.SENTRY_ENABLE_LOGS, !isProduction);

// * Initialize the Sentry SDK (server-side)
Sentry.init({
  // * Data Source Name (project identifier)
  dsn,

  // * Enable Sentry only when a DSN is configured
  enabled: Boolean(dsn),

  // * Environment name reported to Sentry
  environment,

  // * Performance tracing sampling rate
  tracesSampleRate,

  // * Enable internal Sentry SDK logs
  // * Useful for diagnosing integration issues
  enableLogs,

  // * Controls whether PII (e.g. IP address, user data) is sent
  sendDefaultPii,
});
