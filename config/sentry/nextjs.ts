// * Centralized configuration for the Sentry Next.js Webpack plugin
// * This object is imported by next.config.ts to keep Sentry setup consistent
// * and avoid duplicating configuration across files

export const sentryNextjsPluginOptions = {
  // * Sentry organization slug
  org: "personal-bo0",

  // * Sentry project slug
  project: "multi-shop",

  // * Authentication token used during build time
  // * Required for uploading source maps to Sentry
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // * Source map configuration
  // * Automatically disabled when no auth token is provided
  sourcemaps: {
    disable: !process.env.SENTRY_AUTH_TOKEN,
  },

  // * Suppress Sentry logs during local development
  // * Logs remain visible in CI environments
  silent: !process.env.CI,

  // * Increases the maximum size allowed for client file uploads
  // * Useful for large Next.js builds with many chunks
  widenClientFileUpload: true,

  // * Route used as a tunnel for Sentry requests
  // * Helps bypass ad blockers and restrictive networks
  tunnelRoute: "/monitoring",

  // * Webpack-specific Sentry options
  webpack: {
    // * Automatically create Vercel monitors when deployed on Vercel
    automaticVercelMonitors: true,

    // * Remove debug logging (console.*, logger calls, etc.) from production builds
    treeshake: {
      removeDebugLogging: true,
    },
  },
} as const;
