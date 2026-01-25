// * Options for configuring the locale middleware behavior
export interface LocaleMiddlewareOptionsDto {
  // * Whether to redirect to add locale prefix if missing from URL
  readonly redirectIfMissing?: boolean;

  // * Whether to set locale cookie on response for persistence
  readonly setCookie?: boolean;

  // * Whether to set locale header on response for downstream use
  readonly setHeader?: boolean;
}
