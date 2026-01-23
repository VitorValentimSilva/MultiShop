# Middlewares

This folder contains custom middleware functions for the application.

## Planned Middlewares

- `auth.middleware.ts` - Authentication middleware
- `rate-limit.middleware.ts` - Rate limiting middleware
- `tenant.middleware.ts` - Multi-tenant resolution middleware
- `error-handler.middleware.ts` - Global error handler middleware
- `logging.middleware.ts` - Request/response logging middleware

## Usage

Middlewares should be pure functions that can be composed together.

```typescript
import { authMiddleware, tenantMiddleware } from "@/core/middlewares";

// Apply in Next.js middleware
export const config = {
  matcher: ["/api/:path*"],
};
```
