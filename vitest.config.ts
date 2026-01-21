import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    // * Enables global test APIs (describe, it, expect, etc.)
    // * Avoids the need to import them in every test file
    globals: true,

    // * Defines the runtime environment for tests
    // ! "node" is ideal for backend logic and non-DOM tests
    environment: "node",

    // * Patterns used by Vitest to locate test files
    // * Supports both tests/ and __tests__ conventions
    include: [
      "tests/**/*.test.ts",
      "tests/**/*.spec.ts",
      "__tests__/**/*.test.ts",
    ],

    coverage: {
      // * Uses V8 native coverage for better performance
      provider: "v8",

      // * Generates coverage reports in multiple formats
      // * - text: console output
      // * - json: CI/CD integrations
      // * - html: human-readable report
      reporter: ["text", "json", "html"],

      // * Files and folders excluded from coverage calculation
      // ! Prevents noise from generated, external, or config files
      exclude: [
        "node_modules/",
        "__tests__/",
        "tests/",
        "**/*.config.*",
        "**/dist/**",
        "**/.next/**",
      ],
    },
  },

  resolve: {
    alias: {
      // * Root alias for absolute imports
      // * Example: import x from "@/file"
      "@": path.resolve(__dirname, "./"),

      // * Common project structure aliases
      // ! Improves readability and avoids long relative paths
      "@/src": path.resolve(__dirname, "./src"),
      "@/app": path.resolve(__dirname, "./src/app"),
      "@/core": path.resolve(__dirname, "./src/core"),
      "@/features": path.resolve(__dirname, "./src/features"),
      "@/modules": path.resolve(__dirname, "./src/modules"),
      "@/prisma": path.resolve(__dirname, "./prisma"),
      "@/seed": path.resolve(__dirname, "./prisma/seed"),
      "@/config": path.resolve(__dirname, "./config"),
      "@/tests": path.resolve(__dirname, "./tests"),
    },
  },
});
