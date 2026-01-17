# Migration Guide - Enterprise Architecture

## Overview

This guide helps migrate existing code to the new Clean Architecture structure. The restructuring moves code from `app/_*` directories to a proper layered architecture in `src/`.

## Quick Reference

### Path Mappings

| Old Path               | New Path                                   | Notes                    |
| ---------------------- | ------------------------------------------ | ------------------------ |
| `app/_lib/prisma.ts`   | `src/shared/lib/database/prisma.client.ts` | Database client          |
| `app/_lib/stripe.ts`   | `src/shared/lib/payments/stripe.client.ts` | Payment client           |
| `app/_lib/utils.ts`    | `src/shared/lib/utils/cn.ts`               | Tailwind merge utility   |
| `app/_lib/response.ts` | `src/shared/lib/utils/response.ts`         | Response helpers         |
| `app/_lib/auth/*`      | `src/shared/lib/auth/*`                    | Authentication           |
| `app/_lib/i18n/*`      | `src/shared/lib/i18n/*`                    | Internationalization     |
| `app/_types/api.ts`    | `src/shared/types/api.types.ts`            | API types                |
| `app/_types/db.ts`     | `src/shared/types/database.types.ts`       | Database types           |
| `app/_errors/*`        | `src/shared/errors/*`                      | Error classes            |
| `app/_locales/*`       | `locales/*`                                | Translation files (root) |

### Import Updates

**Before**:

```typescript
import { prisma } from "@/app/_lib/prisma";
import { stripe } from "@/app/_lib/stripe";
import { cn } from "@/app/_lib/utils";
import { ok, fail } from "@/app/_lib/response";
import { Response } from "@/app/_types/api";
```

**After**:

```typescript
import { prisma } from "@/shared/lib/database";
import { stripe } from "@/shared/lib/payments";
import { cn } from "@/shared/lib/utils";
import { ok, fail } from "@/shared/lib/utils";
import { Response } from "@/shared/types/api.types";
```

## Step-by-Step Migration

### 1. Update Import Statements

#### Find and Replace Patterns

Use your IDE's find-and-replace (Ctrl+Shift+H in VS Code):

```
Find: @/app/_lib/prisma
Replace: @/shared/lib/database

Find: @/app/_lib/stripe
Replace: @/shared/lib/payments

Find: @/app/_lib/utils
Replace: @/shared/lib/utils

Find: @/app/_lib/response
Replace: @/shared/lib/utils

Find: @/app/_lib/auth
Replace: @/shared/lib/auth

Find: @/app/_lib/i18n
Replace: @/shared/lib/i18n

Find: @/app/_types/api
Replace: @/shared/types/api.types

Find: @/app/_errors
Replace: @/shared/errors
```

### 2. Update Component Imports

If you have UI components in `app/_components/`:

**Global Components** → `src/shared/ui/components/`
**Module-Specific Components** → `src/modules/{module}/presentation/components/`

**Before**:

```typescript
import { Button } from "@/app/_components/ui/button";
```

**After**:

```typescript
// For global components
import { Button } from "@/shared/ui/components/button";

// Or if it's module-specific
import { PlanCard } from "@/modules/plan/presentation/components/plan-card";
```

### 3. Update Server Actions

Move server actions from `app/_actions/` to module structure.

**Before** (`app/_actions/plan/create.ts`):

```typescript
"use server";
import { prisma } from "@/app/_lib/prisma";

export async function createPlan(data: any) {
  const plan = await prisma.plan.create({ data });
  return plan;
}
```

**After** (Use the new module):

```typescript
"use server";
import { createPlanAction } from "@/modules/plan";

// Just use the action from the module
export { createPlanAction };
```

Or if you need custom logic:

```typescript
"use server";
import { CreatePlanUseCase, PrismaPlanRepository } from "@/modules/plan";

export async function createPlan(data: CreatePlanDTO) {
  const repository = new PrismaPlanRepository();
  const useCase = new CreatePlanUseCase(repository);
  return await useCase.execute(data);
}
```

### 4. Migrate DTOs

Move DTOs from `app/_types/dto/` to their respective modules.

**Before** (`app/_types/dto/plan.ts`):

```typescript
export interface CreatePlanDTO {
  key: string;
  title: string;
}
```

**After** (`src/modules/plan/application/dtos/create-plan.dto.ts`):

```typescript
export interface CreatePlanDTO {
  key: string;
  translations: {
    locale: string;
    title: string;
  }[];
  // ... complete DTO definition
}
```

**Import**:

```typescript
import type { CreatePlanDTO } from "@/modules/plan";
```

### 5. Migrate Error Handling

**Before** (`app/_errors/plan/plan-error.ts`):

```typescript
import { MainError } from "@/app/_errors/main";

export class PlanError extends MainError {
  constructor(code: string) {
    super(code, 400);
  }
}
```

**After**:
Use domain-specific errors from the module:

```typescript
import { PlanNotFoundError, InvalidPlanPriceError } from "@/modules/plan";

// Or for custom errors
import { DomainError } from "@/shared/errors";

export class CustomPlanError extends DomainError {
  constructor(message: string) {
    super("CUSTOM_PLAN_ERROR", 400, { message });
  }
}
```

### 6. Update Environment Variables

**Before** (accessing directly):

```typescript
const dbUrl = process.env.DATABASE_URL;
const stripeKey = process.env.STRIPE_SECRET_KEY;
```

**After** (using validated env):

```typescript
import { env } from "@/config";

const dbUrl = env.DATABASE_URL;
const stripeKey = env.STRIPE_SECRET_KEY;
```

### 7. Update Route Handlers

**Before** (`app/api/plans/route.ts`):

```typescript
import { prisma } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const plans = await prisma.plan.findMany();
  return NextResponse.json(plans);
}
```

**After**:

```typescript
import { getAllPlansAction } from "@/modules/plan";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await getAllPlansAction();

  if (result.success) {
    return NextResponse.json(result.data);
  } else {
    return NextResponse.json({ error: result.errorCode }, { status: 400 });
  }
}
```

### 8. Update Page Components

**Before** (`app/[locale]/plans/page.tsx`):

```typescript
import { prisma } from "@/app/_lib/prisma";

export default async function PlansPage() {
  const plans = await prisma.plan.findMany({
    include: { translations: true, prices: true }
  });

  return <div>{/* render plans */}</div>;
}
```

**After**:

```typescript
import { getAllPlansAction } from "@/modules/plan";

export default async function PlansPage() {
  const result = await getAllPlansAction("en", true);

  if (!result.success) {
    return <div>Error loading plans</div>;
  }

  const plans = result.data;
  return <div>{/* render plans */}</div>;
}
```

## Module-Specific Migrations

### Migrating Plan-Related Code

1. **Identify plan-related code**:
   - Search for `prisma.plan`
   - Look in `app/_actions/plan*`
   - Check `app/_types/dto/plan*`

2. **Use the Plan module**:

```typescript
// Instead of direct Prisma calls
import {
  getAllPlansAction,
  createPlanAction,
  updatePlanAction,
  deletePlanAction,
} from "@/modules/plan";
```

3. **Update forms**:

```typescript
async function handleSubmit(formData: FormData) {
  const data = {
    key: formData.get("key"),
    translations: [{ locale: "en", title: formData.get("title") }],
    prices: [{ amountCents: 9900, currency: "USD", interval: "MONTH" }],
  };

  const result = await createPlanAction(data);

  if (result.success) {
    // Success
  } else {
    // Handle error: result.errorCode
  }
}
```

### Creating New Modules

For features not yet migrated (e.g., User, Tenant):

1. **Follow the Plan module structure**:

```bash
mkdir -p src/modules/{module-name}/{domain,application,infrastructure,presentation}
```

2. **Create layers in order**:
   - Domain (entities, value objects, interfaces)
   - Application (use cases, DTOs)
   - Infrastructure (repositories, mappers, schemas)
   - Presentation (actions, components)

3. **Export public API**:

```typescript
// src/modules/{module-name}/index.ts
export { Entity } from "./domain/entities/entity";
export { CreateEntityUseCase } from "./application/use-cases/create-entity.use-case";
export { createEntityAction } from "./presentation/actions/entity.actions";
```

## Common Issues and Solutions

### Issue 1: Circular Dependencies

**Problem**:

```typescript
// Module A imports Module B
// Module B imports Module A
```

**Solution**:
Use events or dependency injection:

```typescript
// Instead of importing directly
// Use an event system or pass dependencies via constructor
```

### Issue 2: Prisma Type Errors

**Problem**:

```
Type 'PrismaPlan' is not assignable to type 'Plan'
```

**Solution**:
Use mappers:

```typescript
import { PlanMapper } from "@/modules/plan";

const prismaPlan = await prisma.plan.findUnique({ where: { id } });
const domainPlan = PlanMapper.toDomain(prismaPlan);
```

### Issue 3: Import Path Not Found

**Problem**:

```
Cannot find module '@/shared/lib/database'
```

**Solution**:
Check `tsconfig.json` has correct path aliases:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/modules/*": ["./src/modules/*"]
    }
  }
}
```

### Issue 4: Build Errors After Migration

**Problem**:
Build fails with type errors

**Solution**:

1. Delete `.next` folder
2. Run `npm install`
3. Run `npm run build`
4. Check for missing dependencies

## Testing After Migration

### 1. Test Build

```bash
npm run build
```

### 2. Test Development Server

```bash
npm run dev
```

### 3. Test Key Flows

- Create a plan
- List plans
- Update a plan
- Delete a plan

### 4. Test Edge Cases

- Invalid input
- Missing translations
- Duplicate keys
- Database errors

## Rollback Plan

If migration causes issues:

1. **Revert specific files**:

```bash
git checkout HEAD -- path/to/file
```

2. **Revert all changes**:

```bash
git reset --hard HEAD
```

3. **Keep both old and new**:
   - Old code in `app/_*`
   - New code in `src/*`
   - Gradually migrate

## Checklist

Use this checklist when migrating a module:

- [ ] Domain layer created
  - [ ] Entities defined
  - [ ] Value objects created
  - [ ] Repository interface defined
  - [ ] Specifications added
  - [ ] Domain errors defined

- [ ] Application layer created
  - [ ] Use cases implemented
  - [ ] DTOs defined
  - [ ] Commands created (optional)
  - [ ] Queries created (optional)

- [ ] Infrastructure layer created
  - [ ] Repository implemented
  - [ ] Mappers created
  - [ ] Validation schemas defined
  - [ ] External services integrated

- [ ] Presentation layer created
  - [ ] Server actions created
  - [ ] Components created
  - [ ] Hooks created (if needed)

- [ ] Barrel export created
  - [ ] Public API exported
  - [ ] Types exported
  - [ ] Internal details hidden

- [ ] Tests added
  - [ ] Unit tests for domain
  - [ ] Integration tests for repository
  - [ ] E2E tests for actions

- [ ] Documentation updated
  - [ ] Module documented
  - [ ] Examples provided
  - [ ] API reference added

- [ ] Old code removed/updated
  - [ ] Imports updated
  - [ ] Old actions removed
  - [ ] Old types removed
  - [ ] Old errors removed

- [ ] Build passes
  - [ ] `npm run build` succeeds
  - [ ] No TypeScript errors
  - [ ] No lint errors

- [ ] Functionality verified
  - [ ] Manual testing done
  - [ ] All features work
  - [ ] No regressions

## Getting Help

If you need help with migration:

1. **Review documentation**:
   - `docs/architecture.md` - Architecture overview
   - `docs/modules.md` - Module structure
   - `docs/plan-module.md` - Example module

2. **Check existing code**:
   - Look at the Plan module as reference
   - Review mappers, use cases, and actions

3. **Common patterns**:
   - Always validate at boundaries
   - Always use mappers between layers
   - Always handle errors gracefully
   - Always export via barrel files

## Next Steps

After migrating Plan module:

1. **Migrate other modules**:
   - User module
   - Tenant module
   - Feature module
   - Review module

2. **Add advanced features**:
   - Event system for module communication
   - CQRS for complex operations
   - Domain events for side effects

3. **Improve testing**:
   - Add more unit tests
   - Add integration tests
   - Add E2E tests

4. **Optimize performance**:
   - Add caching layer
   - Optimize database queries
   - Add pagination

Happy migrating! 🚀
