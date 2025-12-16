import { prisma } from "@/app/_lib/prisma";
import { runSeeds } from "@/prisma/seed/index";

async function main() {
  console.log("🌱 Starting database seed...");
  await runSeeds();
  console.log("✅ Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
