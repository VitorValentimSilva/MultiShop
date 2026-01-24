import {
  CursorMetaDto,
  FilterConditionDto,
  SearchInputDto,
  SortingInputDto,
} from "@/core/types/dtos";

// * Raw pagination input as received from API consumers
export interface PaginationInputDto {
  // * Page number (1-based)
  readonly page?: number;

  // * Number of items per page
  readonly limit?: number;

  // * Number of items to skip (offset-based pagination)
  readonly skip?: number;

  // * Number of items to take
  readonly take?: number;
}

// * Normalized pagination values after resolving defaults
export interface NormalizedPaginationDto {
  // * Final number of items to skip
  readonly skip: number;

  // * Final number of items to take
  readonly take: number;

  // * Resolved page number
  readonly page: number;

  // * Resolved page size
  readonly limit: number;
}

// * Parameters required to compute pagination metadata
export interface PaginationMetaParamsDto {
  // * Total number of items available
  readonly total: number;

  // * Current page number
  readonly page: number;

  // * Page size
  readonly limit: number;

  // * Optional skip value used
  readonly skip?: number;

  // * Optional take value used
  readonly take?: number;
}

// * Pagination input combined with sorting options
export interface PaginatedQueryInputDto<T extends string = string>
  extends PaginationInputDto, SortingInputDto<T> {}

// * Combined query input supporting search, filters, and pagination
export interface CombinedQueryInputDto<
  TEntity,
  SortFields extends keyof TEntity = keyof TEntity,
> {
  // * Full-text search configuration
  readonly search?: SearchInputDto;

  // * List of filter conditions applied to the entity
  readonly filters?: readonly FilterConditionDto<TEntity>[];

  // * Pagination and sorting configuration
  readonly paginatedQuery?: PaginatedQueryInputDto<SortFields & string>;
}

// * Metadata returned for offset-based pagination
export interface PaginationMetaDto {
  // * Current page number
  readonly page: number;

  // * Page size
  readonly limit: number;

  // * Total number of items
  readonly total: number;

  // * Total number of pages
  readonly totalPages: number;

  // * Indicates if a next page exists
  readonly hasNextPage: boolean;

  // * Indicates if a previous page exists
  readonly hasPreviousPage: boolean;

  // * Number of skipped items
  readonly skip: number;

  // * Number of taken items
  readonly take: number;
}

// * Standard paginated response using offset-based pagination
export interface PaginatedResponseDto<T> {
  // * Page data
  readonly data: readonly T[];

  // * Pagination metadata
  readonly meta: PaginationMetaDto;
}

// * Paginated response using cursor-based pagination
export interface CursorPaginatedResponseDto<T> {
  // * List of returned items
  readonly items: readonly T[];

  // * Cursor pagination metadata
  readonly meta: CursorMetaDto;
}
