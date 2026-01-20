'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import {
  validateRequired,
  validateEmail,
  validateMinLength,
  validateMaxLength,
  validatePattern,
  type ValidationRule,
} from '../lib'

export interface FormValidationState {
  isValid: boolean
  errors: Record<string, string>
  isDirty: boolean
}

export interface UseFormValidationReturn {
  validationState: FormValidationState
  validateField: (name: string, value: string) => boolean
  validateForm: (data: Record<string, string>) => boolean
  clearErrors: () => void
  getFieldError: (name: string) => string | null
}

/**
 * Hook for form-level validation
 * Manages validation state for all fields in a form
 */
export function useFormValidation(
  schema: Record<string, ValidationRule[]>
): UseFormValidationReturn {
  const t = useTranslations()

  const [validationState, setValidationState] = useState<FormValidationState>({
    isValid: true,
    errors: {},
    isDirty: false,
  })

  /**
   * Validate a single field against its rules
   */
  const validateField = useCallback(
    (name: string, value: string): boolean => {
      const rules = schema[name]
      if (!rules) return true

      // Run through all validation rules for this field
      for (const rule of rules) {
        let isValid = true

        switch (rule.type) {
          case 'required':
            isValid = validateRequired(value)
            break
          case 'email':
            isValid = validateEmail(value)
            break
          case 'minLength':
            isValid = validateMinLength(value, rule.value)
            break
          case 'maxLength':
            isValid = validateMaxLength(value, rule.value)
            break
          case 'pattern':
            isValid = validatePattern(value, rule.value)
            break
        }

        // If validation fails, set error for this field
        if (!isValid) {
          const errorMessage = t(rule.message)
          setValidationState((prev) => ({
            ...prev,
            errors: {
              ...prev.errors,
              [name]: errorMessage,
            },
            isValid: false,
            isDirty: true,
          }))
          return false
        }
      }

      // Field is valid, remove any existing error
      setValidationState((prev) => {
        const newErrors = { ...prev.errors }
        delete newErrors[name]

        return {
          ...prev,
          errors: newErrors,
          isValid: Object.keys(newErrors).length === 0,
          isDirty: true,
        }
      })

      return true
    },
    [schema, t]
  )

  /**
   * Validate all fields in the form
   */
  const validateForm = useCallback(
    (data: Record<string, string>): boolean => {
      const newErrors: Record<string, string> = {}

      // Validate each field in the schema
      for (const fieldName in schema) {
        const rules = schema[fieldName]
        const value = data[fieldName] || ''

        // Run through all validation rules for this field
        for (const rule of rules) {
          let isValid = true

          switch (rule.type) {
            case 'required':
              isValid = validateRequired(value)
              break
            case 'email':
              isValid = validateEmail(value)
              break
            case 'minLength':
              isValid = validateMinLength(value, rule.value)
              break
            case 'maxLength':
              isValid = validateMaxLength(value, rule.value)
              break
            case 'pattern':
              isValid = validatePattern(value, rule.value)
              break
          }

          // If validation fails, add error for this field
          if (!isValid) {
            const errorMessage = t(rule.message)
            newErrors[fieldName] = errorMessage
            break // Stop checking other rules for this field
          }
        }
      }

      // Update validation state
      setValidationState({
        isValid: Object.keys(newErrors).length === 0,
        errors: newErrors,
        isDirty: true,
      })

      return Object.keys(newErrors).length === 0
    },
    [schema, t]
  )

  /**
   * Clear all validation errors
   */
  const clearErrors = useCallback(() => {
    setValidationState({
      isValid: true,
      errors: {},
      isDirty: false,
    })
  }, [])

  /**
   * Get the error message for a specific field
   */
  const getFieldError = useCallback(
    (name: string): string | null => {
      return validationState.errors[name] || null
    },
    [validationState.errors]
  )

  return {
    validationState,
    validateField,
    validateForm,
    clearErrors,
    getFieldError,
  }
}
