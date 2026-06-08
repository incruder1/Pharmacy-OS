# PharmacyOS

A modern, cloud-first **Pharmacy Management SaaS** frontend for Indian medical stores —
fast, beautiful, mobile-friendly, and easy to learn. Designed to feel like
Stripe Dashboard, Linear, and Notion rather than a legacy ERP.

## Tech stack

- **React 19** + **JavaScript (JSX)** + **Vite**
- **Ant Design 6** for the component system
- **TanStack Query** for server/cache state
- **Zustand** for global UI state
- **React Hook Form** + **Zod** for forms & validation
- **Axios** for HTTP
- **React Router 7** for routing
- **Recharts** for dashboard charts

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build
npm run lint     # lint
npm run format   # prettier
```

## Project structure

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full feature-based architecture,
module anatomy, and data-flow conventions.

## Modules

Authentication · Dashboard · Products · Inventory · Purchases · Suppliers ·
Billing (POS) · Sales History · Reports · Settings.

> Backed by a complete **mock API layer** with realistic Indian-pharmacy data —
> no backend required to run the full experience.
