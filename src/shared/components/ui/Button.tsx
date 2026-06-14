import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-navy-900 text-white hover:bg-navy-700 disabled:opacity-60 disabled:cursor-not-allowed',
  secondary:
    'bg-white text-navy-900 border border-navy-100 hover:bg-navy-50',
  ghost: 'bg-transparent text-navy-700 hover:bg-navy-50',
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
