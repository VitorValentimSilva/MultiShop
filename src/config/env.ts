import { z } from "zod";

/**
 * Environment Variables Schema
 *
 * Validates all required environment variables at runtime.
 * Throws an error if any required variable is missing or invalid.
 */
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  // NextAuth
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET is required"),
  NEXTAUTH_URL: z.string().url().optional(),

  // Stripe
  STRIPE_SECRET_KEY: z.string().min(1, "STRIPE_SECRET_KEY is required"),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // App
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NODE_ENV: z.enum(["development", "production", "test"]).optional(),
});

/**
 * Validated environment variables
 *
 * Use this instead of process.env to ensure type safety and validation.
 * Example: env.DATABASE_URL
 */
export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
