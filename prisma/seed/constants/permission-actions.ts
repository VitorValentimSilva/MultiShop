export const PERMISSION_ACTIONS = [
  "CREATE",
  "READ",
  "UPDATE",
  "DELETE",
] as const;

export type PermissionAction = (typeof PERMISSION_ACTIONS)[number];
