/**
 * Database Configuration
 *
 * Configuration options for database connections and behavior.
 */
export const databaseConfig = {
  // Connection pool settings
  connectionPool: {
    min: 2,
    max: 10,
  },

  // Query timeout in milliseconds
  queryTimeout: 10000,

  // Enable query logging in development
  logging: process.env.NODE_ENV === "development",
} as const;

export type DatabaseConfig = typeof databaseConfig;
