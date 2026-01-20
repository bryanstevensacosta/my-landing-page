'use client'

import { cn } from '@/shared/lib/cn'
import { FormField } from '@/shared/ui/form'
import { useFieldValidation, type ValidationRule } from '../model'

interface ValidatedTextareaProps {
  name: string
  label: string
  placeholder?: string
  required?: boolean
  rows?: number
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  validationRules?: ValidationRule[]
  className?: string
}

export function ValidatedTextarea({
  name,
  label,
  placeholder,
  required = false,
  rows = 4,
  value,
  onChange,
  onBlur,
  validationRules = [],
  className,
}: ValidatedTextareaProps) {
  const { validationState, validate, markDirty } =
    useFieldValidation(validationRules)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
    // Clear error when user starts typing
    if (validationState.error && validationState.isDirty) {
      validate(e.target.value)
    }
  }

  const handleBlur = () => {
    markDirty()
    validate(value)
    onBlur?.()
  }

  return (
    <FormField
      label={label}
      name={name}
      required={required}
      error={validationState.isDirty ? validationState.error : null}
      className={className}
    >
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        rows={rows}
        aria-label={label}
        aria-required={required}
        aria-invalid={validationState.isDirty && !validationState.isValid}
        aria-describedby={validationState.error ? `${name}-error` : undefined}
        className={cn(
          'w-full rounded-lg px-4 py-3.5 text-base text-white placeholder-gray-600 outline-none resize-none',
          'bg-[rgba(17,19,23,0.6)] border border-white/5',
          'transition-all duration-300',
          'focus:bg-[rgba(17,19,23,0.9)] focus:border-primary focus:shadow-[0_0_0_2px_rgba(0,187,224,0.2)]',
          'hover:border-white/10',
          // Custom scrollbar styling
          'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20',
          validationState.isDirty &&
            !validationState.isValid &&
            'border-destructive'
        )}
      />
    </FormField>
  )
}
