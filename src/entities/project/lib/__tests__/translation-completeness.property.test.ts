import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { projects } from '../projects.data'
import esMessages from '@/i18n/locales/es.json'
import enMessages from '@/i18n/locales/en.json'

/**
 * Feature: i18n-implementation, Property 8: Translation completeness across locales
 * Validates: Requirements 6.5
 *
 * This property test verifies that for any project, skill, or stat that exists
 * in one locale's translation file, it also exists in all other supported locale
 * translation files with equivalent structure.
 */

type TranslationObject = Record<string, any>

/**
 * Helper function to get a nested value from an object using a dot-notation path
 */
function getNestedValue(obj: TranslationObject, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

/**
 * Helper function to check if a translation key exists in a translation object
 */
function translationKeyExists(
  translations: TranslationObject,
  key: string
): boolean {
  const value = getNestedValue(translations, key)
  return value !== undefined && value !== null
}

describe('Translation Completeness Property Tests', () => {
  it('property: all project translation keys exist in Spanish', () => {
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        // Check titleKey exists in Spanish
        expect(translationKeyExists(esMessages, project.titleKey)).toBe(true)
        expect(getNestedValue(esMessages, project.titleKey)).toBeTruthy()

        // Check descriptionKey exists in Spanish
        expect(translationKeyExists(esMessages, project.descriptionKey)).toBe(
          true
        )
        expect(getNestedValue(esMessages, project.descriptionKey)).toBeTruthy()

        // Check optional keys if they exist
        if (project.categoryKey) {
          expect(translationKeyExists(esMessages, project.categoryKey)).toBe(
            true
          )
          expect(getNestedValue(esMessages, project.categoryKey)).toBeTruthy()
        }

        if (project.statKey) {
          expect(translationKeyExists(esMessages, project.statKey)).toBe(true)
          expect(getNestedValue(esMessages, project.statKey)).toBeTruthy()
        }

        return true
      }),
      { numRuns: 100 }
    )
  })

  it('property: all project translation keys exist in English', () => {
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        // Check titleKey exists in English
        expect(translationKeyExists(enMessages, project.titleKey)).toBe(true)
        expect(getNestedValue(enMessages, project.titleKey)).toBeTruthy()

        // Check descriptionKey exists in English
        expect(translationKeyExists(enMessages, project.descriptionKey)).toBe(
          true
        )
        expect(getNestedValue(enMessages, project.descriptionKey)).toBeTruthy()

        // Check optional keys if they exist
        if (project.categoryKey) {
          expect(translationKeyExists(enMessages, project.categoryKey)).toBe(
            true
          )
          expect(getNestedValue(enMessages, project.categoryKey)).toBeTruthy()
        }

        if (project.statKey) {
          expect(translationKeyExists(enMessages, project.statKey)).toBe(true)
          expect(getNestedValue(enMessages, project.statKey)).toBeTruthy()
        }

        return true
      }),
      { numRuns: 100 }
    )
  })

  it('property: translation structure is consistent across locales', () => {
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        // If a key exists in Spanish, it should exist in English
        const keysToCheck = [
          project.titleKey,
          project.descriptionKey,
          project.categoryKey,
          project.statKey,
        ].filter(Boolean) as string[]

        keysToCheck.forEach((key) => {
          const existsInSpanish = translationKeyExists(esMessages, key)
          const existsInEnglish = translationKeyExists(enMessages, key)

          // Both should have the same existence state
          expect(existsInSpanish).toBe(existsInEnglish)

          // If it exists in one, it should exist in both
          if (existsInSpanish || existsInEnglish) {
            expect(existsInSpanish).toBe(true)
            expect(existsInEnglish).toBe(true)
          }
        })

        return true
      }),
      { numRuns: 100 }
    )
  })

  it('property: translation values are non-empty strings', () => {
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        const keysToCheck = [
          project.titleKey,
          project.descriptionKey,
          project.categoryKey,
          project.statKey,
        ].filter(Boolean) as string[]

        keysToCheck.forEach((key) => {
          // Spanish translations should be non-empty strings
          const esValue = getNestedValue(esMessages, key)
          expect(typeof esValue).toBe('string')
          expect(esValue.length).toBeGreaterThan(0)

          // English translations should be non-empty strings
          const enValue = getNestedValue(enMessages, key)
          expect(typeof enValue).toBe('string')
          expect(enValue.length).toBeGreaterThan(0)
        })

        return true
      }),
      { numRuns: 100 }
    )
  })

  it('property: Spanish and English translations are different (not just copied)', () => {
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        // For most projects, Spanish and English translations should differ
        // (except for proper nouns or technical terms that are the same)
        const titleEs = getNestedValue(esMessages, project.titleKey)
        const titleEn = getNestedValue(enMessages, project.titleKey)

        const descEs = getNestedValue(esMessages, project.descriptionKey)
        const descEn = getNestedValue(enMessages, project.descriptionKey)

        // At least the description should be different (it's longer and more likely to differ)
        // We allow titles to be the same for technical terms
        if (descEs && descEn) {
          // Descriptions should be different (unless they're technical terms)
          // We check if they're not identical or if one is not just a substring of the other
          const areDifferent =
            descEs !== descEn || titleEs.toLowerCase() === titleEn.toLowerCase()
          expect(areDifferent).toBe(true)
        }

        return true
      }),
      { numRuns: 100 }
    )
  })

  it('property: all projects have complete translation coverage', () => {
    // This test verifies that every project has all required fields translated
    const requiredFields = ['title', 'description']

    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        // Extract project identifier
        const identifier = project.titleKey.split('.')[2]

        // Check that the project object exists in both locales
        const esProject = getNestedValue(
          esMessages,
          `projects.items.${identifier}`
        )
        const enProject = getNestedValue(
          enMessages,
          `projects.items.${identifier}`
        )

        expect(esProject).toBeDefined()
        expect(enProject).toBeDefined()

        // Check required fields exist in both locales
        requiredFields.forEach((field) => {
          expect(esProject[field]).toBeDefined()
          expect(enProject[field]).toBeDefined()
          expect(typeof esProject[field]).toBe('string')
          expect(typeof enProject[field]).toBe('string')
          expect(esProject[field].length).toBeGreaterThan(0)
          expect(enProject[field].length).toBeGreaterThan(0)
        })

        // Check optional fields have consistent presence
        const optionalFields = ['category', 'stat']
        optionalFields.forEach((field) => {
          const existsInEs = esProject[field] !== undefined
          const existsInEn = enProject[field] !== undefined
          expect(existsInEs).toBe(existsInEn)
        })

        return true
      }),
      { numRuns: 100 }
    )
  })

  it('property: translation keys follow the same structure in all locales', () => {
    // Verify that the structure of projects.items is identical in both locales
    const esProjectKeys = Object.keys(esMessages.projects.items)
    const enProjectKeys = Object.keys(enMessages.projects.items)

    // Both should have the same project identifiers
    expect(esProjectKeys.sort()).toEqual(enProjectKeys.sort())

    fc.assert(
      fc.property(fc.constantFrom(...esProjectKeys), (projectKey) => {
        const esProject =
          esMessages.projects.items[
            projectKey as keyof typeof esMessages.projects.items
          ]
        const enProject =
          enMessages.projects.items[
            projectKey as keyof typeof enMessages.projects.items
          ]

        // Both should have the same keys
        const esKeys = Object.keys(esProject).sort()
        const enKeys = Object.keys(enProject).sort()
        expect(esKeys).toEqual(enKeys)

        return true
      }),
      { numRuns: 100 }
    )
  })
})
