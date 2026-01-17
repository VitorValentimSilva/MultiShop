# 🧪 Estrutura de Testes - MultiShop

## 📁 Organização de Testes

### **Estrutura Principal**

```
tests/
├── unit/                    # Testes unitários (lógica isolada)
│   ├── modules/             # Testes de módulos
│   │   ├── auth/
│   │   │   ├── services/
│   │   │   │   ├── user.service.test.ts
│   │   │   │   └── role.service.test.ts
│   │   │   ├── use-cases/
│   │   │   │   ├── create-user.test.ts
│   │   │   │   └── assign-role.test.ts
│   │   │   └── validators/
│   │   │       └── user.validator.test.ts
│   │   ├── tenant/
│   │   ├── subscription/
│   │   └── ...
│   ├── core/                # Testes do core
│   │   ├── repository/
│   │   └── errors/
│   └── features/            # Testes de features UI
│       ├── shared/
│       │   ├── hooks/
│       │   └── utils/
│       └── ...
│
├── integration/             # Testes de integração (múltiplos componentes)
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login.test.ts
│   │   │   └── register.test.ts
│   │   ├── tenant/
│   │   └── subscription/
│   ├── database/
│   │   ├── repositories/
│   │   │   ├── user.repository.test.ts
│   │   │   └── tenant.repository.test.ts
│   │   └── migrations/
│   └── workflows/
│       ├── user-registration.test.ts
│       └── tenant-creation.test.ts
│
└── e2e/                     # Testes end-to-end (fluxos completos)
    ├── landing/
    │   ├── navigation.test.ts
    │   └── contact-form.test.ts
    ├── auth/
    │   ├── login-flow.test.ts
    │   └── password-reset.test.ts
    ├── tenant/
    │   ├── dashboard.test.ts
    │   ├── settings.test.ts
    │   └── subscription.test.ts
    └── admin/
        ├── user-management.test.ts
        └── tenant-management.test.ts
```

---

## 🎯 Tipos de Testes

### **1. Testes Unitários** (`tests/unit/`)

**O que testar:**

- Services (lógica de negócio isolada)
- Use Cases (casos de uso individuais)
- Validators (regras de validação)
- Utils (funções utilitárias)
- Hooks (custom hooks React)

**Características:**

- ✅ Rápidos (< 100ms por teste)
- ✅ Isolados (mocks para dependências)
- ✅ Específicos (testam 1 coisa)
- ✅ Não acessam banco de dados
- ✅ Não fazem requisições HTTP

**Exemplo:**

```typescript
// tests/unit/modules/auth/services/user.service.test.ts

describe("UserService", () => {
  it("should create user with hashed password", async () => {
    const mockRepo = createMockUserRepository();
    const service = new UserService(mockRepo);

    const result = await service.createUser({
      email: "test@test.com",
      password: "Password123",
      name: "Test User",
    });

    expect(result.ok).toBe(true);
    expect(mockRepo.create).toHaveBeenCalled();
  });
});
```

---

### **2. Testes de Integração** (`tests/integration/`)

**O que testar:**

- API Routes (endpoints completos)
- Repositories (acesso ao banco real)
- Workflows (múltiplos use cases juntos)
- Migrations (estrutura do banco)

**Características:**

- ⚡ Médio (100ms - 1s por teste)
- 🔗 Conectados (usa banco de teste)
- 🎭 Realistas (ambiente similar à produção)
- 📊 Testam integração entre camadas

**Exemplo:**

```typescript
// tests/integration/api/auth/login.test.ts

describe("POST /api/auth/login", () => {
  beforeEach(async () => {
    await setupTestDatabase();
  });

  it("should login with valid credentials", async () => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: "user@test.com",
        password: "Password123",
      }),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("set-cookie")).toContain("session");
  });
});
```

---

### **3. Testes E2E** (`tests/e2e/`)

**O que testar:**

- Fluxos completos do usuário
- Navegação entre páginas
- Formulários e interações
- Experiência real do usuário

**Características:**

- 🐢 Lentos (1s - 10s por teste)
- 🌐 Browser real (Playwright/Cypress)
- 🎬 Testam interface + backend
- 🔍 Detectam problemas de UI

**Exemplo:**

```typescript
// tests/e2e/auth/login-flow.test.ts

describe("Login Flow", () => {
  it("should complete login successfully", async ({ page }) => {
    await page.goto("/");
    await page.click("text=Login");
    await page.fill('[name="email"]', "user@test.com");
    await page.fill('[name="password"]', "Password123");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL("/dashboard");
    await expect(page.locator("text=Welcome")).toBeVisible();
  });
});
```

---

## 📊 Quando Usar Cada Tipo

| Tipo            | Velocidade      | Custo       | Confiança           | Quando Usar                             |
| --------------- | --------------- | ----------- | ------------------- | --------------------------------------- |
| **Unit**        | 🚀 Muito Rápido | 💰 Baixo    | ⭐⭐ Média          | Lógica de negócio, validações, utils    |
| **Integration** | ⚡ Médio        | 💰💰 Médio  | ⭐⭐⭐ Alta         | API, repositories, workflows            |
| **E2E**         | 🐢 Lento        | 💰💰💰 Alto | ⭐⭐⭐⭐ Muito Alta | Fluxos críticos, experiência do usuário |

---

## 🏗️ Estrutura de Teste por Módulo

Cada módulo segue a mesma estrutura:

```
tests/unit/modules/auth/
├── domain/
│   └── errors/              # Testes de errors customizados
├── infrastructure/
│   └── repositories/        # Testes com mock do Prisma
├── application/
│   ├── services/            # Testes de services
│   ├── use-cases/           # Testes de use cases
│   ├── validators/          # Testes de validações Zod
│   └── controllers/         # Testes de controllers/actions
└── presentation/
    └── locales/             # Testes de traduções (opcional)
```

---

## 🛠️ Ferramentas

### **Unit + Integration**

- **Vitest** - Test runner (mais rápido que Jest)
- **@vitest/ui** - Interface visual
- **@vitest/coverage-v8** - Cobertura de código

### **E2E**

- **Playwright** - Browser automation (recomendado)
- **@playwright/test** - Test runner do Playwright

### **Mocks**

- **Prisma Mock** - Mock do Prisma Client
- **MSW** - Mock de API HTTP

---

## 📝 Convenções de Nomenclatura

### **Arquivos de Teste**

```
# Unit tests
<nome>.test.ts           # Arquivo principal
<nome>.spec.ts           # Alternativa (não use ambos)

# E2E tests
<nome>.e2e.ts            # Claramente E2E
```

### **Describe/It**

```typescript
describe("UserService", () => {
  describe("createUser", () => {
    it("should create user with valid data", () => {});
    it("should fail if email already exists", () => {});
    it("should hash password before saving", () => {});
  });
});
```

---

## ✅ Boas Práticas

### **1. AAA Pattern**

```typescript
it("should create user", async () => {
  // Arrange (preparar)
  const mockRepo = createMockRepo();
  const service = new UserService(mockRepo);
  const input = { email: "test@test.com", password: "123" };

  // Act (executar)
  const result = await service.createUser(input);

  // Assert (verificar)
  expect(result.ok).toBe(true);
});
```

### **2. Teste 1 Coisa por Vez**

```typescript
// ❌ Ruim
it("should create and update user", () => {});

// ✅ Bom
it("should create user", () => {});
it("should update user", () => {});
```

### **3. Use Nomes Descritivos**

```typescript
// ❌ Ruim
it("works", () => {});

// ✅ Bom
it("should return error if email is invalid", () => {});
```

### **4. Mock Apenas o Necessário**

```typescript
// ✅ Mock de dependências externas
const mockRepo = { create: vi.fn(), findById: vi.fn() };

// ❌ Não mock a coisa que você está testando
const mockService = { createUser: vi.fn() }; // Não!
```

---

## 🎯 Cobertura de Código

### **Metas**

- **Unit Tests**: 80%+ cobertura
- **Integration Tests**: 70%+ cobertura de APIs críticas
- **E2E Tests**: Fluxos principais (login, checkout, etc.)

### **Comando**

```bash
npm run test:coverage
```

### **Foco**

- ✅ Lógica de negócio (services, use cases)
- ✅ Validações críticas
- ✅ Caminhos de erro
- ❌ Não se preocupe com 100% de cobertura

---

## 🚀 Executando Testes

```bash
# Todos os testes
npm test

# Watch mode (desenvolvimento)
npm run test:watch

# Interface visual
npm run test:ui

# Cobertura
npm run test:coverage

# Apenas unit
npm run test:unit

# Apenas integration
npm run test:integration

# Apenas e2e
npm run test:e2e
```

---

## 📋 Checklist de Testes

Ao implementar um novo módulo:

- [ ] **Unit Tests**
  - [ ] Services (todos os métodos)
  - [ ] Use Cases (casos principais)
  - [ ] Validators (regras de validação)
  - [ ] Caminhos de erro

- [ ] **Integration Tests**
  - [ ] Repositories (CRUD + métodos custom)
  - [ ] API Routes (endpoints principais)
  - [ ] Workflows (fluxos integrados)

- [ ] **E2E Tests** (opcional no início)
  - [ ] Fluxo principal do usuário
  - [ ] Casos críticos de negócio

---

**💡 Dica:** Comece com unit tests (rápidos e fáceis), depois integration (realistas), e por último E2E (para fluxos críticos).
