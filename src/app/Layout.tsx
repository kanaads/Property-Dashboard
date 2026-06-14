import { Building2, Plus } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { isSupabaseConfigured } from '@/lib/supabase';

interface LayoutProps {
  children: ReactNode;
  onAddProperty: () => void;
}

export function Layout({ children, onAddProperty }: LayoutProps) {
  return (
    <div className="min-h-full">
      <a
        href="#main"
        className="skip-link left-4 top-4 z-50 rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 text-white">
              <Building2 size={18} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-extrabold leading-none text-navy-900">Propvia</p>
              <p className="text-[11px] text-navy-500">Property Dashboard</p>
            </div>
          </div>
          <Button onClick={onAddProperty}>
            <Plus size={16} aria-hidden="true" />
            Add Property
          </Button>
        </div>
      </header>

      {!isSupabaseConfigured && (
        <div className="bg-sky-soft px-4 py-2 text-center text-xs text-navy-700">
          Demo mode: showing bundled sample data. Add Supabase credentials in{' '}
          <code>.env</code> to connect a live database.
        </div>
      )}

      <main id="main" className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {children}
      </main>

      <footer className="border-t border-navy-100 py-6 text-center text-xs text-navy-500">
        Built for the Propvia Full Stack Internship Assessment · React 19 · Vite · Supabase
      </footer>
    </div>
  );
}
