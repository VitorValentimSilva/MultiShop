import "server-only";

import { Redis } from "@upstash/redis";

import { normalizeEnv } from "@/core/utils";

// * Singleton instance for the Redis client
// * Ensures only one Redis connection is created per runtime
let redisSingleton: Redis | null = null;

// * Resolves the Redis configuration from environment variables
// * Returns null when configuration is incomplete
function getRedisConfig(): { url: string; token: string } | null {
  const url = normalizeEnv(process.env.UPSTASH_REDIS_REST_URL);
  const token = normalizeEnv(process.env.UPSTASH_REDIS_REST_TOKEN);

  if (!url || !token) return null;

  return { url, token };
}

// * Creates a new Redis client instance using the provided configuration
function createRedisClient(config: { url: string; token: string }): Redis {
  return new Redis(config);
}

// * Creates and assigns the Redis singleton instance
// * Throws a descriptive error when Redis is not properly configured
function createAndAssignRedisSingleton(): Redis {
  const config = getRedisConfig();

  if (!config) {
    throw new Error(
      "Upstash Redis is not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN."
    );
  }

  redisSingleton = createRedisClient(config);

  return redisSingleton;
}

// * Indicates whether Redis is correctly configured
// * Useful for feature flags or optional caching layers
export function isRedisConfigured(): boolean {
  return getRedisConfig() !== null;
}

// * Returns the existing Redis singleton or creates it if necessary
// * Ensures lazy initialization
export function getOrCreateRedisSingleton(): Redis {
  return redisSingleton ?? createAndAssignRedisSingleton();
}

// * Public accessor for the Redis client
// * Preferred entry point for consuming Redis in the application
export function getRedis(): Redis {
  return getOrCreateRedisSingleton();
}
