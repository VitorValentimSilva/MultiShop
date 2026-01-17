# Plan Module Documentation

## Overview

The Plan module manages subscription plans in the MultiShop system. It follows Clean Architecture principles with four distinct layers and demonstrates the complete implementation pattern for all future modules.

## Module Structure

```
src/modules/plan/
├── domain/                 # Business logic (Pure TypeScript)
├── application/            # Use cases (Orchestration)
├── infrastructure/         # Implementation details (Prisma, Zod)
├── presentation/           # User interface (Server Actions, Components)
└── index.ts               # Public API
```

## Domain Model

### Core Entities

#### Plan (Aggregate Root)

Represents a subscription plan with pricing and features.

```typescript
class Plan {
  readonly id: string;
  readonly key: string; // Unique identifier (e.g., "basic", "pro")
  readonly active: boolean;
  readonly stripeProductId: string | null;
  readonly translations: PlanTranslation[];
  readonly prices: PlanPrice[];
  readonly features: PlanFeature[];

  // Domain methods
  get isAvailable(): boolean;
  getTranslation(locale: string): PlanTranslation | undefined;
  getActivePrices(): PlanPrice[];
  getCheapestPrice(): PlanPrice | undefined;
}
```

#### PlanPrice

Represents a pricing option for a plan.

```typescript
class PlanPrice {
  readonly id: string;
  readonly planId: string;
  readonly price: Price; // Value object
  readonly interval: BillingInterval;
  readonly stripePriceId: string | null;
  readonly active: boolean;

  getDisplayPrice(locale?: string): string;
  getMonthlyEquivalent(): number;
}
```

#### PlanFeature

Links a feature to a plan with optional limits.

```typescript
class PlanFeature {
  readonly planId: string;
  readonly featureId: string;
  readonly included: boolean;
  readonly note: string | null;
  readonly limitValue: number | null;
  readonly limitUnit: string | null;

  get hasLimit(): boolean;
  getFormattedLimit(): string | null;
}
```

#### PlanTranslation

Localized content for a plan.

```typescript
class PlanTranslation {
  readonly id: string;
  readonly planId: string;
  readonly locale: string;
  readonly title: string;
  readonly subtitle: string | null;
  readonly description: string | null;
}
```

### Value Objects

#### Price

Represents a monetary amount with currency.

```typescript
class Price {
  readonly amountCents: number;
  readonly currency: string;

  static fromCents(amount: number, currency: string): Price;
  static fromDollars(amount: number, currency: string): Price;

  get dollars(): number;
  get isFree(): boolean;
  format(locale: string): string;
  equals(other: Price): boolean;
}
```

#### BillingInterval

Enumeration of billing intervals.

```typescript
enum BillingInterval {
  MONTH = "MONTH",
  YEAR = "YEAR",
  WEEK = "WEEK",
  DAY = "DAY",
}
```

### Specifications (Business Rules)

#### PlanIsActiveSpecification

```typescript
class PlanIsActiveSpecification {
  isSatisfiedBy(plan: Plan): boolean {
    return plan.active;
  }
}
```

#### PlanHasValidPriceSpecification

```typescript
class PlanHasValidPriceSpecification {
  isSatisfiedBy(plan: Plan): boolean {
    return plan.hasActivePrices;
  }
}
```

### Domain Errors

- `PlanNotFoundError` - Plan doesn't exist
- `InvalidPlanPriceError` - Invalid price configuration
- `PlanInactiveError` - Plan is not active

## Use Cases

### CreatePlanUseCase

Creates a new plan with translations, prices, and features.

**Input**: `CreatePlanDTO`
**Output**: `Plan`

**Business Rules**:

- Plan key must be unique
- At least one translation required
- At least one price required
- Features are optional

**Example**:

```typescript
const useCase = new CreatePlanUseCase(planRepository);
const plan = await useCase.execute({
  key: "pro",
  translations: [
    { locale: "en", title: "Pro Plan", subtitle: "For professionals" },
  ],
  prices: [
    { amountCents: 2999, currency: "USD", interval: BillingInterval.MONTH },
  ],
  features: [{ featureId: "feature-1", included: true }],
});
```

### GetAllPlansUseCase

Retrieves all plans or only active plans.

**Input**: `locale?: string`, `activeOnly?: boolean`
**Output**: `Plan[]`

**Example**:

```typescript
const useCase = new GetAllPlansUseCase(planRepository);
const plans = await useCase.execute("en", true); // Active plans in English
```

### GetPlanByIdUseCase

Retrieves a specific plan by ID.

**Input**: `id: string`, `locale?: string`
**Output**: `Plan`
**Throws**: `PlanNotFoundError`

### UpdatePlanUseCase

Updates an existing plan.

**Input**: `id: string`, `UpdatePlanDTO`
**Output**: `Plan`
**Throws**: `PlanNotFoundError`

**Note**: Updating translations, prices, or features replaces all existing entries.

### DeletePlanUseCase

Deletes a plan.

**Input**: `id: string`
**Output**: `void`
**Throws**: `PlanNotFoundError`

### GetPlansByLocaleUseCase

Retrieves active plans for a specific locale.

**Input**: `locale: string`
**Output**: `Plan[]`

## Server Actions

All actions are available via Next.js Server Actions in the presentation layer.

### createPlanAction

```typescript
"use server";
export async function createPlanAction(
  data: unknown,
): Promise<Response<PlanResponseDTO>>;
```

### getAllPlansAction

```typescript
"use server";
export async function getAllPlansAction(
  locale?: string,
  activeOnly?: boolean,
): Promise<Response<PlanResponseDTO[]>>;
```

### getPlanByIdAction

```typescript
"use server";
export async function getPlanByIdAction(
  id: string,
  locale?: string,
): Promise<Response<PlanResponseDTO>>;
```

### updatePlanAction

```typescript
"use server";
export async function updatePlanAction(
  id: string,
  data: unknown,
): Promise<Response<PlanResponseDTO>>;
```

### deletePlanAction

```typescript
"use server";
export async function deletePlanAction(id: string): Promise<Response<void>>;
```

### getPlansByLocaleAction

```typescript
"use server";
export async function getPlansByLocaleAction(
  locale: string,
): Promise<Response<PlanResponseDTO[]>>;
```

## Usage Examples

### Creating a Plan

```typescript
import { createPlanAction } from "@/modules/plan";

const result = await createPlanAction({
  key: "enterprise",
  active: true,
  translations: [
    {
      locale: "en",
      title: "Enterprise Plan",
      subtitle: "For large organizations",
      description: "Includes all features plus dedicated support",
    },
    {
      locale: "pt-BR",
      title: "Plano Enterprise",
      subtitle: "Para grandes organizações",
      description: "Inclui todos os recursos mais suporte dedicado",
    },
  ],
  prices: [
    {
      amountCents: 9999,
      currency: "USD",
      interval: "MONTH",
    },
    {
      amountCents: 99999,
      currency: "USD",
      interval: "YEAR",
    },
  ],
  features: [
    { featureId: "unlimited-users", included: true },
    {
      featureId: "api-access",
      included: true,
      limitValue: 100000,
      limitUnit: "requests/month",
    },
    { featureId: "support", included: true, note: "24/7 dedicated support" },
  ],
});

if (result.success) {
  console.log("Plan created:", result.data);
} else {
  console.error("Error:", result.errorCode);
}
```

### Listing Plans for Display

```typescript
import { getAllPlansAction } from "@/modules/plan";

// In a component or page
const plansResult = await getAllPlansAction("en", true);

if (plansResult.success) {
  const plans = plansResult.data;

  return (
    <div>
      {plans.map(plan => (
        <div key={plan.id}>
          <h3>{plan.translation?.title}</h3>
          <p>{plan.translation?.subtitle}</p>
          {plan.prices.map(price => (
            <div key={price.id}>
              <span>{price.formattedPrice}</span>
              <span>/{price.interval.toLowerCase()}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

### Using in a Form

```typescript
"use client";

import { createPlanAction } from "@/modules/plan";
import { useState } from "react";

export function CreatePlanForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);

    const data = {
      key: formData.get("key"),
      translations: [{
        locale: "en",
        title: formData.get("title"),
        subtitle: formData.get("subtitle"),
      }],
      prices: [{
        amountCents: Number(formData.get("price")) * 100,
        currency: "USD",
        interval: formData.get("interval"),
      }],
    };

    const result = await createPlanAction(data);

    if (result.success) {
      // Handle success
    } else {
      // Handle error
    }

    setIsLoading(false);
  }

  return <form action={handleSubmit}>...</form>;
}
```

## Database Schema

The Plan module uses the following Prisma models:

```prisma
model Plan {
  id              String
  key             String @unique
  active          Boolean
  stripeProductId String?

  translations PlanTranslation[]
  prices       PlanPrice[]
  features     PlanFeature[]

  createdAt DateTime
  updatedAt DateTime
}

model PlanPrice {
  id            String
  planId        String
  amountCents   Int
  currency      String
  interval      BillingInterval
  stripePriceId String?
  active        Boolean

  plan Plan @relation(...)
}

model PlanTranslation {
  id          String
  locale      String
  title       String
  subtitle    String?
  description String?
  planId      String

  plan Plan @relation(...)
}

model PlanFeature {
  planId     String
  featureId  String
  included   Boolean
  note       String?
  limitValue Int?
  limitUnit  String?

  plan    Plan
  feature Feature
}
```

## Validation

All input is validated using Zod schemas at the infrastructure boundary:

### CreatePlanSchema

```typescript
const CreatePlanSchema = z.object({
  key: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/),
  active: z.boolean().optional(),
  translations: z.array(PlanTranslationSchema).min(1),
  prices: z.array(PlanPriceSchema).min(1),
  features: z.array(PlanFeatureSchema).optional(),
});
```

## Integration with Stripe

The module is designed to integrate with Stripe:

- `stripeProductId` links to Stripe Product
- `stripePriceId` links to Stripe Price
- External service integration can be added in `infrastructure/external-services/`

## Testing

### Unit Tests

Test domain logic in isolation:

```typescript
describe("Plan", () => {
  it("should be unavailable when inactive", () => {
    const plan = new Plan({ active: false, prices: [] });
    expect(plan.isAvailable).toBe(false);
  });
});
```

### Integration Tests

Test repository implementation:

```typescript
describe("PrismaPlanRepository", () => {
  it("should create and retrieve a plan", async () => {
    const plan = new Plan({ ... });
    const created = await repository.create(plan);
    const retrieved = await repository.findById(created.id);
    expect(retrieved).toEqual(created);
  });
});
```

### E2E Tests

Test server actions:

```typescript
describe("createPlanAction", () => {
  it("should create a plan successfully", async () => {
    const result = await createPlanAction({ ... });
    expect(result.success).toBe(true);
  });
});
```

## Future Enhancements

Potential additions to the Plan module:

1. **Plan Comparison**: Compare features across plans
2. **Plan Recommendations**: Suggest best plan based on usage
3. **Trial Periods**: Add trial period support
4. **Plan Analytics**: Track plan popularity and conversions
5. **Custom Pricing**: Support custom enterprise pricing
6. **Plan Versioning**: Track plan changes over time
7. **Addon Features**: Support additional features as addons

## Related Modules

The Plan module interacts with:

- **User Module**: Users subscribe to plans
- **Tenant Module**: Tenants are assigned plans
- **Feature Module**: Plans include features
- **Payment Module**: Plans have prices
- **Review Module**: Plans can be reviewed

## API Reference

See the barrel export (`index.ts`) for the complete public API.

## Questions?

For questions about the Plan module:

1. Check this documentation
2. Review the code with inline comments
3. See the architecture documentation
4. Check the test files for usage examples
