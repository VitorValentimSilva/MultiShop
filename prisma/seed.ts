import { createLogger } from "@/core/lib";
import { prismaSeedClient } from "@/core/database/prisma-seed-client";
import { runSeeds } from "@/seed/index";

const log = createLogger({ scope: "prisma-seed" });

// * Main entry point for database seeding
// * Responsible for orchestrating all seed operations
async function main() {
  log.info("🌱 Starting database seed...");

  // * Executes the full seed pipeline
  await runSeeds();

  log.info("✅ Seed completed successfully");
}

// ! Global error handler for the seed process
// ! Ensures the process exits with a non-zero code on failure
main()
  .catch((error) => {
    log.error({ error }, "❌ Seed failed");
    process.exit(1);
  })
  .finally(async () => {
    // * Ensures Prisma disconnects from the database
    // * Prevents hanging connections after seeding
    await prismaSeedClient.$disconnect();
  });
