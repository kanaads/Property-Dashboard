import { Bell, Search, Plus, Building2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/ds-components/core/Button.jsx';
import { isSupabaseConfigured } from '@/lib/supabase';

interface LayoutProps {
  children: ReactNode;
  onAddProperty: () => void;
  query: string;
  onQuery: (q: string) => void;
}

export function Layout({ children, onAddProperty, query, onQuery }: LayoutProps) {
  return (
    <div className="flex h-screen flex-col bg-white overflow-hidden">
      <a
        href="#main"
        className="skip-link left-4 top-4 z-50 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
      >
        Skip to main content
      </a>

      <header className="pv-topbar">
        <div className="flex items-center flex-1">
          <div className="flex items-center gap-2 mr-6 shrink-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
              <Building2 size={18} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-extrabold leading-none text-slate-900">Propvia</p>
              <p className="text-[11px] font-medium text-slate-500">Property Dashboard</p>
            </div>
          </div>
          <div className="pv-topbar__search relative flex items-center w-full max-w-md">
            <Search size={16} className="absolute left-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search portfolio, addresses, or comps…" 
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-brand/30 transition-all"
            />
          </div>
        </div>
        <div className="pv-topbar__actions">
          <button className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 transition-colors">
            <Bell size={18} />
          </button>
          <Button variant="primary" onClick={onAddProperty}>
            <div className="flex items-center gap-1.5">
              <Plus size={16} />
              Add property
            </div>
          </Button>
        </div>
      </header>

      {!isSupabaseConfigured && (
        <div className="bg-slate-50 px-4 py-2 text-center text-xs text-slate-700">
          Demo mode: showing bundled sample data. Add Supabase credentials in{' '}
          <code>.env</code> to connect a live database.
        </div>
      )}

      <main id="main" className="flex flex-1 flex-col overflow-hidden w-full relative">
        {children}
      </main>

      <footer className="shrink-0 border-t border-slate-100 py-4 text-center text-xs text-slate-500 bg-white">
        Built for the Propvia Full Stack Internship Assessment · React 19 · Vite · Supabase
      </footer>
    </div>
  );
}
