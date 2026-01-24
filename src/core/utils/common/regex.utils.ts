// * Safely creates a RegExp instance
// * Returns null if the pattern or flags are invalid
export function safeRegex(pattern: string, flags = "i"): RegExp | null {
  try {
    return new RegExp(pattern, flags);
  } catch {
    return null;
  }
}

// * Internal helper to safely create a RegExp from an unknown value
// * Returns null if the pattern is not a string or is invalid
export function getSafeRegex(pattern: unknown, flags: string): RegExp | null {
  return typeof pattern === "string" ? safeRegex(pattern, flags) : null;
}

// * Safely tests a value against a regex pattern
// * Returns false if the value is not a string or the pattern is invalid
export function safeTestRegex(
  value: unknown,
  pattern: unknown,
  flags = "i"
): boolean {
  const regex = getSafeRegex(pattern, flags);
  return typeof value === "string" && regex !== null && regex.test(value);
}

// * Safely matches a string against a regex pattern
// * Returns null if the pattern is invalid or no match is found
export function safeMatchRegex(
  value: string,
  pattern: string,
  flags = "i"
): RegExpMatchArray | null {
  const regex = safeRegex(pattern, flags);
  return regex ? value.match(regex) : null;
}

// * Escapes special regex characters in a string
// * Useful for creating literal-safe regex patterns
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// * Checks whether a string is a valid regex pattern
export function isValidRegex(pattern: string): boolean {
  return safeRegex(pattern) !== null;
}

// * Creates a word-boundary-safe regex pattern for a given word
// * Ensures full word matches only
export function createWordBoundaryPattern(word: string): string {
  return `\\b${escapeRegex(word)}\\b`;
}

// * Creates a case-insensitive regex from a plain string
// * Automatically escapes special regex characters
export function createCaseInsensitiveRegex(str: string): RegExp | null {
  return safeRegex(escapeRegex(str), "i");
}
