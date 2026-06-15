import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

const fieldBase =
  'w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-[3px] focus:ring-brand/30 transition-shadow';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(fieldBase, className)} {...props} />
  )
);
Input.displayName = 'Input';

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select ref={ref} className={cn(fieldBase, 'cursor-pointer', className)} {...props}>
    {children}
  </select>
));
Select.displayName = 'Select';

