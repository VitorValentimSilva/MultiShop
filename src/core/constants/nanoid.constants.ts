/**
 * * Default length used when generating NanoIDs.
 * * Matches the standard length recommended by the nanoid library.
 */
export const NANOID_DEFAULT_LENGTH = 21;

/**
 * * Shorter NanoID length.
 * * Useful for user-facing identifiers where readability matters more than entropy.
 */
export const NANOID_SHORT_LENGTH = 10;

/**
 * * Regular expression used to validate NanoID strings.
 * * Allows only URL-safe characters (A–Z, a–z, 0–9, _ and -).
 */
export const NANOID_PATTERN = /^[A-Za-z0-9_-]+$/;
