# 🎨 Guia de Estilos CSS - MultiShop

## 📁 Estrutura de CSS

### **1. Estilos Globais** (`app/styles/global/`)

Estilos base que se aplicam a TODO o projeto.

```
app/styles/global/
├── globals.css       # Tailwind base + variáveis CSS
├── reset.css         # CSS reset (opcional)
└── fonts.css         # Importação de fontes
```

**Quando usar:**

- Variáveis CSS globais (cores, espaçamentos)
- Configuração Tailwind
- Estilos de reset
- Importação de fontes

---

### **2. Estilos da Landing** (`app/styles/landing/`)

Estilos específicos para a landing page pública.

```
app/styles/landing/
├── landing.css       # Estilos da landing page
├── hero.css          # Seção hero
├── features.css      # Grid de features
└── pricing.css       # Cards de pricing
```

**Quando usar:**

- Estilos da página inicial pública
- Componentes de marketing
- Animações específicas da landing

---

### **3. Estilos Base do Tenant** (`app/styles/tenant/`)

Estilos DEFAULT que TODOS os tenants herdam.

```
app/styles/tenant/
├── base.css          # Estilos base (header, sidebar, cards)
├── dashboard.css     # Dashboard padrão
├── forms.css         # Formulários padrão
└── admin.css         # Painel admin padrão
```

**Quando usar:**

- Layout padrão do tenant
- Componentes compartilhados
- Estilos que todos os tenants usam

---

### **4. Estilos Customizados por Tenant** (`public/styles/tenants/`)

Estilos ÚNICOS de cada tenant. Cada tenant tem seu próprio arquivo CSS.

```
public/styles/tenants/
├── acme-corp.css         # Customizações da Acme Corp
├── tech-solutions.css    # Customizações da Tech Solutions
├── creative-agency.css   # Customizações da Creative Agency
└── example-store.css     # Customizações da Example Store
```

**Quando usar:**

- Cores de marca do tenant
- Logo e tipografia customizada
- Layout específico do tenant
- Animações personalizadas

---

## 🔄 Ordem de Carregamento

Os estilos são carregados nesta ordem (do menos para o mais específico):

```tsx
// 1. Global (base para tudo)
import "@/app/styles/global/globals.css";

// 2. Landing (se for landing page)
import "@/app/styles/landing/landing.css";

// OU

// 2. Tenant Base (se for área do tenant)
import "@/app/styles/tenant/base.css";

// 3. Tenant Custom (último, sobrescreve tudo)
<link rel="stylesheet" href={`/styles/tenants/${tenantSlug}.css`} />;
```

---

## 🎯 Como Funciona

### Exemplo Prático:

**Tenant: "Acme Corp"**

1. **Cores Globais** (globals.css):

   ```css
   --primary: 222.2 47.4% 11.2%; /* Azul padrão */
   ```

2. **Estilo Base do Tenant** (base.css):

   ```css
   .tenant-button-primary {
     @apply bg-primary text-primary-foreground;
   }
   ```

3. **Customização da Acme Corp** (`/styles/tenants/acme-corp.css`):

   ```css
   :root {
     --tenant-primary: 355 78% 56%; /* Vermelho Acme */
   }

   .tenant-button-primary {
     background: hsl(var(--tenant-primary)); /* Sobrescreve */
   }
   ```

**Resultado:** Botão vermelho da marca Acme Corp!

---

## 📝 Como Criar Estilos para um Novo Tenant

1. **Criar arquivo em** `public/styles/tenants/`:

   ```bash
   touch public/styles/tenants/meu-tenant.css
   ```

2. **Adicionar customizações**:

   ```css
   /* public/styles/tenants/meu-tenant.css */

   :root {
     /* Cores da Marca */
     --tenant-primary: 280 90% 60%;
     --tenant-secondary: 200 80% 55%;

     /* Fontes */
     --tenant-font-heading: "Montserrat", sans-serif;
     --tenant-font-body: "Open Sans", sans-serif;
   }

   /* Override de componentes */
   .tenant-header {
     background: linear-gradient(
       to right,
       hsl(var(--tenant-primary)),
       hsl(var(--tenant-secondary))
     );
   }

   .tenant-logo {
     max-width: 200px;
   }
   ```

3. **Carregar dinamicamente no layout do tenant**:

   ```tsx
   // app/(tenant)/[slug]/layout.tsx

   export default function TenantLayout({
     params,
   }: {
     params: { slug: string };
   }) {
     return (
       <html>
         <head>
           {/* Estilos base */}
           <link rel="stylesheet" href="/styles/tenant/base.css" />

           {/* Estilos customizados do tenant */}
           <link rel="stylesheet" href={`/styles/tenants/${params.slug}.css`} />
         </head>
         <body>{children}</body>
       </html>
     );
   }
   ```

---

## ✅ Vantagens dessa Estrutura

### 1. **Separação Clara**

- Global → Tudo
- Landing → Página pública
- Tenant Base → Padrão dos tenants
- Tenant Custom → Único de cada tenant

### 2. **Multi-Tenant Real**

- Cada tenant pode ter cores, fontes e estilos únicos
- Mantém consistência nos componentes base
- Override simples com CSS

### 3. **Performance**

- CSS do tenant carregado apenas quando necessário
- Estilos base compartilhados (cache)
- Sem CSS-in-JS (melhor performance)

### 4. **Escalabilidade**

- Adicionar novo tenant = criar 1 arquivo CSS
- Sem rebuild da aplicação
- Fácil manutenção

### 5. **Flexibilidade**

- Tenant pode customizar TUDO
- Base fornece padrões sólidos
- Usa Tailwind + CSS customizado

---

## 🚀 Próximos Passos

1. **Criar globals.css completo** com todas as variáveis Tailwind
2. **Criar estilos base do tenant** (header, sidebar, cards, forms)
3. **Criar 2-3 exemplos de tenants** com estilos diferentes
4. **Adicionar no layout do tenant** o carregamento dinâmico
5. **Criar ferramenta de customização** (futuro: editor visual de temas)

---

## 📋 Checklist de Implementação

- [ ] `app/styles/global/globals.css` - Variáveis Tailwind
- [ ] `app/styles/landing/landing.css` - Estilos da landing
- [ ] `app/styles/tenant/base.css` - Estilos base do tenant
- [ ] `public/styles/tenants/example-1.css` - Exemplo de tenant 1
- [ ] `public/styles/tenants/example-2.css` - Exemplo de tenant 2
- [ ] `public/styles/tenants/example-3.css` - Exemplo de tenant 3
- [ ] Implementar carregamento dinâmico no layout
- [ ] Documentar variáveis CSS disponíveis
- [ ] Criar guia de customização para clientes

---

**💡 Dica:** Use variáveis CSS (`--tenant-*`) para facilitar customizações. Assim o tenant pode mudar cores e fontes sem alterar classes.
