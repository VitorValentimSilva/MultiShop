"use server";

import { prisma, ok, fail } from "@/app/_lib";
import { Response } from "@/app/_types/api";
import {
  DEFAULT_PAGINATION,
  calculateOffset,
  calculatePaginationMeta,
} from "@/app/_types/api";
import {
  GetAllDomainMetricInput,
  GetAllDomainMetricResult,
  GetAllDomainMetricResponse,
} from "@/app/_types/dto/domain-metric";

export async function getAllDomainMetric(
  input: GetAllDomainMetricInput,
): Promise<Response<GetAllDomainMetricResponse>> {
  try {
    const { locale, page, limit, sortBy, sortOrder } = input;

    if (!locale) {
      return fail("GET_ALL_DOMAIN_METRIC_MISSING_LOCALE");
    }

    const isPaginated = page !== undefined || limit !== undefined;

    const currentPage = page ?? DEFAULT_PAGINATION.page;
    const currentLimit = limit ?? DEFAULT_PAGINATION.limit;
    const currentSortBy = sortBy ?? "createdAt";
    const currentSortOrder = sortOrder ?? DEFAULT_PAGINATION.sortOrder;

    const queryOptions: {
      include: {
        translations: {
          where: { locale: string };
        };
      };
      skip?: number;
      take?: number;
      orderBy?: Record<string, "asc" | "desc">;
    } = {
      include: {
        translations: {
          where: { locale },
        },
      },
    };

    if (isPaginated) {
      if (currentPage < 1) {
        return fail("INVALID_PAGE_NUMBER");
      }
      if (currentLimit < 1 || currentLimit > 100) {
        return fail("INVALID_LIMIT");
      }

      queryOptions.skip = calculateOffset(currentPage, currentLimit);
      queryOptions.take = currentLimit;
      queryOptions.orderBy = {
        [currentSortBy]: currentSortOrder,
      };
    }

    const responseDomainMetrics =
      await prisma.domainMetric.findMany(queryOptions);

    if (responseDomainMetrics.length === 0) {
      if (isPaginated) {
        return ok({
          data: [],
          meta: calculatePaginationMeta(0, currentPage, currentLimit),
        });
      }

      return ok([]);
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
          label: translation?.label || metric.key,
          description: translation?.description ?? null,
        };
      },
    );

    if (isPaginated) {
      const totalItems = await prisma.domainMetric.count();
      const meta = calculatePaginationMeta(
        totalItems,
        currentPage,
        currentLimit,
      );

      return ok({
        data: metrics,
        meta,
      });
    }

    return ok(metrics);
  } catch (error) {
    console.error("GET_ALL_DOMAIN_METRIC_FAILED", error);
    return fail("GET_ALL_DOMAIN_METRIC_FAILED");
  }
}
