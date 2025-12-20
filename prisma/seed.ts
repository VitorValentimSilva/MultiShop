import { prisma } from "@/app/_lib/prisma";
import { runSeeds } from "@/prisma/seed/index";

async function main() {
  console.log("🌱 Starting database seed...");
  await runSeeds();
  console.log("✅ Seed completed successfully");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
