'use client'

import { cn } from '@/shared/lib/cn'
import { FormField } from '@/shared/ui/form'
import { useFieldValidation, type ValidationRule } from '../model'

interface ValidatedInputProps {
  name: string
  label: string
  type?: 'text' | 'email'
  placeholder?: string
  required?: boolean
  icon?: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  validationRules?: ValidationRule[]
  className?: string
}

export function ValidatedInput({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  icon,
  value,
  onChange,
  onBlur,
  validationRules = [],
  className,
}: ValidatedInputProps) {
  const { validationState, validate, markDirty } =
    useFieldValidation(validationRules)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <div className="relative">
        {icon && (
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-gray-500">
            {icon}
          </span>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          aria-label={label}
          aria-required={required}
          aria-invalid={validationState.isDirty && !validationState.isValid}
          aria-describedby={validationState.error ? `${name}-error` : undefined}
          className={cn(
            'w-full rounded-lg px-4 py-3.5 text-base text-white placeholder-gray-600 outline-none',
            'bg-[rgba(17,19,23,0.6)] border border-white/5',
            'transition-all duration-300',
            'focus:bg-[rgba(17,19,23,0.9)] focus:border-primary focus:shadow-[0_0_0_2px_rgba(0,187,224,0.2)]',
            'hover:border-white/10',
            icon && 'pl-11',
            validationState.isDirty &&
              !validationState.isValid &&
              'border-destructive'
          )}
        />
      </div>
    </FormField>
  )
}
