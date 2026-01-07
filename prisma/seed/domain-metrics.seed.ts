import { prisma } from "@/app/_lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import { DOMAIN_METRICS } from "@/prisma/seed/data/domain-metrics.data";

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

    if (!exists) {
      await prisma.domainMetric.create({ data: metricData });
    } else {
      await prisma.domainMetric.update({
        where: { id: exists.id },
        data: metricData,
      });
    }
  }
  console.log("✅ Domain metrics seed completed.");
}
