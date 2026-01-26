/**
 * * Normalizes environment variables
 * * - Trims whitespace
 * * - Converts empty strings to null
 */
export function normalizeEnv(value?: string): string | null {
  const normalized = value?.trim();

  return normalized ? normalized : null;
}

/**
 * * Checks if a flag-like env value is truthy
 * * Accepted values: "1", "true"
 */
export function isTruthyFlag(value: string): boolean {
  return value === "1" || value.toLowerCase() === "true";
}

/**
 * * Returns a required environment variable or throws
 */
export function getRequiredEnv(key: string): string {
  const value = normalizeEnv(process.env[key]);

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

/**
 * * Returns an optional environment variable with a default value
 */
export function getOptionalEnv(key: string, defaultValue: string): string {
  return normalizeEnv(process.env[key]) ?? defaultValue;
}
