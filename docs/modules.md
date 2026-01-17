# Module Structure Guide

## Overview

This project follows a modular monolith architecture where each domain concept is organized into its own module. Each module is self-contained with its own layers following Clean Architecture principles.

## Module Organization

```
src/modules/
├── plan/                    # Example module
│   ├── domain/             # Business logic layer
│   ├── application/        # Use case layer
│   ├── infrastructure/     # Technical implementation layer
│   ├── presentation/       # UI/API layer
│   ├── __tests__/          # Module tests
│   └── index.ts            # Public API (barrel export)
├── user/                   # Another module
├── tenant/                 # Another module
└── ...
```

## Complete Module Structure

### Domain Layer (`domain/`)

```
domain/
├── entities/               # Business entities
│   ├── {entity}.entity.ts
│   └── {related}.entity.ts
├── value-objects/          # Immutable value objects
│   └── {name}.value-object.ts
├── repositories/           # Repository interfaces (contracts)
│   └── {entity}.repository.interface.ts
├── specifications/         # Business rule specifications
│   └── {rule}.specification.ts
└── errors/                 # Domain-specific errors
    └── {error-name}.error.ts
```

**Example**:

```typescript
// entities/plan.entity.ts
export class Plan {
  readonly id: string;
  readonly key: string;
  readonly active: boolean;

  constructor(props: {...}) {
    // Initialize
  }

  // Domain methods
  get isAvailable(): boolean {
    return this.active && this.hasActivePrices;
  }
}

// value-objects/price.value-object.ts
export class Price {
  readonly amountCents: number;
  readonly currency: string;

  static fromCents(amount: number, currency: string): Price {
    // Validation and creation
  }

  format(locale: string): string {
    // Formatting logic
  }
}

// repositories/plan.repository.interface.ts
export interface IPlanRepository {
  findById(id: string): Promise<Plan | null>;
  create(plan: Plan): Promise<Plan>;
}

// errors/plan-not-found.error.ts
export class PlanNotFoundError extends DomainError {
  constructor(planId: string) {
    super("PLAN_NOT_FOUND", 404, { planId });
  }
}
```

### Application Layer (`application/`)

```
application/
├── use-cases/              # Business use cases
│   ├── create-{entity}.use-case.ts
│   ├── update-{entity}.use-case.ts
│   ├── delete-{entity}.use-case.ts
│   └── get-{entity}.use-case.ts
├── commands/               # Write operations (CQRS)
│   ├── create-{entity}.command.ts
│   └── update-{entity}.command.ts
├── queries/                # Read operations (CQRS)
│   ├── get-all-{entity}.query.ts
│   └── get-{entity}-by-id.query.ts
└── dtos/                   # Data transfer objects
    ├── create-{entity}.dto.ts
    ├── update-{entity}.dto.ts
    └── {entity}-response.dto.ts
```

**Example**:

```typescript
// use-cases/create-plan.use-case.ts
export class CreatePlanUseCase {
  constructor(private planRepository: IPlanRepository) {}

  async execute(dto: CreatePlanDTO): Promise<Plan> {
    // Business logic orchestration
    const plan = new Plan({ ...dto });
    return await this.planRepository.create(plan);
  }
}

// dtos/create-plan.dto.ts
export interface CreatePlanDTO {
  key: string;
  translations: { locale: string; title: string }[];
  prices: { amountCents: number; currency: string }[];
}

// dtos/plan-response.dto.ts
export interface PlanResponseDTO {
  id: string;
  key: string;
  active: boolean;
  translation?: { title: string; subtitle: string };
  prices: PriceDTO[];
}
```

### Infrastructure Layer (`infrastructure/`)

```
infrastructure/
├── repositories/           # Repository implementations
│   └── prisma-{entity}.repository.ts
├── mappers/                # Domain ↔ Persistence mappers
│   ├── {entity}.mapper.ts
│   └── {related}.mapper.ts
├── schemas/                # Validation schemas (Zod)
│   ├── create-{entity}.schema.ts
│   ├── update-{entity}.schema.ts
│   └── {entity}-query.schema.ts
└── external-services/      # External API integrations
    └── stripe-{entity}.service.ts
```

**Example**:

```typescript
// repositories/prisma-plan.repository.ts
export class PrismaPlanRepository implements IPlanRepository {
  async findById(id: string): Promise<Plan | null> {
    const prismaData = await prisma.plan.findUnique({ where: { id } });
    return prismaData ? PlanMapper.toDomain(prismaData) : null;
  }

  async create(plan: Plan): Promise<Plan> {
    const data = PlanMapper.toPrisma(plan);
    const created = await prisma.plan.create({ data });
    return PlanMapper.toDomain(created);
  }
}

// mappers/plan.mapper.ts
export class PlanMapper {
  static toDomain(prisma: PrismaPlan): Plan {
    return new Plan({
      id: prisma.id,
      key: prisma.key,
      active: prisma.active,
    });
  }

  static toPrisma(domain: Plan) {
    return {
      id: domain.id,
      key: domain.key,
      active: domain.active,
    };
  }
}

// schemas/create-plan.schema.ts
export const CreatePlanSchema = z.object({
  key: z.string().min(2).max(100),
  translations: z.array(PlanTranslationSchema).min(1),
  prices: z.array(PlanPriceSchema).min(1),
});
```

### Presentation Layer (`presentation/`)

```
presentation/
├── actions/                # Next.js Server Actions
│   └── {entity}.actions.ts
├── components/             # Module-specific React components
│   ├── {entity}-card.tsx
│   ├── {entity}-list.tsx
│   └── {entity}-form.tsx
└── hooks/                  # Module-specific hooks
    ├── use-{entity}.ts
    └── use-{entity}s.ts
```

**Example**:

```typescript
// actions/plan.actions.ts
"use server";

export async function createPlanAction(data: unknown): Promise<Response<PlanDTO>> {
  const validated = CreatePlanSchema.parse(data);
  const useCase = new CreatePlanUseCase(planRepository);
  const plan = await useCase.execute(validated);
  return ok(planToResponseDTO(plan));
}

// components/plan-card.tsx
export function PlanCard({ plan }: { plan: PlanResponseDTO }) {
  return (
    <div>
      <h3>{plan.translation?.title}</h3>
      <p>{formatCurrency(plan.prices[0].amountCents)}</p>
    </div>
  );
}

// hooks/use-plan.ts
export function usePlan(id: string) {
  const [plan, setPlan] = useState<PlanResponseDTO | null>(null);

  useEffect(() => {
    getPlanByIdAction(id).then(response => {
      if (response.success) setPlan(response.data);
    });
  }, [id]);

  return plan;
}
```

### Tests (`__tests__/`)

```
__tests__/
├── unit/                   # Unit tests
│   ├── domain/
│   │   ├── {entity}.entity.spec.ts
│   │   └── specifications/
│   └── application/
│       └── use-cases/
├── integration/            # Integration tests
│   ├── infrastructure/
│   │   └── repositories/
│   └── application/
└── e2e/                    # End-to-end tests
    └── presentation/
        └── actions/
```

### Barrel Export (`index.ts`)

```typescript
// Domain exports
export { Plan } from "./domain/entities/plan.entity";
export { Price } from "./domain/value-objects/price.value-object";
export type { IPlanRepository } from "./domain/repositories/plan.repository.interface";

// Application exports
export { CreatePlanUseCase } from "./application/use-cases/create-plan.use-case";
export type { CreatePlanDTO } from "./application/dtos/create-plan.dto";

// Infrastructure exports
export { PrismaPlanRepository } from "./infrastructure/repositories/prisma-plan.repository";

// Presentation exports
export { createPlanAction } from "./presentation/actions/plan.actions";
export { PlanCard } from "./presentation/components/plan-card";
```

## Creating a New Module

### Step 1: Create Directory Structure

```bash
mkdir -p src/modules/{module-name}/{domain/{entities,value-objects,repositories,specifications,errors},application/{use-cases,dtos},infrastructure/{repositories,mappers,schemas},presentation/{actions,components,hooks}}
```

### Step 2: Create Domain Layer

1. **Create Entity**:

```typescript
// domain/entities/product.entity.ts
export class Product {
  readonly id: string;
  readonly name: string;
  readonly price: Price;

  constructor(props: ProductProps) {
    this.id = props.id;
    this.name = props.name;
    this.price = props.price;
  }

  // Domain methods
  get isAvailable(): boolean {
    return this.stock > 0;
  }
}
```

2. **Create Repository Interface**:

```typescript
// domain/repositories/product.repository.interface.ts
export interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  create(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
}
```

3. **Create Domain Errors**:

```typescript
// domain/errors/product-not-found.error.ts
export class ProductNotFoundError extends DomainError {
  constructor(productId: string) {
    super("PRODUCT_NOT_FOUND", 404, { productId });
  }
}
```

### Step 3: Create Application Layer

1. **Create DTOs**:

```typescript
// application/dtos/create-product.dto.ts
export interface CreateProductDTO {
  name: string;
  price: number;
  currency: string;
}

// application/dtos/product-response.dto.ts
export interface ProductResponseDTO {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
}
```

2. **Create Use Cases**:

```typescript
// application/use-cases/create-product.use-case.ts
export class CreateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(dto: CreateProductDTO): Promise<Product> {
    const price = Price.fromDollars(dto.price, dto.currency);
    const product = new Product({
      id: randomUUID(),
      name: dto.name,
      price,
    });

    return await this.productRepository.create(product);
  }
}
```

### Step 4: Create Infrastructure Layer

1. **Create Repository Implementation**:

```typescript
// infrastructure/repositories/prisma-product.repository.ts
export class PrismaProductRepository implements IProductRepository {
  async findById(id: string): Promise<Product | null> {
    const data = await prisma.product.findUnique({ where: { id } });
    return data ? ProductMapper.toDomain(data) : null;
  }

  async create(product: Product): Promise<Product> {
    const data = ProductMapper.toPrisma(product);
    const created = await prisma.product.create({ data });
    return ProductMapper.toDomain(created);
  }
}
```

2. **Create Mapper**:

```typescript
// infrastructure/mappers/product.mapper.ts
export class ProductMapper {
  static toDomain(prisma: PrismaProduct): Product {
    return new Product({
      id: prisma.id,
      name: prisma.name,
      price: Price.fromCents(prisma.priceCents, prisma.currency),
    });
  }

  static toPrisma(domain: Product) {
    return {
      id: domain.id,
      name: domain.name,
      priceCents: domain.price.amountCents,
      currency: domain.price.currency,
    };
  }
}
```

3. **Create Validation Schema**:

```typescript
// infrastructure/schemas/create-product.schema.ts
export const CreateProductSchema = z.object({
  name: z.string().min(1).max(255),
  price: z.number().positive(),
  currency: z.string().length(3),
});
```

### Step 5: Create Presentation Layer

1. **Create Server Actions**:

```typescript
// presentation/actions/product.actions.ts
"use server";

export async function createProductAction(
  data: unknown,
): Promise<Response<ProductResponseDTO>> {
  const validated = CreateProductSchema.parse(data);
  const useCase = new CreateProductUseCase(productRepository);
  const product = await useCase.execute(validated);
  return ok(productToDTO(product));
}
```

2. **Create Components**:

```typescript
// presentation/components/product-card.tsx
export function ProductCard({ product }: { product: ProductResponseDTO }) {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>{product.formattedPrice}</p>
    </div>
  );
}
```

### Step 6: Create Barrel Export

```typescript
// index.ts
export { Product } from "./domain/entities/product.entity";
export type { IProductRepository } from "./domain/repositories/product.repository.interface";
export { CreateProductUseCase } from "./application/use-cases/create-product.use-case";
export { PrismaProductRepository } from "./infrastructure/repositories/prisma-product.repository";
export { createProductAction } from "./presentation/actions/product.actions";
```

## Module Communication

### Rule: Modules communicate via Public APIs

```typescript
// ✅ Good - Use public barrel export
import { Plan, getAllPlansAction } from "@/modules/plan";

// ❌ Bad - Access internal implementation
import { PrismaPlanRepository } from "@/modules/plan/infrastructure/repositories/prisma-plan.repository";
```

### Cross-Module Dependencies

When one module needs another:

```typescript
// In Product module, need Plan information
import { Plan, getPlanByIdAction } from "@/modules/plan";

export class ProductUseCase {
  async execute(productData: ProductDTO) {
    // Use Plan module's public API
    const planResponse = await getPlanByIdAction(productData.planId);
    if (planResponse.success) {
      const plan = planResponse.data;
      // Use plan data
    }
  }
}
```

## Best Practices

### 1. Keep Modules Cohesive

- Each module should represent a bounded context
- Related functionality stays together
- Unrelated functionality stays separate

### 2. Minimize Cross-Module Dependencies

- Use events for loose coupling
- Use public APIs only
- Avoid circular dependencies

### 3. Follow Naming Conventions

- Be consistent across modules
- Use descriptive names
- Follow TypeScript conventions

### 4. Test Each Layer

- Unit test domain logic
- Integration test repositories
- E2E test actions

### 5. Document Public APIs

- Add JSDoc comments to barrel exports
- Document expected behavior
- Provide usage examples

## Module Checklist

When creating a new module, ensure:

- [ ] Domain layer is framework-independent
- [ ] Repository interface is defined in domain
- [ ] Use cases orchestrate domain logic
- [ ] DTOs are defined for all boundaries
- [ ] Repository implementation uses mappers
- [ ] Validation schemas are defined
- [ ] Server actions handle errors gracefully
- [ ] Barrel export exposes public API only
- [ ] Tests cover each layer
- [ ] Documentation is updated

## References

- [Domain-Driven Design](https://www.domainlanguage.com/ddd/)
- [Modular Monolith Architecture](https://www.kamilgrzybek.com/design/modular-monolith-primer/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
