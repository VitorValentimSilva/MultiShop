# Clean Architecture Overview

## Introduction

This project follows Clean Architecture principles to ensure:

- **Independence from frameworks**: Business logic doesn't depend on external libraries
- **Testability**: Business rules can be tested without UI, database, or external dependencies
- **Independence from UI**: The UI can change without affecting business logic
- **Independence from Database**: Business logic doesn't know about the database
- **Separation of concerns**: Each layer has a single responsibility

## Architecture Layers

The application is organized into 4 distinct layers, from innermost to outermost:

```
┌─────────────────────────────────────────────┐
│           Presentation Layer                │
│   (UI, Actions, Components, Hooks)          │
└─────────────┬───────────────────────────────┘
              │
┌─────────────▼───────────────────────────────┐
│         Infrastructure Layer                │
│  (Repositories, Mappers, Schemas, APIs)     │
└─────────────┬───────────────────────────────┘
              │
┌─────────────▼───────────────────────────────┐
│          Application Layer                  │
│   (Use Cases, Commands, Queries, DTOs)      │
└─────────────┬───────────────────────────────┘
              │
┌─────────────▼───────────────────────────────┐
│            Domain Layer                     │
│ (Entities, Value Objects, Specifications)   │
└─────────────────────────────────────────────┘
```

### 1. Domain Layer (Core)

**Location**: `src/modules/{module}/domain/`

The heart of the application containing business logic and rules.

**Responsibilities**:

- Define entities (business objects)
- Define value objects (immutable values)
- Define domain errors
- Define repository interfaces (contracts)
- Define specifications (business rules)

**Rules**:

- ❌ No dependencies on outer layers
- ❌ No framework dependencies
- ❌ No database/API concerns
- ✅ Pure business logic only
- ✅ Framework-agnostic TypeScript

**Example**:

```typescript
// Domain Entity
export class Plan {
  readonly id: string;
  readonly key: string;
  readonly active: boolean;

  get isAvailable(): boolean {
    return this.active && this.hasActivePrices;
  }
}

// Domain Error
export class PlanNotFoundError extends DomainError {
  constructor(planId: string) {
    super("PLAN_NOT_FOUND", 404, { planId });
  }
}
```

### 2. Application Layer

**Location**: `src/modules/{module}/application/`

Orchestrates the domain logic to fulfill use cases.

**Responsibilities**:

- Define use cases (application business logic)
- Define DTOs (data transfer objects)
- Define commands (write operations)
- Define queries (read operations)
- Coordinate between domain and infrastructure

**Rules**:

- ✅ Can depend on domain layer
- ❌ Cannot depend on infrastructure or presentation
- ✅ Framework-agnostic
- ✅ Orchestrates domain entities

**Example**:

```typescript
// Use Case
export class CreatePlanUseCase {
  constructor(private planRepository: IPlanRepository) {}

  async execute(dto: CreatePlanDTO): Promise<Plan> {
    // Validate business rules
    // Create domain entities
    // Persist via repository interface
    return await this.planRepository.create(plan);
  }
}
```

### 3. Infrastructure Layer

**Location**: `src/modules/{module}/infrastructure/`

Implements technical details and external concerns.

**Responsibilities**:

- Implement repository interfaces
- Define mappers (convert between layers)
- Define validation schemas
- Integrate with external services (Stripe, etc.)
- Handle database operations

**Rules**:

- ✅ Can depend on domain and application layers
- ✅ Implements domain interfaces
- ✅ Framework-specific code allowed
- ✅ Database/API implementation details

**Example**:

```typescript
// Repository Implementation
export class PrismaPlanRepository implements IPlanRepository {
  async findById(id: string): Promise<Plan | null> {
    const prismaData = await prisma.plan.findUnique({ where: { id } });
    return prismaData ? PlanMapper.toDomain(prismaData) : null;
  }
}

// Mapper
export class PlanMapper {
  static toDomain(prisma: PrismaPlan): Plan {
    return new Plan({ id: prisma.id, key: prisma.key });
  }
}
```

### 4. Presentation Layer

**Location**: `src/modules/{module}/presentation/`

Handles user interface and user interaction.

**Responsibilities**:

- Define Next.js Server Actions
- Define React components
- Define custom hooks
- Handle user input/output
- Format data for display

**Rules**:

- ✅ Can depend on all other layers
- ✅ React/Next.js specific code
- ✅ UI/UX concerns
- ✅ Entry point for users

**Example**:

```typescript
// Server Action
export async function createPlanAction(
  data: unknown,
): Promise<Response<PlanDTO>> {
  const validated = CreatePlanSchema.parse(data);
  const useCase = new CreatePlanUseCase(planRepository);
  const plan = await useCase.execute(validated);
  return ok(planToDTO(plan));
}
```

## Dependency Rule

**The fundamental rule of Clean Architecture:**

> Dependencies can only point inward. Inner layers know nothing about outer layers.

```
Presentation → Infrastructure → Application → Domain
    ✅             ✅              ✅           ❌
```

### What this means:

- **Domain** knows nothing about databases, APIs, UI, or frameworks
- **Application** uses domain interfaces but doesn't know implementation details
- **Infrastructure** implements domain interfaces using real technologies
- **Presentation** coordinates everything to serve users

## Data Flow

### Inbound (User Request → System)

```
User → Presentation → Application → Domain
         (Action)      (Use Case)   (Entity)
           ↓               ↓            ↓
      Infrastructure ← Application ← Domain
       (Repository)     (Use Case)  (Entity)
```

1. User triggers Server Action in Presentation layer
2. Action validates input and calls Use Case
3. Use Case orchestrates domain entities
4. Repository implementation persists changes
5. Response flows back up the layers

### Outbound (System → User Response)

```
Domain → Application → Infrastructure → Presentation → User
(Entity)  (DTO)        (Mapper)        (Action)
```

## Benefits

### 1. Testability

Each layer can be tested independently:

```typescript
// Test domain logic without database
test("Plan should be unavailable when inactive", () => {
  const plan = new Plan({ active: false });
  expect(plan.isAvailable).toBe(false);
});
```

### 2. Flexibility

Swap implementations without changing business logic:

```typescript
// Switch from Prisma to MongoDB
const repository = new MongoPlanRepository(); // Instead of PrismaPlanRepository
const useCase = new CreatePlanUseCase(repository); // Business logic unchanged
```

### 3. Maintainability

Changes are localized:

- UI changes → Presentation layer only
- Database changes → Infrastructure layer only
- Business rules → Domain layer only

### 4. Scalability

Add features without breaking existing code:

```typescript
// Add new use case without modifying entities
export class ArchivePlanUseCase {
  constructor(private planRepository: IPlanRepository) {}
  async execute(id: string): Promise<void> {
    const plan = await this.planRepository.findById(id);
    // Archive logic using existing domain entities
  }
}
```

## Naming Conventions

### Files

- Entities: `{name}.entity.ts`
- Value Objects: `{name}.value-object.ts`
- Use Cases: `{action}-{entity}.use-case.ts`
- DTOs: `{name}.dto.ts`
- Repositories: `{implementation}-{entity}.repository.ts`
- Mappers: `{entity}.mapper.ts`
- Actions: `{entity}.actions.ts`

### Classes

- Entities: `PascalCase` (e.g., `Plan`, `PlanPrice`)
- Use Cases: `{Verb}{Entity}UseCase` (e.g., `CreatePlanUseCase`)
- Errors: `{Entity}{Error}Error` (e.g., `PlanNotFoundError`)
- Repositories: `{Implementation}{Entity}Repository` (e.g., `PrismaPlanRepository`)

## Best Practices

### 1. Keep Domain Pure

```typescript
// ❌ Bad - Domain depends on framework
export class Plan {
  @PrismaColumn()
  id: string;
}

// ✅ Good - Pure TypeScript
export class Plan {
  readonly id: string;
}
```

### 2. Use Dependency Injection

```typescript
// ✅ Good - Use case receives dependencies
export class CreatePlanUseCase {
  constructor(private planRepository: IPlanRepository) {}
}
```

### 3. Validate at Boundaries

```typescript
// ✅ Good - Validate in infrastructure layer
export async function createPlanAction(data: unknown) {
  const validated = CreatePlanSchema.parse(data); // Zod validation
  const useCase = new CreatePlanUseCase(planRepository);
  return await useCase.execute(validated);
}
```

### 4. Map Between Layers

```typescript
// ✅ Good - Use mappers to convert between representations
const domainPlan = PlanMapper.toDomain(prismaPlan);
const prismaPlan = PlanMapper.toPrisma(domainPlan);
```

## Common Patterns

### Repository Pattern

Abstracts data access:

```typescript
interface IPlanRepository {
  findById(id: string): Promise<Plan | null>;
  create(plan: Plan): Promise<Plan>;
}
```

### Specification Pattern

Encapsulates business rules:

```typescript
export class PlanIsActiveSpecification {
  isSatisfiedBy(plan: Plan): boolean {
    return plan.active;
  }
}
```

### Value Object Pattern

Immutable values with behavior:

```typescript
export class Price {
  readonly amountCents: number;
  readonly currency: string;

  format(locale: string): string {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: this.currency,
    }).format(this.dollars);
  }
}
```

## References

- [Clean Architecture by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design by Eric Evans](https://www.domainlanguage.com/ddd/)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
