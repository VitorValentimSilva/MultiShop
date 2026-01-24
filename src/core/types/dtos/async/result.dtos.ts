// * Represents a successful result
// * Inspired by Result/Ok patterns from functional programming
export interface OkDto<T> {
  // * Discriminant tag used for type narrowing
  readonly _tag: "Ok";

  // * Indicates a successful outcome
  readonly ok: true;

  // * Wrapped successful value
  readonly value: T;
}

// * Represents a failed result
// * Carries an error payload
export interface ErrDto<E> {
  // * Discriminant tag used for type narrowing
  readonly _tag: "Err";

  // * Indicates a failed outcome
  readonly ok: false;

  // * Wrapped error value
  readonly error: E;
}

// * Represents the presence of a value
// * Inspired by Option/Some semantics
export interface SomeDto<T> {
  // * Discriminant tag used for type narrowing
  readonly _tag: "Some";

  // * Indicates a value is present
  readonly isSome: true;

  // * Wrapped value
  readonly value: T;
}

// * Represents the absence of a value
// * Companion to SomeDto
export interface NoneDto {
  // * Discriminant tag used for type narrowing
  readonly _tag: "None";

  // * Indicates no value is present
  readonly isSome: false;
}
