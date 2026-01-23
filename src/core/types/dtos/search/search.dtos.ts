// * Defines the input parameters for a search operation
export interface SearchInputDto {
  // * Raw search query string
  readonly query: string;

  // * Optional list of fields to search against
  // * If omitted, the backend may use a default field set
  readonly fields?: readonly string[];

  // * Enables fuzzy matching to tolerate typos and approximate matches
  readonly fuzzy?: boolean;

  // * Minimum relevance score required for a result to be included
  // * Results below this threshold are discarded
  readonly minScore?: number;

  // * Indicates whether matching terms should be highlighted
  // * Highlighting behavior is backend-specific
  readonly highlight?: boolean;
}

// * Represents a single search result item
export interface SearchResultDto<T> {
  // * The matched item
  readonly item: T;

  // * Relevance score assigned by the search engine
  readonly score: number;

  // * Optional highlighted fragments per field
  // * The key represents the field name, and the value contains
  // * highlighted text snippets
  readonly highlights?: Readonly<Record<string, string[]>>;
}

// * Represents the full response of a search operation
export interface SearchResponseDto<T> {
  // * List of search results ordered by relevance
  readonly results: readonly SearchResultDto<T>[];

  // * Total number of matching items (before pagination, if any)
  readonly totalCount: number;

  // * The original query string used for the search
  readonly query: string;

  // * Time taken to execute the search (usually in milliseconds)
  readonly took: number;
}
