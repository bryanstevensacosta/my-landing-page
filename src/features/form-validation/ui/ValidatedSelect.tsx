'use client'

import { cn } from '@/shared/lib/cn'
import { FormField } from '@/shared/ui/form'
import { useFieldValidation, type ValidationRule } from '../model'
import { useTranslations } from 'next-intl'

export interface SelectOption {
  value: string
  label: string // i18n key
}

interface ValidatedSelectProps {
  name: string
  label: string
  placeholder?: string
  required?: boolean
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  validationRules?: ValidationRule[]
  className?: string
}

export function ValidatedSelect({
  name,
  label,
  placeholder,
  required = false,
  options,
  value,
  onChange,
  onBlur,
  validationRules = [],
  className,
}: ValidatedSelectProps) {
  const t = useTranslations()
  const { validationState, validate, markDirty } =
    useFieldValidation(validationRules)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value)
    // Clear error when user makes a selection
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
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-label={label}
          aria-required={required}
          aria-invalid={validationState.isDirty && !validationState.isValid}
          aria-describedby={validationState.error ? `${name}-error` : undefined}
          className={cn(
            'w-full rounded-lg px-4 py-3.5 text-base text-white outline-none appearance-none cursor-pointer',
            'bg-[rgba(17,19,23,0.6)] border border-white/5',
            'transition-all duration-300',
            'focus:bg-[rgba(17,19,23,0.9)] focus:border-primary focus:shadow-[0_0_0_2px_rgba(0,187,224,0.2)]',
            'hover:border-white/10',
            !value && 'text-gray-500',
            validationState.isDirty &&
              !validationState.isValid &&
              'border-destructive'
          )}
        >
          {placeholder && (
            <option value="" disabled className="bg-gray-900 text-gray-500">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-gray-900 text-white"
            >
              {t(option.label)}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary">
          <span className="material-symbols-outlined">expand_more</span>
        </div>
      </div>
    </FormField>
  )
}
