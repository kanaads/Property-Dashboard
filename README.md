# Propvia — Mini Property Dashboard

> **Live demo:** _add your Vercel URL here once deployed_ → `https://your-app.vercel.app`

A full-stack property dashboard built for the Propvia Full Stack Development Internship assessment. It lets an agent or internal operator browse a portfolio of listings, search and filter across multiple criteria in real time, add new properties through a validated form, and read at-a-glance analytics that surface **hidden value** across the dataset.

The product framing is deliberately **internal/agent-facing** rather than a public consumer marketplace, which is why it ships as a fast Single Page Application rather than an SEO-oriented server-rendered site.

---

## ✨ Features

- **Property listing** — 12 seeded listings rendered as an accessible, responsive card grid.
- **Multi-criteria search & filter** — free-text search (title, location, description, type) combined with property type, min/max price, and minimum bedrooms, all evaluated in a single short-circuiting pass.
- **Add a property** — a modal form with focus trapping, validated end-to-end with React Hook Form + Zod and written to the database.
- **Live analytics** — summary cards (listings, avg. price, avg. $/sqft, avg. value score) plus a Recharts bar chart of average price-per-sqft by property type. All metrics recompute against the **currently filtered** dataset.
- **Domain-specific signal** — a `latent_value_score` (1–100) per property, reflecting Propvia’s focus on uncovering latent property value.
- **Accessibility-first** — keyboard-operable throughout, visible focus rings, skip link, ARIA labelling, and runtime `axe-core` auditing in development.
- **Graceful demo mode** — if no Supabase credentials are present, the app runs against bundled seed data so reviewers can clone and run with zero setup.

---

## 🧱 Tech Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **React 19 + Vite 6** | Sub-second cold start and instant HMR; an SPA is the right fit for a gated, agent-facing dashboard where SEO is irrelevant. |
| Language | **TypeScript (strict)** | Compile-time data contracts from the database schema through to the UI. |
| Styling | **Tailwind CSS v4** | Utility-first, config-less `@theme` tokens; a custom navy/sky real-estate palette. |
| Data / state | **TanStack Query v5** | Caching, deduping, and loading/error states for server data. |
| Routing | **React Router v7** | Layout + nested route structure ready to grow. |
| Forms | **React Hook Form + Zod** | Uncontrolled inputs for performance; one schema mirrors the DB constraints (DRY). |
| Backend | **Supabase (PostgreSQL)** | Relational data with native multi-criteria filtering, predictable pricing, and Row Level Security. |
| Charts | **Recharts** | Lightweight client-side data visualization. |

### Why Vite over Next.js
This dashboard is an authenticated/internal tool, so server-side rendering for SEO buys nothing. Vite delivers a far faster dev loop and a smaller, tree-shaken client bundle, letting the effort go entirely into filtering, state, and UX.

### Why Supabase over Firebase
Real-estate data is inherently relational and filter-heavy (price ranges, bedroom counts, categorical types). PostgreSQL handles these multi-condition queries natively, whereas Firestore would force client-side stitching and per-read cost spikes for read-heavy dashboard views.

---

## 📁 Project Structure

A feature-based layout keeps each domain self-contained.

```
src/
├── app/                      # App shell, router, layout, dashboard page
├── features/
│   ├── properties/           # Cards, grid, add-form, API, query + schema hooks, seed data
│   ├── search/               # Filter state + single-pass filter engine + FilterBar
│   └── analytics/            # Summary cards + Recharts panel
├── shared/
│   ├── components/ui/        # Button, Field, Modal (accessible primitives)
│   └── lib/                  # cn() class utility
└── lib/                      # Supabase client + generated DB types
supabase/
├── schema.sql                # Table, constraints, RLS policies
└── seed.sql                  # 12 sample listings
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### 1. Clone and install
```bash
git clone https://github.com/kanaads/Property-Dashboard.git
cd Property-Dashboard
npm install
```

### 2. Run (demo mode — no backend needed)
```bash
npm run dev
```
Open http://localhost:5173. The app runs against bundled seed data.

### 3. Connect Supabase (optional, for a live database)
1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run `supabase/schema.sql`, then `supabase/seed.sql`.
3. Copy the env template and fill in your project values:
   ```bash
   cp .env.example .env
   ```
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
4. Restart `npm run dev`. The app now reads from and writes to Supabase.

> Only the **anon public key** belongs in the frontend — never the service role key. Access is governed by Row Level Security policies defined in `schema.sql`.

---

## 📜 Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server (with runtime a11y auditing). |
| `npm run build` | Type-check and produce an optimized production build. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint with strict `jsx-a11y` rules. |
| `npm run format` | Format the source with Prettier. |
| `npm run typecheck` | Type-check without emitting. |

---

## ☁️ Deployment (Vercel)

1. Push the repo to GitHub.
2. Import it into [Vercel](https://vercel.com); the Vite preset is detected automatically.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under **Settings → Environment Variables** (skip to deploy in demo mode).
4. Deploy. `vercel.json` rewrites all routes to `index.html` for SPA routing.

---

## ♿ Accessibility

- Strict `eslint-plugin-jsx-a11y` rules enforced at lint time.
- `@axe-core/react` runs in development and reports violations to the console (excluded from the production bundle).
- Keyboard support throughout: skip link, focus-trapped modal with focus restoration to the trigger, Escape to close, visible focus indicators, and labelled form controls.

---

## 🗄️ Data Model

| Column | Type | Notes |
| --- | --- | --- |
| `id` | uuid | Primary key, auto-generated |
| `created_at` | timestamptz | Defaults to `now()` |
| `title` | text | ≥ 5 chars |
| `description` | text | Not null |
| `price` | numeric | > 0 |
| `location` | text | Not null |
| `property_type` | text | One of the supported categories |
| `bedrooms` | integer | ≥ 0 |
| `bathrooms` | numeric | ≥ 0 (allows half baths) |
| `square_feet` | integer | > 0 |
| `image_url` | text | Valid URL |
| `latent_value_score` | integer | 1–100 — domain-specific value signal |

---

Built as a focused, production-minded submission: typed end-to-end, accessible by default, and architected so each feature can scale independently.
