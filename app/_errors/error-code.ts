import {
  AccountErrorCode,
  SessionErrorCode,
  TenantErrorCode,
  UserErrorCode,
  PermissionErrorCode,
  UserRoleErrorCode,
  VerificationTokenErrorCode,
  RoleErrorCode,
  RolePermissionErrorCode,
} from "@/app/_errors";

export type ErrorCode =
  | TenantErrorCode
  | UserErrorCode
  | AccountErrorCode
  | SessionErrorCode
  | PermissionErrorCode
  | UserRoleErrorCode
  | VerificationTokenErrorCode
  | RoleErrorCode
  | RolePermissionErrorCode;
