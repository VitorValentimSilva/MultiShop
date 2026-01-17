import Stripe from "stripe";

/**
 * Stripe Client Instance
 *
 * Configured Stripe client for payment processing.
 * Uses the latest API version with TypeScript support.
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
  typescript: true,
});

/**
 * Stripe Configuration
 */
export const stripeConfig = {
  currency: "usd",
  successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
  cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
} as const;

export type StripeConfig = typeof stripeConfig;
