/**
 * * Default pagination configuration.
 * * These values are used when the client does not provide pagination params.
 * ! `maxLimit` should always be enforced on the backend to prevent large queries.
 */
export const DEFAULT_PAGINATION = {
  // * Default page index (1-based)
  page: 1,

  // * Default number of items per page
  limit: 20,

  // * Absolute maximum allowed page size
  maxLimit: 100,
} as const;
