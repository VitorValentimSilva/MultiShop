import * as Sentry from "@sentry/nextjs";

// * This function is automatically called by Next.js
// * It allows conditional initialization based on the runtime environment
export async function register() {
  // * Node.js runtime (API routes, server actions, SSR)
  // * Loads the server-side Sentry configuration
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }

  // * Edge runtime (Middleware, Edge Functions)
  // * Loads the edge-specific Sentry configuration
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

// * Global request error handler
// * Automatically captures unhandled request-level errors
// * Works for both Node.js and Edge runtimes
export const onRequestError = Sentry.captureRequestError;
