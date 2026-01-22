import * as Sentry from "@sentry/nextjs";
import {
  isProductionEnvironment,
  parseBoolean,
  parseRate,
  resolveEnvironment,
} from "@/config/sentry";

// * Public Sentry DSN
// * Client-side must always use the public DSN
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

// * Resolve the runtime environment for the client
// * Priority: explicit public Sentry environment > NODE_ENV > fallback
const environment = resolveEnvironment(
  process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
  process.env.NODE_ENV
);

// * Determine whether the application is running in production
// * Used to adjust sampling, logging, and privacy-related behavior
const isProduction = isProductionEnvironment(environment);

// * Configure performance tracing sampling rate
// * Lower sampling in production to reduce overhead
// * Full sampling in non-production environments for observability
const tracesSampleRate = parseRate(
  process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE,
  isProduction ? 0.1 : 1
);

// * Configure session replay sampling rate
// * Disabled in production by default for privacy and performance
// * Enabled at low rates in staging for debugging purposes
const replaysSessionSampleRate = isProduction
  ? 0
  : parseRate(
      process.env.NEXT_PUBLIC_SENTRY_REPLAYS_SESSION_SAMPLE_RATE,
      environment === "staging" ? 0.05 : 0
    );

// * Configure replay sampling for error sessions
// * Captures full replays only when errors occur
// * Enabled only in non-production environments
const replaysOnErrorSampleRate = isProduction
  ? 0
  : parseRate(
      process.env.NEXT_PUBLIC_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE,
      environment === "staging" ? 1 : 0
    );

// * Determine whether the Replay integration should be enabled
// * Enabled when at least one replay sampling rate is greater than zero
const enableReplay =
  replaysSessionSampleRate > 0 || replaysOnErrorSampleRate > 0;

// * Control whether Personally Identifiable Information (PII)
// * should be sent from the client
// * Defaults to false for privacy and compliance
const sendDefaultPii = parseBoolean(
  process.env.NEXT_PUBLIC_SENTRY_SEND_DEFAULT_PII,
  false
);

// * Control Sentry internal SDK logging
// * Enabled by default outside production to aid debugging
const enableLogs = parseBoolean(
  process.env.NEXT_PUBLIC_SENTRY_ENABLE_LOGS,
  !isProduction
);

// * Initialize Sentry for the client-side runtime
Sentry.init({
  // * Data Source Name (client-safe)
  dsn,

  // * Enable Sentry only when a DSN is configured
  enabled: Boolean(dsn),

  // * Environment reported to Sentry
  environment,

  // * Optional Replay integration
  integrations: enableReplay
    ? [
        Sentry.replayIntegration({
          // * Masks all visible text to prevent sensitive data leakage
          maskAllText: true,

          // * Prevents media (images/videos) from being recorded
          blockAllMedia: true,
        }),
      ]
    : [],

  // * Performance tracing sampling rate
  tracesSampleRate,

  // * Enable internal Sentry SDK logs
  enableLogs,

  // * Session replay sampling configuration
  replaysSessionSampleRate,
  replaysOnErrorSampleRate,

  // * Controls whether client-side PII is sent to Sentry
  sendDefaultPii,
});

// * Hook used by the Next.js App Router
// * Enables navigation performance tracking
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
