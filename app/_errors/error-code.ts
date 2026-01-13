import {
  AccountErrorCode,
  SessionErrorCode,
  TenantErrorCode,
  UserErrorCode,
  PermissionErrorCode,
  PermissionTranslationErrorCode,
  UserRoleErrorCode,
  VerificationTokenErrorCode,
  RoleErrorCode,
  RoleTranslationErrorCode,
  RolePermissionErrorCode,
  CommonErrorCode,
  UiErrorCode,
  DomainMetricErrorCode,
  DomainMetricTranslationErrorCode,
  PlanErrorCode,
  PlanPriceErrorCode,
  PlanTranslationErrorCode,
  PlanFeatureErrorCode,
  FeatureErrorCode,
  FeatureTranslationErrorCode,
  ReviewErrorCode,
} from "@/app/_errors";

export type ErrorCode =
  | TenantErrorCode
  | UserErrorCode
  | AccountErrorCode
  | SessionErrorCode
  | PermissionErrorCode
  | PermissionTranslationErrorCode
  | UserRoleErrorCode
  | VerificationTokenErrorCode
  | RoleErrorCode
  | RoleTranslationErrorCode
  | RolePermissionErrorCode
  | CommonErrorCode
  | UiErrorCode
  | DomainMetricErrorCode
  | DomainMetricTranslationErrorCode
  | PlanErrorCode
  | PlanPriceErrorCode
  | PlanTranslationErrorCode
  | PlanFeatureErrorCode
  | FeatureErrorCode
  | FeatureTranslationErrorCode
  | ReviewErrorCode;
