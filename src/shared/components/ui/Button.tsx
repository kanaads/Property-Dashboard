import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-white hover:bg-brand-hover disabled:opacity-60 disabled:cursor-not-allowed',
  secondary:
    'bg-white text-slate-900 border border-slate-100 hover:bg-slate-50',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-50',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  )
);

Button.displayName = 'Button';

