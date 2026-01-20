'use client'

import { useCallback } from 'react'

export interface FormData {
  name: string
  email: string
  company?: string
  projectType: string
  message: string
}

export interface UseFormPersistenceReturn {
  loadPersistedData: () => FormData | null
  persistData: (data: FormData) => void
  clearPersistedData: () => void
}

/**
 * Hook for persisting form state to session storage
 * Allows users to preserve their form data if they navigate away
 */
export function useFormPersistence(key: string): UseFormPersistenceReturn {
  /**
   * Load persisted form data from session storage
   */
  const loadPersistedData = useCallback((): FormData | null => {
    try {
      if (typeof window === 'undefined') return null

      const stored = sessionStorage.getItem(key)
      if (!stored) return null

      const data = JSON.parse(stored) as FormData
      return data
    } catch (error) {
      console.error('Error loading persisted form data:', error)
      return null
    }
  }, [key])

  /**
   * Persist form data to session storage
   */
  const persistData = useCallback(
    (data: FormData): void => {
      try {
        if (typeof window === 'undefined') return

        sessionStorage.setItem(key, JSON.stringify(data))
      } catch (error) {
        console.error('Error persisting form data:', error)
      }
    },
    [key]
  )

  /**
   * Clear persisted form data from session storage
   */
  const clearPersistedData = useCallback((): void => {
    try {
      if (typeof window === 'undefined') return

      sessionStorage.removeItem(key)
    } catch (error) {
      console.error('Error clearing persisted form data:', error)
    }
  }, [key])

  return {
    loadPersistedData,
    persistData,
    clearPersistedData,
  }
}
