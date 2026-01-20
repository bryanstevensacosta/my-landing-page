'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import {
  validateRequired,
  validateEmail,
  validateMinLength,
  validateMaxLength,
  validatePattern,
  type ValidationRule,
} from '../lib'

export interface FieldValidationState {
  error: string | null
  isValid: boolean
  isDirty: boolean
}

export interface UseFieldValidationReturn {
  validationState: FieldValidationState
  validate: (value: string) => boolean
  validateDebounced: (value: string) => void
  clearError: () => void
  markDirty: () => void
}

/**
 * Hook for individual field validation
 * Manages validation state and provides validation functions
 */
export function useFieldValidation(
  rules: ValidationRule[]
): UseFieldValidationReturn {
  const t = useTranslations()
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const [validationState, setValidationState] = useState<FieldValidationState>({
    error: null,
    isValid: true,
    isDirty: false,
  })

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  /**
   * Validate a field value against all rules
   * Returns true if valid, false otherwise
   */
  const validate = useCallback(
    (value: string): boolean => {
      // Run through all validation rules
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

        // If validation fails, set error and return false
        if (!isValid) {
          const errorMessage = t(rule.message)
          setValidationState({
            error: errorMessage,
            isValid: false,
            isDirty: true,
          })
          return false
        }
      }

      // All validations passed
      setValidationState({
        error: null,
        isValid: true,
        isDirty: true,
      })
      return true
    },
    [rules, t]
  )

  /**
   * Debounced validation for onChange events
   * Delays validation by 300ms to reduce re-renders
   */
  const validateDebounced = useCallback(
    (value: string) => {
      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      // Set new timer
      debounceTimerRef.current = setTimeout(() => {
        validate(value)
      }, 300)
    },
    [validate]
  )

  /**
   * Clear the error state
   */
  const clearError = useCallback(() => {
    setValidationState((prev) => ({
      ...prev,
      error: null,
      isValid: true,
    }))
  }, [])

  /**
   * Mark the field as dirty (user has interacted with it)
   */
  const markDirty = useCallback(() => {
    setValidationState((prev) => ({
      ...prev,
      isDirty: true,
    }))
  }, [])

  return {
    validationState,
    validate,
    validateDebounced,
    clearError,
    markDirty,
  }
}
