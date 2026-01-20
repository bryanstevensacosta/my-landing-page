import { cn } from '@/shared/lib/cn'

interface FormFieldProps {
  label: string
  name: string
  required?: boolean
  error?: string | null
  children: React.ReactNode
  className?: string
}

export function FormField({
  label,
  name,
  required = false,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label
        htmlFor={name}
        className="ml-1 text-xs font-bold uppercase tracking-wider text-gray-400"
      >
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </label>
      {children}
      {error && (
        <p
          className="animate-in fade-in slide-in-from-top-1 ml-1 text-sm text-destructive"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  )
}
