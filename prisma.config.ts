import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// * Prisma configuration entry point
export default defineConfig({
  // * Path to the Prisma schema file
  schema: "prisma/schema.prisma",

  migrations: {
    // * Directory where migration files are stored
    path: "prisma/migrations",

    // * Seed script executed after migrations
    // ! Uses tsx to run TypeScript directly
    seed: "tsx prisma/seed.ts",
  },

  datasource: {
    // * Database connection string
    // ! Loaded securely from environment variables
    url: env("DATABASE_URL"),
  },
});
