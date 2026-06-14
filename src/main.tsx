import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import './index.css';

// Runtime accessibility auditing in dev only (Phase 6 — @axe-core/react).
// Dynamically imported so it is fully excluded from the production bundle.
if (import.meta.env.DEV) {
  void (async () => {
    const [{ default: React }, { default: ReactDOM }, axe] = await Promise.all([
      import('react'),
      import('react-dom'),
      import('@axe-core/react'),
    ]);
    void axe.default(React, ReactDOM, 1000);
  })();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
