# Propvia Property Dashboard

> **Live Deployment:** [https://property-dashboard-alpha.vercel.app](https://property-dashboard-alpha.vercel.app)

A full-stack property dashboard built for the Propvia Full Stack Development Internship assessment. It allows users to browse a portfolio of listings, search and filter across multiple criteria, add new properties, and view dynamic analytics highlighting latent property value.

## Approach & Architecture

- **Frontend:** Built with React 19 and Vite for a fast, responsive Single Page Application experience.
- **Styling:** Tailwind CSS v4 paired with a custom Claude Design System implementation for a clean, professional, and accessible UI.
- **State & Data Fetching:** TanStack Query handles server state, caching, and loading states.
- **Forms & Validation:** React Hook Form + Zod provides highly performant, type-safe data ingestion with strict schema validation.
- **Backend:** Supabase (PostgreSQL) powers the live database, chosen for its powerful native relational filtering capabilities.
- **Accessibility:** Fully keyboard navigable, screen-reader friendly, and audited with `eslint-plugin-jsx-a11y` and `@axe-core/react`.

## Project Setup

### Prerequisites
- Node.js 18+
- npm

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/kanaads/Property-Dashboard.git
cd Property-Dashboard
npm install
```

### 2. Local Development (Demo Mode)
To run the dashboard locally with bundled seed data (no database required):
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Connect to Live Supabase (Optional)
To connect the local environment to the live production database:
1. Copy the environment variables template:
   ```bash
   cp .env.example .env
   ```
2. Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
3. Restart the development server. The Demo Mode banner will disappear, and the app will sync with the live database.

## Key Features Implemented
- ✅ Property listing page with grid/list views
- ✅ Multi-criteria search and filter engine
- ✅ Validated form to add new properties
- ✅ Supabase PostgreSQL database integration
- ✅ Live Vercel deployment
- ✅ Fully responsive and accessible UI
