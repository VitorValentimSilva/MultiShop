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
  CommonErrorCode,
  UiErrorCode,
  DomainMetricErrorCode,
  PlanErrorCode,
  PlanFeatureErrorCode,
  FeatureErrorCode,
  ReviewErrorCode,
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
  | RolePermissionErrorCode
  | CommonErrorCode
  | UiErrorCode
  | DomainMetricErrorCode
  | PlanErrorCode
  | PlanFeatureErrorCode
  | FeatureErrorCode
  | ReviewErrorCode;
