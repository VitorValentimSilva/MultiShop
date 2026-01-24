import {
  ALL_OPERATORS,
  ARRAY_OPERATORS,
  BOOLEAN_FIELD_OPERATORS,
  DATE_FIELD_OPERATORS,
  FIELD_TYPE_DETECTORS,
  NULL_OPERATORS,
  NUMBER_FIELD_OPERATORS,
  OPERATORS_BY_FIELD_TYPE,
  STRING_FIELD_OPERATORS,
} from "@/core/constants";
import {
  ArrayOperator,
  BooleanFieldOperators,
  DateFieldOperators,
  FieldType,
  FilterOperator,
  NullOperator,
  NumberFieldOperators,
  StringFieldOperators,
} from "@/core/types";
import {
  FilterConditionDto,
  FilterValidationOptionsDto,
  FilterValidationResultDto,
} from "@/core/types/dtos";
import { isArray, isNullOrUndefined } from "@/core/utils";

// * Checks whether a string is a valid filter operator
export function isValidOperator(operator: string): operator is FilterOperator {
  return ALL_OPERATORS.has(operator);
}

// * Checks whether an operator is valid for string fields
export function isStringOperator(
  operator: string
): operator is StringFieldOperators {
  return STRING_FIELD_OPERATORS.has(operator);
}

// * Checks whether an operator is valid for number fields
export function isNumberOperator(
  operator: string
): operator is NumberFieldOperators {
  return NUMBER_FIELD_OPERATORS.has(operator);
}

// * Checks whether an operator is valid for date fields
export function isDateOperator(
  operator: string
): operator is DateFieldOperators {
  return DATE_FIELD_OPERATORS.has(operator);
}

// * Checks whether an operator is valid for boolean fields
export function isBooleanOperator(
  operator: string
): operator is BooleanFieldOperators {
  return BOOLEAN_FIELD_OPERATORS.has(operator);
}

// * Checks whether an operator is an array-based operator (in, nin, etc.)
export function isArrayOperator(operator: string): operator is ArrayOperator {
  return ARRAY_OPERATORS.has(operator);
}

// * Checks whether an operator is a null-check operator
export function isNullOperator(operator: string): operator is NullOperator {
  return operator === "isNull" || operator === "isNotNull";
}

// * Detects the runtime field type based on its value
export function detectFieldType(value: unknown): FieldType {
  if (isNullOrUndefined(value)) {
    return "unknown";
  }

  const detector = FIELD_TYPE_DETECTORS.find(([fn]) => fn(value));
  return detector?.[1] ?? "unknown";
}

// * Returns the set of valid operators for a given field type
export function getValidOperatorsForType(
  fieldType: FieldType
): ReadonlySet<string> {
  return OPERATORS_BY_FIELD_TYPE[fieldType];
}

// * Checks whether an operator is valid for a specific field type
export function isOperatorValidForType(
  operator: string,
  fieldType: FieldType
): boolean {
  return getValidOperatorsForType(fieldType).has(operator);
}

// * Validates that the filter condition has a field defined
export function validateField<TEntity>(
  condition: FilterConditionDto<TEntity>,
  errors: string[]
) {
  if (!condition.field) {
    errors.push("Filter condition must have a field");
  }
}

// * Validates that the filter condition has a valid operator
export function validateOperator<TEntity>(
  condition: FilterConditionDto<TEntity>,
  errors: string[]
) {
  if (!condition.operator) {
    errors.push("Filter condition must have an operator");
    return;
  }

  if (!isValidOperator(condition.operator)) {
    errors.push(`Invalid operator: "${condition.operator}"`);
  }
}

// * Ensures that operators requiring values actually have one
export function validateValuePresence<TEntity>(
  condition: FilterConditionDto<TEntity>,
  errors: string[]
) {
  if (
    condition.operator &&
    !NULL_OPERATORS.has(condition.operator) &&
    condition.value === undefined
  ) {
    errors.push(`Operator "${condition.operator}" requires a value`);
  }
}

// * Ensures array operators receive an array value
export function validateArrayOperator<TEntity>(
  condition: FilterConditionDto<TEntity>,
  errors: string[]
) {
  if (
    condition.operator &&
    ARRAY_OPERATORS.has(condition.operator) &&
    !isArray(condition.value)
  ) {
    errors.push(`Operator "${condition.operator}" requires an array value`);
  }
}

// * Validates whether a field exists in the entity
// * Returns false if unknown fields are not allowed
export function validateUnknownField(
  fieldName: string,
  entity: Record<string, unknown>,
  allowUnknownFields: boolean,
  errors: string[]
): boolean {
  if (!allowUnknownFields && !(fieldName in entity)) {
    errors.push(`Unknown field: "${fieldName}"`);
    return false;
  }

  return fieldName in entity;
}

// * Validates whether the operator is compatible with the field's runtime type
// * Only applies when strict mode is enabled
export function validateOperatorForFieldType(
  operator: string,
  fieldValue: unknown,
  fieldName: string,
  strict: boolean,
  errors: string[]
) {
  if (!strict) return;

  const fieldType = detectFieldType(fieldValue);

  if (isOperatorValidForType(operator, fieldType)) return;

  const validOps = Array.from(getValidOperatorsForType(fieldType)).join(", ");

  errors.push(
    `Operator "${operator}" is not valid for ${fieldType} field "${fieldName}". Valid operators: ${validOps}`
  );
}

// * Validates a filter condition against a given entity instance
export function validateAgainstEntity<TEntity extends Record<string, unknown>>(
  condition: FilterConditionDto<TEntity>,
  entity: TEntity,
  options: FilterValidationOptionsDto,
  errors: string[]
) {
  const { strict = false, allowUnknownFields = true } = options;
  const fieldName = condition.field as string;

  if (!validateUnknownField(fieldName, entity, allowUnknownFields, errors)) {
    return;
  }

  validateOperatorForFieldType(
    condition.operator!,
    entity[fieldName],
    fieldName,
    strict,
    errors
  );
}

// * Validates a single filter condition
export function validateFilterCondition<
  TEntity extends Record<string, unknown>,
>(
  condition: FilterConditionDto<TEntity>,
  entity?: TEntity,
  options: FilterValidationOptionsDto = {}
): FilterValidationResultDto {
  const errors: string[] = [];

  validateField(condition, errors);
  validateOperator(condition, errors);
  validateValuePresence(condition, errors);
  validateArrayOperator(condition, errors);

  if (entity && condition.field && condition.operator) {
    validateAgainstEntity(condition, entity, options, errors);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// * Validates multiple filter conditions and aggregates errors
export function validateFilterConditions<
  TEntity extends Record<string, unknown>,
>(
  conditions: readonly FilterConditionDto<TEntity>[],
  entity?: TEntity,
  options: FilterValidationOptionsDto = {}
): FilterValidationResultDto {
  const allErrors: string[] = [];

  conditions.forEach((condition, index) => {
    const result = validateFilterCondition(condition, entity, options);
    if (!result.valid) {
      result.errors.forEach((error) => {
        allErrors.push(`[Condition ${index}] ${error}`);
      });
    }
  });

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
  };
}
