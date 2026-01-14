import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import esTranslations from '@/i18n/locales/es.json'
import enTranslations from '@/i18n/locales/en.json'

/**
 * Feature: i18n-implementation, Property 3: Translation keys follow namespace structure
 * Validates: Requirements 2.2
 *
 * This property test verifies that all translation keys follow the namespace structure
 * where the first segment corresponds to a component or feature namespace.
 */

// Helper function to get all keys from a nested object with their full paths
function getAllKeys(obj: any, prefix = ''): string[] {
  const keys: string[] = []

  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys.push(...getAllKeys(obj[key], fullKey))
    } else {
      keys.push(fullKey)
    }
  }

  return keys
}

// Helper function to check if a key follows namespace structure
function followsNamespaceStructure(key: string): boolean {
  // A valid namespace structure has at least 2 segments: namespace.key
  // e.g., "header.brand", "hero.title", "projects.items.defi.title"
  const segments = key.split('.')
  return segments.length >= 2
}

// Helper function to get the namespace (first segment) from a key
function getNamespace(key: string): string {
  return key.split('.')[0]
}

describe('Translation File Structure', () => {
  // Define expected namespaces based on requirements
  const expectedNamespaces = [
    'header',
    'hero',
    'projects',
    'footer',
    'stats',
    'floatingCards',
    'skills',
    'metadata',
    'interpolation',
  ]

  it('should have all required namespaces in Spanish translations', () => {
    const namespaces = Object.keys(esTranslations)
    expectedNamespaces.forEach((namespace) => {
      expect(namespaces).toContain(namespace)
    })
  })

  it('should have all required namespaces in English translations', () => {
    const namespaces = Object.keys(enTranslations)
    expectedNamespaces.forEach((namespace) => {
      expect(namespaces).toContain(namespace)
    })
  })

  it('property: all translation keys follow namespace structure', () => {
    // Get all keys from both translation files
    const esKeys = getAllKeys(esTranslations)
    const enKeys = getAllKeys(enTranslations)

    // Test Spanish translations
    fc.assert(
      fc.property(fc.constantFrom(...esKeys), (key) => {
        return followsNamespaceStructure(key)
      }),
      { numRuns: 100 }
    )

    // Test English translations
    fc.assert(
      fc.property(fc.constantFrom(...enKeys), (key) => {
        return followsNamespaceStructure(key)
      }),
      { numRuns: 100 }
    )
  })

  it('property: all translation keys start with a valid namespace', () => {
    const esKeys = getAllKeys(esTranslations)
    const enKeys = getAllKeys(enTranslations)

    // Test Spanish translations
    fc.assert(
      fc.property(fc.constantFrom(...esKeys), (key) => {
        const namespace = getNamespace(key)
        return expectedNamespaces.includes(namespace)
      }),
      { numRuns: 100 }
    )

    // Test English translations
    fc.assert(
      fc.property(fc.constantFrom(...enKeys), (key) => {
        const namespace = getNamespace(key)
        return expectedNamespaces.includes(namespace)
      }),
      { numRuns: 100 }
    )
  })

  it('property: translation keys are consistent between locales', () => {
    const esKeys = getAllKeys(esTranslations).sort()
    const enKeys = getAllKeys(enTranslations).sort()

    // Both locales should have the same keys
    expect(esKeys).toEqual(enKeys)

    // Property test: for any key in Spanish, it should exist in English
    fc.assert(
      fc.property(fc.constantFrom(...esKeys), (key) => {
        return enKeys.includes(key)
      }),
      { numRuns: 100 }
    )

    // Property test: for any key in English, it should exist in Spanish
    fc.assert(
      fc.property(fc.constantFrom(...enKeys), (key) => {
        return esKeys.includes(key)
      }),
      { numRuns: 100 }
    )
  })

  it('property: namespace structure is hierarchical', () => {
    const esKeys = getAllKeys(esTranslations)

    // Test that keys follow a hierarchical structure
    // e.g., if "header.nav.projects" exists, then "header" and "header.nav" should be parent objects
    fc.assert(
      fc.property(fc.constantFrom(...esKeys), (key) => {
        const segments = key.split('.')
        // Each segment should be a valid identifier (alphanumeric + underscore)
        return segments.every((segment) => /^[a-zA-Z0-9_]+$/.test(segment))
      }),
      { numRuns: 100 }
    )
  })

  it('should have valid JSON structure', () => {
    // Verify that both files are valid JSON objects
    expect(typeof esTranslations).toBe('object')
    expect(typeof enTranslations).toBe('object')
    expect(esTranslations).not.toBeNull()
    expect(enTranslations).not.toBeNull()
  })

  it('property: all leaf values are strings', () => {
    function getAllValues(obj: any): any[] {
      const values: any[] = []
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          values.push(...getAllValues(obj[key]))
        } else {
          values.push(obj[key])
        }
      }
      return values
    }

    const esValues = getAllValues(esTranslations)
    const enValues = getAllValues(enTranslations)

    // Test Spanish translations
    fc.assert(
      fc.property(fc.constantFrom(...esValues), (value) => {
        return typeof value === 'string'
      }),
      { numRuns: 100 }
    )

    // Test English translations
    fc.assert(
      fc.property(fc.constantFrom(...enValues), (value) => {
        return typeof value === 'string'
      }),
      { numRuns: 100 }
    )
  })
})
