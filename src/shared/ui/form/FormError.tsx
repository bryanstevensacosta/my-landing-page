import { cn } from '@/shared/lib/cn'

interface FormErrorProps {
  error?: string | null
  className?: string
}

export function FormError({ error, className }: FormErrorProps) {
  if (!error) return null

  return (
    <p
      className={cn(
        'animate-in fade-in slide-in-from-top-1 ml-1 text-sm text-destructive',
        className
      )}
      role="alert"
      aria-live="polite"
    >
      {error}
    </p>
  )
}
