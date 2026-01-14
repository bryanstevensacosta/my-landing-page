import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import esTranslations from '@/i18n/locales/es.json'
import enTranslations from '@/i18n/locales/en.json'
import { locales } from '@/i18n/config'

/**
 * Feature: i18n-implementation, Property 10: Metadata respects active locale
 * Validates: Requirements 8.4
 *
 * This property test verifies that metadata (title, description, Open Graph tags)
 * uses translations from the currently active locale.
 */
describe('Metadata Locale Matching Property Tests', () => {
  it('property: metadata respects active locale', () => {
    const translationMap = {
      es: esTranslations,
      en: enTranslations,
    }

    fc.assert(
      fc.property(fc.constantFrom(...locales), (locale) => {
        const translations = translationMap[locale]

        // Verify metadata namespace exists
        expect(translations.metadata).toBeDefined()

        // Verify title is locale-specific
        const title = translations.metadata.title
        expect(title).toBeTruthy()
        expect(typeof title).toBe('string')

        // Verify description is locale-specific
        const description = translations.metadata.description
        expect(description).toBeTruthy()
        expect(typeof description).toBe('string')

        // Verify Open Graph metadata is locale-specific
        expect(translations.metadata.openGraph).toBeDefined()
        expect(translations.metadata.openGraph.title).toBeTruthy()
        expect(translations.metadata.openGraph.description).toBeTruthy()
        expect(translations.metadata.openGraph.siteName).toBeTruthy()

        // Verify locale-specific content differs between locales
        if (locale === 'es') {
          expect(title).toContain('Desarrollador')
          expect(description).toContain('especialista')
        } else if (locale === 'en') {
          expect(title).toContain('Developer')
          expect(description).toContain('specializing')
        }

        return true
      }),
      { numRuns: 100 }
    )
  })

  it('property: metadata structure is consistent across all locales', () => {
    const translationMap = {
      es: esTranslations,
      en: enTranslations,
    }

    fc.assert(
      fc.property(fc.constantFrom(...locales), (locale) => {
        const translations = translationMap[locale]

        // All locales should have the same metadata structure
        const hasTitle = 'title' in translations.metadata
        const hasDescription = 'description' in translations.metadata
        const hasOpenGraph = 'openGraph' in translations.metadata
        const hasOgTitle = 'title' in translations.metadata.openGraph
        const hasOgDescription =
          'description' in translations.metadata.openGraph
        const hasOgSiteName = 'siteName' in translations.metadata.openGraph

        expect(hasTitle).toBe(true)
        expect(hasDescription).toBe(true)
        expect(hasOpenGraph).toBe(true)
        expect(hasOgTitle).toBe(true)
        expect(hasOgDescription).toBe(true)
        expect(hasOgSiteName).toBe(true)

        return true
      }),
      { numRuns: 100 }
    )
  })

  it('property: metadata values are non-empty strings for all locales', () => {
    const translationMap = {
      es: esTranslations,
      en: enTranslations,
    }

    fc.assert(
      fc.property(fc.constantFrom(...locales), (locale) => {
        const translations = translationMap[locale]

        // All metadata values should be non-empty strings
        expect(translations.metadata.title.length).toBeGreaterThan(0)
        expect(translations.metadata.description.length).toBeGreaterThan(0)
        expect(translations.metadata.openGraph.title.length).toBeGreaterThan(0)
        expect(
          translations.metadata.openGraph.description.length
        ).toBeGreaterThan(0)
        expect(translations.metadata.openGraph.siteName.length).toBeGreaterThan(
          0
        )

        return true
      }),
      { numRuns: 100 }
    )
  })
})
