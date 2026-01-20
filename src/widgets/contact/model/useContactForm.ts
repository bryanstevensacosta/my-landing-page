'use client'

import { useState, useCallback, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useFormValidation } from '@/features/form-validation'
import { contactFormSchema } from '@/features/form-validation/lib'
import { submitContactForm } from '../lib'
import { useFormPersistence, type FormData } from './useFormPersistence'

export interface UseContactFormReturn {
  formData: FormData
  validationState: ReturnType<typeof useFormValidation>['validationState']
  isSubmitting: boolean
  isSuccess: boolean
  error: Error | null
  updateField: (name: keyof FormData, value: string) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  resetForm: () => void
}

const STORAGE_KEY = 'contact-form-data'

const initialFormData: FormData = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  message: '',
}

/**
 * Main hook for managing contact form state and submission
 */
export function useContactForm(): UseContactFormReturn {
  const locale = useLocale()
  const { validationState, validateForm, clearErrors } =
    useFormValidation(contactFormSchema)
  const { loadPersistedData, persistData, clearPersistedData } =
    useFormPersistence(STORAGE_KEY)

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Load persisted data on mount
  useEffect(() => {
    const persisted = loadPersistedData()
    if (persisted) {
      setFormData(persisted)
    }
  }, [loadPersistedData])

  // Persist data whenever it changes
  useEffect(() => {
    if (
      formData.name ||
      formData.email ||
      formData.company ||
      formData.projectType ||
      formData.message
    ) {
      persistData(formData)
    }
  }, [formData, persistData])

  /**
   * Update a single form field
   */
  const updateField = useCallback((name: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      // Validate form
      const formDataForValidation: Record<string, string> = {
        name: formData.name,
        email: formData.email,
        company: formData.company || '',
        projectType: formData.projectType,
        message: formData.message,
      }
      const isValid = validateForm(formDataForValidation)
      if (!isValid) {
        return
      }

      setIsSubmitting(true)
      setError(null)

      try {
        // Submit form data
        const response = await submitContactForm({
          ...formData,
          locale,
        })

        if (response.success) {
          setIsSuccess(true)
          clearPersistedData()
          // Reset form after short delay
          setTimeout(() => {
            setFormData(initialFormData)
            clearErrors()
          }, 1000)
        } else {
          throw new Error(response.message || 'Submission failed')
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, locale, validateForm, clearPersistedData, clearErrors]
  )

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setFormData(initialFormData)
    setIsSuccess(false)
    setError(null)
    clearErrors()
    clearPersistedData()
  }, [clearErrors, clearPersistedData])

  return {
    formData,
    validationState,
    isSubmitting,
    isSuccess,
    error,
    updateField,
    handleSubmit,
    resetForm,
  }
}
