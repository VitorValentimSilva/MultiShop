import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

// * Base Next.js configuration
const nextConfig: NextConfig = {
  /* config options here */
};

// * Enables bundle analyzer conditionally
// ! Only runs when ANALYZE=true is set in the environment
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// * Exports the enhanced Next.js config
export default bundleAnalyzer(nextConfig);
