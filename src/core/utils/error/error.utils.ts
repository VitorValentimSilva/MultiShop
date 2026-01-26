/**
 * * Creates an error codes object from an array of code names.
 * * Avoids redundancy like `CODE: "CODE"` by generating it automatically.
 *
 * @example
 * const CODES = createErrorCodes(["NOT_FOUND", "INVALID"], "TENANT");
 * * Result: { TENANT_NOT_FOUND: "TENANT_NOT_FOUND", TENANT_INVALID: "TENANT_INVALID" }
 */
export function createErrorCodes<
  TPrefix extends string,
  TCodes extends readonly string[],
>(
  codes: TCodes,
  prefix: TPrefix
): { [K in TCodes[number] as `${TPrefix}_${K}`]: `${TPrefix}_${K}` } {
  return Object.fromEntries(
    codes.map((code) => [`${prefix}_${code}`, `${prefix}_${code}`])
  ) as { [K in TCodes[number] as `${TPrefix}_${K}`]: `${TPrefix}_${K}` };
}

/**
 * * Creates error codes without a prefix.
 * * Useful for common/generic error codes.
 *
 * @example
 * const CODES = createErrorCodesRaw(["UNAUTHORIZED", "FORBIDDEN"]);
 * * Result: { UNAUTHORIZED: "UNAUTHORIZED", FORBIDDEN: "FORBIDDEN" }
 */
export function createErrorCodesRaw<TCodes extends readonly string[]>(
  codes: TCodes
): { [K in TCodes[number]]: K } {
  return Object.fromEntries(codes.map((code) => [code, code])) as {
    [K in TCodes[number]]: K;
  };
}
