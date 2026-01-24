import {
  NormalizedPaginationDto,
  PaginatedResponseDto,
  PaginationInputDto,
  PaginationMetaDto,
  PaginationMetaParamsDto,
} from "@/core/types/dtos";
import { DEFAULT_PAGINATION } from "@/core/constants";

// * Normalizes pagination input into skip/take-based pagination
// * Supports page-based and skip-based inputs
// * Enforces minimums and maximum limits
export function normalizePagination(
  input?: PaginationInputDto
): NormalizedPaginationDto {
  // * Ensure page is always >= 1
  const page = Math.max(1, input?.page ?? DEFAULT_PAGINATION.page);

  // * Resolve limit with priority: limit > take > default
  // * Clamp value between 1 and maxLimit
  const limit = Math.min(
    Math.max(1, input?.limit ?? input?.take ?? DEFAULT_PAGINATION.limit),
    DEFAULT_PAGINATION.maxLimit
  );

  // * If skip is explicitly provided, derive page from skip
  if (input?.skip !== undefined) {
    return {
      skip: Math.max(0, input.skip),
      take: limit,
      page: Math.floor(input.skip / limit) + 1,
      limit,
    };
  }

  // * Default page-based pagination
  const skip = (page - 1) * limit;

  return { skip, take: limit, page, limit };
}

// * Creates pagination metadata based on total count and pagination params
export function createPaginationMeta(
  params: PaginationMetaParamsDto
): PaginationMetaDto {
  const { total, page, limit } = params;

  // * Resolve skip/take if not explicitly provided
  const skip = params.skip ?? (page - 1) * limit;
  const take = params.take ?? limit;

  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    skip,
    take,
  };
}

// * Creates a standardized paginated API response
export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  pagination: { page: number; limit: number; skip?: number; take?: number }
): PaginatedResponseDto<T> {
  return {
    data,
    meta: createPaginationMeta({ total, ...pagination }),
  };
}

// * Calculates total number of pages
export function calculateTotalPages(total: number, limit: number): number {
  return Math.ceil(total / limit);
}

// * Indicates whether a next page exists
export function hasNextPage(currentPage: number, totalPages: number): boolean {
  return currentPage < totalPages;
}

// * Indicates whether a previous page exists
export function hasPreviousPage(currentPage: number): boolean {
  return currentPage > 1;
}

// * Determines whether all pages should be displayed
// * Typically used for pagination UI
export function shouldShowAllPages(
  maxVisible: number | undefined,
  totalPages: number
): boolean {
  return !maxVisible || maxVisible >= totalPages;
}

// * Creates an inclusive numeric range
export function createRange(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

// * Clamps a value between min and max
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// * Calculates a sliding window of page numbers
// * Keeps the current page centered when possible
export function calculateWindow(
  currentPage: number,
  totalPages: number,
  maxVisible: number
): { start: number; end: number } {
  const half = Math.floor(maxVisible / 2);

  const start = clamp(currentPage - half, 1, totalPages - maxVisible + 1);
  const end = clamp(start + maxVisible - 1, 1, totalPages);

  return { start, end };
}

// * Returns the list of page numbers to display
// * Handles full and windowed pagination modes
export function getPageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible?: number
): number[] {
  if (shouldShowAllPages(maxVisible, totalPages)) {
    return createRange(1, totalPages);
  }

  const { start, end } = calculateWindow(currentPage, totalPages, maxVisible!);

  return createRange(start, end);
}
