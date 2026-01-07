import { prisma } from "@/app/_lib/prisma";
import { FEATURES } from "@/prisma/seed/data";

export async function seedFeatures() {
  console.log("🌱 Seeding features...");

  for (const f of FEATURES) {
    const feature = await prisma.feature.upsert({
      where: { key: f.key },
      update: { order: f.order ?? null },
      create: { key: f.key, order: f.order ?? null },
    });

    for (const [locale, tr] of Object.entries(f.translations)) {
      await prisma.featureTranslation.upsert({
        where: { featureId_locale: { featureId: feature.id, locale } },
        update: { title: tr.title, description: tr.description ?? null },
        create: {
          featureId: feature.id,
          locale,
          title: tr.title,
          description: tr.description ?? null,
        },
      });
    }
  }
  console.log("✅ Features seed completed.");
}
