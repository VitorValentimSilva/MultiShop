"use server";

import { prisma, ok, fail } from "@/app/_lib";
import { Response } from "@/app/_types/api";
import {
  GetAllDomainMetricInput,
  GetAllDomainMetricResult,
} from "@/app/_types/dto/domain-metric";

export async function getAllDomainMetric(
  input: GetAllDomainMetricInput,
): Promise<Response<GetAllDomainMetricResult[]>> {
  try {
    const { locale } = input;

    if (!locale) {
      return fail("GET_ALL_DOMAIN_METRIC_MISSING_LOCALE");
    }

    const responseDomainMetrics = await prisma.domainMetric.findMany({
      include: {
        translations: {
          where: { locale },
        },
      },
    });

    if (responseDomainMetrics.length === 0) {
      return ok([]);
    }

    if (!responseDomainMetrics) {
      return fail("GET_ALL_DOMAIN_METRIC_NOT_FOUND");
    }

    const metrics: GetAllDomainMetricResult[] = responseDomainMetrics.map(
      (metric) => {
        const translation = metric.translations[0];

        return {
          id: metric.id,
          key: metric.key,
          namespace: metric.namespace ?? null,
          value: metric.value.toNumber(),
          unit: metric.unit ?? null,
          meta: metric.meta as Record<string, unknown> | null,
          label: translation.label,
          description: translation.description ?? null,
        };
      },
    );

    if (!metrics) {
      return fail("GET_ALL_DOMAIN_METRIC_NOT_FOUND");
    }

    return ok(metrics);
  } catch (error) {
    console.error("GET_ALL_DOMAIN_METRIC_FAILED", error);
    return fail("GET_ALL_DOMAIN_METRIC_FAILED");
  }
}
