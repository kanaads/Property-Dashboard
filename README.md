# Propvia Property Dashboard
A full-stack property portfolio dashboard designed for internal agents to surface hidden asset value.

[Live Demo](https://property-dashboard-alpha.vercel.app)
[GitHub Repository](https://github.com/kanaads/Property-Dashboard)

## Approach

This application operates as a fast Single Page Application using React and Vite rather than a server-rendered framework like Next.js. Because this is an internal administrative tool, search engine indexing is irrelevant. The Vite architecture provides immediate development reloading and optimized client bundles, focusing effort entirely on client-side filtering complexity.

Real estate data requires rigorous relational querying involving numerical ranges and categories. Supabase and PostgreSQL were chosen over NoSQL options like Firebase because relational databases natively support these complex queries without forcing expensive client-side data stitching or unpredictable per-read document costs.

The central design decision is the Latent Value Score, reflecting the core business model of identifying hidden property potential. Instead of merely listing square footage, the dashboard actively visualizes this score, transforming raw data into an actionable commercial signal for the agent.

The codebase uses a feature-based structure to encapsulate logic. TanStack Query manages asynchronous server state, ensuring interface responsiveness. Data ingestion relies on React Hook Form paired with a Zod schema that mirrors the backend PostgreSQL constraints, guaranteeing end-to-end type safety before network mutation.

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Frontend | React 19 + Vite | Fast compilation and minimal client bundles for an SPA |
| Language | TypeScript | Static typing prevents runtime errors across data boundaries |
| Styling | Tailwind CSS v4 | Rapid, utility-first styling with custom design tokens |
| Data/State | TanStack Query v5 | Handles server state caching, deduping, and loading |
| Routing | React Router v7 | Robust client-side routing for nested layouts |
| Forms | React Hook Form + Zod | Performant inputs with rigorous schema validation |
| Backend | Supabase (PostgreSQL) | Native relational querying and predictable compute pricing |
| Charts | Recharts | Lightweight data visualization for aggregate metrics |

## Setup

1. Clone the repository and run `npm install`.
2. Run `npm run dev`. If no environment credentials are provided, the application automatically boots in a fully functional demo mode using bundled seed data.
3. Optional: To connect to a live Supabase instance, copy `.env.example` to `.env`, execute `supabase/schema.sql` and `supabase/seed.sql` in your SQL editor, and restart the server.

## Environment Variables

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```
Note: Only the anonymous public key belongs in the frontend environment. Access control is handled by Row Level Security policies.

## Deploy

Push the repository to GitHub.
Import the project into Vercel.
Add the two Supabase environment variables in the project settings.
Deploy the application. The included vercel.json file handles all SPA routing rewrites.
