import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';


interface ModalProps {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Dialog with focus trapping + focus restoration to the trigger (Phase 6).
 * Esc closes; Tab/Shift+Tab cycle within the dialog.
 */
export function Modal({ open, title, subtitle, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    triggerRef.current = document.activeElement as HTMLElement;
    const dialog = dialogRef.current;
    const focusables = dialog?.querySelectorAll<HTMLElement>(FOCUSABLE);
    focusables?.[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      triggerRef.current?.focus(); // restore focus to trigger
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="pv-modal">
      <button
        type="button"
        aria-label="Close dialog"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="pv-modal__panel relative z-10"
      >
        <div className="pv-modal__head">
          <div>
            <h2 id="modal-title" className="pv-modal__title">
              {title}
            </h2>
            {subtitle && (
              <p className="pv-modal__sub">
                {subtitle}
              </p>
            )}
          </div>
          <button 
            type="button"
            onClick={onClose} 
            aria-label="Close dialog" 
            className="pv-modal__close"
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

