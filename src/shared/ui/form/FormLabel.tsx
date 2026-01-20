import { cn } from '@/shared/lib/cn'

interface FormLabelProps {
  htmlFor: string
  children: React.ReactNode
  required?: boolean
  className?: string
}

export function FormLabel({
  htmlFor,
  children,
  required = false,
  className,
}: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'ml-1 text-xs font-bold uppercase tracking-wider text-gray-400',
        className
      )}
    >
      {children}
      {required && <span className="ml-1 text-primary">*</span>}
    </label>
  )
}
