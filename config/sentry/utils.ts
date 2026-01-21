// * Maps common string representations to boolean values
// * Useful for parsing environment variables and user input
export const BOOLEAN_MAP: Record<string, boolean> = {
  // * Truthy values
  "1": true,
  true: true,
  t: true,
  yes: true,
  y: true,
  on: true,
  enable: true,
  enabled: true,

  // * Falsy values
  "0": false,
  false: false,
  f: false,
  no: false,
  n: false,
  off: false,
  disable: false,
  disabled: false,
};

// * Ensures a numeric rate is clamped between 0 and 1
// * Commonly used for sampling rates (e.g. Sentry traces, replays)
export const clampRate = (value: number): number => {
  // ! Non-finite values (NaN, Infinity) are treated as 0
  if (!Number.isFinite(value)) return 0;

  return Math.min(1, Math.max(0, value));
};

// * Parses a numeric rate from a string and clamps it safely
// * Falls back to a default value if parsing fails
export const parseRate = (
  value: string | undefined,
  fallback: number
): number => {
  // * If no value is provided, use the fallback
  if (value === undefined) return clampRate(fallback);

  const parsed = Number(value);

  // * Use parsed value when valid, otherwise fallback
  return clampRate(Number.isFinite(parsed) ? parsed : fallback);
};

// * Parses a boolean value from a string
// * Accepts multiple truthy/falsy representations (see BOOLEAN_MAP)
export const parseBoolean = (
  value: string | undefined,
  fallback: boolean
): boolean => {
  // * Normalize input (trim + lowercase) for consistent matching
  const key = value?.trim().toLowerCase() ?? "";

  // * Use mapped value when available, otherwise fallback
  return key in BOOLEAN_MAP ? BOOLEAN_MAP[key] : fallback;
};

// * Resolves the application environment with proper priority
// * Priority: explicit value > NODE_ENV > fallback
export const resolveEnvironment = (
  explicitEnvironment: string | undefined,
  nodeEnvironment: string | undefined,
  fallback: string = "development"
): string => {
  return explicitEnvironment ?? nodeEnvironment ?? fallback;
};

// * Checks whether the resolved environment is production
export const isProductionEnvironment = (environment: string): boolean => {
  return environment.trim().toLowerCase() === "production";
};
