import { defineConfig, globalIgnores } from "eslint/config";
import nextConfig from "eslint-config-next";
import tseslintPlugin from "@typescript-eslint/eslint-plugin";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default defineConfig([
  // * Next.js provides a native flat config (ESLint v9+)
  ...nextConfig,

  // * Globally ignored files and folders
  // ! These files are generated or managed by frameworks
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),

  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslintPlugin,
    },
    rules: {
      // * Warns about unused variables
      // ! Allows intentionally unused parameters prefixed with "_"
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  },

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      // * Ensures React hooks dependencies are correctly handled
      "react-hooks/exhaustive-deps": "warn",

      // * Discourages console usage in production code
      // ! Allows console.warn and console.error for logging
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
]);
