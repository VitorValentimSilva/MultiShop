# i18n Infrastructure

This folder will contain internationalization infrastructure components.

## Planned Components

- `i18n-provider.ts` - Server-side i18n provider
- `translations-loader.ts` - Dynamic translation loading
- `format.ts` - Date, number, and currency formatting utilities

## Usage

```typescript
import { getTranslations } from "@/core/infrastructure/i18n";

const t = await getTranslations("common", "pt-BR");
```
