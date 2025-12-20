export const PERMISSION_ENTITIES = [
  "TENANT",
  "USER",
  "ROLE",
  "PERMISSION",
  "ACCOUNT",
] as const;

export type PermissionEntity = (typeof PERMISSION_ENTITIES)[number];
