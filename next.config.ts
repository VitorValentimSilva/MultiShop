import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";
import { sentryNextjsPluginOptions } from "./config/sentry";

// * Base Next.js configuration
// * This configuration is incrementally composed by plugins below
const nextConfig: NextConfig = {
  // * Custom HTTP headers configuration
  // * Primarily used to control caching behavior for specific routes
  async headers() {
    return [
      {
        // ! Route used as the Sentry tunnel endpoint
        // ! Caching must be completely disabled to prevent stale telemetry data
        source: "/monitoring/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, max-age=0",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
        ],
      },
    ];
  },
};

// * Bundle Analyzer plugin wrapper
// * Enabled only when ANALYZE=true is set in the environment
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// * Applies the bundle analyzer on top of the base Next.js configuration
const configWithAnalyzer = bundleAnalyzer(nextConfig);

// * Final exported configuration
// * Sentry wraps the existing config and augments the build pipeline
// * (source maps, error instrumentation, release tracking, etc.)
export default withSentryConfig(configWithAnalyzer, sentryNextjsPluginOptions);
