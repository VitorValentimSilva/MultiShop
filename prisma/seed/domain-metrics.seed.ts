import { createLogger } from "@/core/lib";
import { prismaSeedClient } from "@/core/database/prisma-seed-client";
import { Prisma } from "@/app/generated/prisma/client";
import { DOMAIN_METRICS, DOMAIN_METRICS_TRANSLATIONS } from "@/seed/data";

const log = createLogger({ scope: "seed", seed: "domain-metrics" });

// * Creates or updates a DomainMetric record based on its unique key + namespace
// * Returns the persisted metric ID to be reused by translations
async function upsertDomainMetric(
  m: (typeof DOMAIN_METRICS)[number]
): Promise<string> {
  // * Normalize seed data to match database schema
  // ! Decimal values must be wrapped using Prisma.Decimal
  const metricData = {
    key: m.key,
    namespace: m.namespace ?? null,
    value: new Prisma.Decimal(m.value),
    unit: m.unit ?? null,
    meta: m.meta ?? null,
  };

  // * Uses upsert to make the seed idempotent
  // * This allows running the seed multiple times safely
  const metric = await prismaSeedClient.domainMetric.upsert({
    where: {
      // * Composite unique constraint: (key + namespace)
      key_namespace: {
        key: m.key,
        namespace: m.namespace ?? null,
      },
    },
    create: metricData,
    update: metricData,
  });

  // * Return the metric ID for later association
  return metric.id;
}

// * Creates or updates all translations for a given DomainMetric
// * Translations are resolved by metric key
async function upsertDomainMetricTranslations(
  metricId: string,
  m: (typeof DOMAIN_METRICS)[number]
) {
  // * Resolve translations from static seed dictionary
  const translations =
    DOMAIN_METRICS_TRANSLATIONS[
      m.key as keyof typeof DOMAIN_METRICS_TRANSLATIONS
    ];

  // ? Metrics without translations are allowed
  // ! Warn to help identify missing i18n data during development
  if (!translations) {
    log.warn(
      `⚠️  No translations found for metric: ${m.key} (namespace: ${m.namespace})`
    );
    return;
  }

  // * Upsert translations per locale to ensure idempotency
  for (const [locale, translation] of Object.entries(translations)) {
    const translationData = {
      locale,
      label: translation.label,
      description: translation.description ?? null,
      metricId,
    };

    await prismaSeedClient.domainMetricTranslation.upsert({
      where: {
        // * Composite unique constraint: (metricId + locale)
        metricId_locale: {
          metricId,
          locale,
        },
      },
      create: translationData,
      update: translationData,
    });
  }
}

// * Entry point for Domain Metrics seeding
// * Responsible for metrics and their translations
export async function seedDomainMetrics() {
  log.warn("🌱 Seeding domain metrics...");

  // * Iterate through all predefined domain metrics
  for (const m of DOMAIN_METRICS) {
    const metricId = await upsertDomainMetric(m);
    await upsertDomainMetricTranslations(metricId, m);
  }

  log.warn("✅ Domain metrics seed completed.");
}
