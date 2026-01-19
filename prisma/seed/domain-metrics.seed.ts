import { prisma } from "@/app/_lib/prisma";
import { Prisma } from "@/src/app/generated/prisma/client";
import {
  DOMAIN_METRICS,
  DOMAIN_METRICS_TRANSLATIONS,
} from "@/prisma/seed/data";

export async function seedDomainMetrics() {
  console.log("🌱 Seeding domain metrics...");

  for (const m of DOMAIN_METRICS) {
    const exists = await prisma.domainMetric.findFirst({
      where: { key: m.key, namespace: m.namespace ?? null },
    });

    const metricData = {
      key: m.key,
      namespace: m.namespace ?? null,
      value: new Prisma.Decimal(m.value),
      unit: m.unit ?? null,
      meta: m.meta ?? null,
    };

    let metricId: string;

    if (!exists) {
      const created = await prisma.domainMetric.create({ data: metricData });
      metricId = created.id;
    } else {
      await prisma.domainMetric.update({
        where: { id: exists.id },
        data: metricData,
      });
      metricId = exists.id;
    }

    const translations =
      DOMAIN_METRICS_TRANSLATIONS[
        m.key as keyof typeof DOMAIN_METRICS_TRANSLATIONS
      ];

    if (translations) {
      for (const [locale, translation] of Object.entries(translations)) {
        const existingTranslation =
          await prisma.domainMetricTranslation.findUnique({
            where: {
              metricId_locale: {
                metricId,
                locale,
              },
            },
          });

        const translationData = {
          locale,
          label: translation.label,
          description: translation.description ?? null,
          metricId,
        };

        if (!existingTranslation) {
          await prisma.domainMetricTranslation.create({
            data: translationData,
          });
        } else {
          await prisma.domainMetricTranslation.update({
            where: { id: existingTranslation.id },
            data: translationData,
          });
        }
      }
    } else {
      console.warn(
        `⚠️  No translations found for metric: ${m.key} (namespace: ${m.namespace})`
      );
    }
  }
  console.log("✅ Domain metrics seed completed.");
}
