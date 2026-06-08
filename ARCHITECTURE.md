# PharmacyOS — Architecture

A modern, cloud-first **Pharmacy Management SaaS** for Indian medical stores.
Built to feel like Stripe Dashboard / Linear / Notion — not a legacy ERP.

> Stack: **React 19 · JavaScript (JSX) · Vite · Ant Design 6 · TanStack Query · Zustand · React Hook Form · Zod · Axios · React Router 7**

---

## Guiding principles

- **Feature-based + component-driven.** Each business capability is a self-contained module.
- **Reusable-first.** Generic UI lives in `src/components`; business UI lives in its module.
- **Composition over duplication.** Small focused pieces, assembled together.
- **No file over 300 lines.** Split aggressively into hooks, sub-components, and helpers.
- **Single responsibility (SOLID).** A file does one thing; a hook owns one concern.
- **Validation at the edges.** Zod schemas validate forms and shape mock API data.

---

## Top-level layout

```
src/
├── app/            App bootstrap: providers, query client, router, theme wiring
├── pages/          Thin route components — compose layouts + module screens
├── modules/        Feature modules (the heart of the app) — see below
├── components/     Reusable, business-agnostic UI primitives
├── layouts/        AuthLayout & DashboardLayout (Sidebar, Topbar, etc.)
├── hooks/          Cross-cutting reusable hooks (useDebounce, useDisclosure…)
├── services/       Cross-cutting services (storage, auth token, toast)
├── store/          Global Zustand stores (auth, ui/theme)
├── api/            Axios client + mock API layer + mock datasets (api/mock)
├── constants/      App-wide constants & enums
├── config/         routes, navigation, permissions configuration
├── types/          JSDoc @typedef domain models (editor intellisense in JS)
├── utils/          Pure helper functions (currency, date, gst, format)
└── assets/         Global styles & static assets
```

## Reusable components (`src/components`)

`DataTable · PageHeader · StatCard · SearchInput · FilterPanel · EmptyState ·
ConfirmModal · DrawerForm · StatusBadge · LoadingState · ErrorState ·
Pagination · ActionMenu · FormField`

Each lives in its own folder with an `index.js` barrel:

```
components/StatCard/
├── StatCard.jsx
└── index.js
```

## Layouts (`src/layouts`)

```
layouts/
├── AuthLayout/                  Centered split-screen auth shell
└── DashboardLayout/             App chrome for authenticated screens
    ├── Sidebar/                 Collapsible nav (driven by config/navigation)
    ├── Topbar/                  Search, quick actions
    ├── Notifications/           Bell + notification drawer
    ├── ProfileMenu/             Avatar dropdown
    └── Breadcrumbs/             Route-driven breadcrumbs
```

## Module anatomy (`src/modules/<feature>`)

Every feature module follows the same predictable shape:

```
modules/products/
├── api/            data-access functions (call the mock API layer)
├── hooks/          useProducts, useProduct, useCreateProduct … (TanStack Query)
├── components/     feature-specific UI (ProductTable, ProductForm…)
├── schemas/        Zod schemas (productSchema) for forms & validation
├── store/          feature-local Zustand store (filters, selection)
└── index.js        public surface of the module
```

Modules: `auth · dashboard · products · inventory · purchases · suppliers ·
billing · sales · reports · settings`.

## Data flow

```
UI (module component)
  → hook (useProducts)            ← TanStack Query (cache, loading, errors)
    → module api (productsApi)    ← thin data-access wrapper
      → api/mock (mockApi)        ← simulated latency over mock datasets
```

Global ephemeral UI state (selected filters, cart, theme) → **Zustand**.
Server/cache state (lists, entities) → **TanStack Query**.

## Path alias

`@` → `src` (configured in `vite.config.js` + `jsconfig.json`).

```js
import { StatCard } from '@/components/StatCard';
```

## Build steps

1. **Project structure** ✅ (this commit)
2. **Design system** — theme tokens, typography, colors, spacing, shadows
3. **App shell** — providers, router, layouts, navigation
4. Modules, generated one by one.
