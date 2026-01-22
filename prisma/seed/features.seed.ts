import { createLogger } from "@/core/lib";
import { prismaSeedClient } from "@/core/database/prisma-seed-client";
import { FEATURES } from "@/seed/data";

const log = createLogger({ scope: "seed", seed: "features" });

// * Seeds application features and their translations
// * Uses upsert to allow safe re-execution
export async function seedFeatures() {
  log.info("🌱 Seeding features...");

  for (const f of FEATURES) {
    // * Create or update the feature entity
    // ! Feature key is treated as a unique identifier
    const feature = await prismaSeedClient.feature.upsert({
      where: { key: f.key },
      update: { order: f.order ?? null },
      create: { key: f.key, order: f.order ?? null },
    });

    // * Create or update translations for each locale
    for (const [locale, tr] of Object.entries(f.translations)) {
      await prismaSeedClient.featureTranslation.upsert({
        where: {
          // * Composite unique constraint: (featureId + locale)
          featureId_locale: {
            featureId: feature.id,
            locale,
          },
        },
        update: {
          title: tr.title,
          description: tr.description ?? null,
        },
        create: {
          featureId: feature.id,
          locale,
          title: tr.title,
          description: tr.description ?? null,
        },
      });
    }
  }

  log.info("✅ Features seed completed.");
}
