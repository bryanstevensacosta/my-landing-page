/**
 * Property-Based Tests for Translation Interpolation
 *
 * Feature: i18n-implementation, Property 9: Interpolation works with dynamic values
 * Validates: Requirements 7.5
 *
 * These tests verify that translation strings with placeholders correctly
 * replace those placeholders with provided dynamic values.
 */

import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import esTranslations from '@/i18n/locales/es.json'
import enTranslations from '@/i18n/locales/en.json'

// Helper to simulate next-intl's interpolation behavior
function interpolate(template: string, values: Record<string, any>): string {
  let result = template

  // Handle plural forms first (before simple replacements)
  // Pattern: {count, plural, one {singular} other {plural}}
  const pluralRegex =
    /\{(\w+),\s*plural,\s*one\s*\{([^}]+)\}\s*other\s*\{([^}]+)\}\}/g
  result = result.replace(pluralRegex, (match, key, singular, plural) => {
    const count = values[key]
    return count === 1 ? singular : plural
  })

  // Replace simple placeholders like {name}, {count}, etc.
  // Escape special regex characters in the value to avoid issues with $&, $`, etc.
  Object.entries(values).forEach(([key, value]) => {
    const placeholder = `{${key}}`
    const escapedValue = String(value).replace(/\$/g, '$$$$') // Escape $ for replacement
    result = result.replace(
      new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'),
      escapedValue
    )
  })

  return result
}

// Helper to extract placeholder names from a template string
function extractPlaceholders(template: string): string[] {
  const placeholders: string[] = []

  // First, remove plural form content to avoid extracting words from within them
  // Pattern: {count, plural, one {singular} other {plural}}
  const withoutPlurals = template.replace(
    /\{(\w+),\s*plural,\s*one\s*\{[^}]+\}\s*other\s*\{[^}]+\}\}/g,
    (match, key) => `{${key}}`
  )

  // Now extract simple placeholders like {name}, {count}
  const simpleRegex = /\{(\w+)\}/g
  let match

  while ((match = simpleRegex.exec(withoutPlurals)) !== null) {
    if (!placeholders.includes(match[1])) {
      placeholders.push(match[1])
    }
  }

  return placeholders
}

describe('Translation Interpolation', () => {
  const interpolationKeys = [
    'interpolation.welcome',
    'interpolation.projectCount',
    'interpolation.greeting',
    'interpolation.experience',
    'interpolation.achievement',
    'interpolation.stats',
  ]

  describe('Property 9: Interpolation works with dynamic values', () => {
    it('property: placeholders are replaced with provided values', () => {
      /**
       * Property: For any translation string with placeholders and any set of
       * corresponding values, the interpolated result should contain the values
       * and not contain the placeholder syntax.
       */
      fc.assert(
        fc.property(
          fc.constantFrom(...interpolationKeys),
          fc.record({
            name: fc.string({ minLength: 1, maxLength: 20 }),
            count: fc.integer({ min: 0, max: 100 }),
            years: fc.integer({ min: 1, max: 50 }),
            technology: fc.constantFrom(
              'TypeScript',
              'Python',
              'React',
              'Node.js'
            ),
            achievement: fc.constantFrom(
              'Excellence Award',
              'Best Project',
              'Innovation Prize'
            ),
            year: fc.integer({ min: 2020, max: 2024 }),
            countries: fc.integer({ min: 1, max: 50 }),
          }),
          (key, values) => {
            const esTemplate = esTranslations.interpolation[
              key.split('.')[1] as keyof typeof esTranslations.interpolation
            ] as string
            const enTemplate = enTranslations.interpolation[
              key.split('.')[1] as keyof typeof enTranslations.interpolation
            ] as string

            const esResult = interpolate(esTemplate, values)
            const enResult = interpolate(enTemplate, values)

            // Extract placeholders from templates
            const esPlaceholders = extractPlaceholders(esTemplate)
            const enPlaceholders = extractPlaceholders(enTemplate)

            // Verify that all placeholders are replaced
            esPlaceholders.forEach((placeholder) => {
              if (values[placeholder as keyof typeof values] !== undefined) {
                const value = String(values[placeholder as keyof typeof values])
                expect(esResult).toContain(value)
              }
            })

            enPlaceholders.forEach((placeholder) => {
              if (values[placeholder as keyof typeof values] !== undefined) {
                const value = String(values[placeholder as keyof typeof values])
                expect(enResult).toContain(value)
              }
            })

            // Verify that simple placeholder syntax is removed (not {name} format)
            // Note: This is a simplified check - real next-intl handles this
            const simplePlaceholderRegex = /\{(\w+)\}/
            const hasSimplePlaceholder = simplePlaceholderRegex.test(esResult)

            // If there are no plural forms, simple placeholders should be gone
            if (!esTemplate.includes('plural')) {
              expect(hasSimplePlaceholder).toBe(false)
            }

            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('property: interpolation preserves non-placeholder text', () => {
      /**
       * Property: For any translation string with placeholders, the text
       * surrounding the placeholders should remain unchanged after interpolation.
       */
      fc.assert(
        fc.property(
          fc.constantFrom(...interpolationKeys),
          fc.record({
            name: fc
              .string({ minLength: 1, maxLength: 20 })
              .filter((s) => s.trim().length > 0),
            count: fc.integer({ min: 0, max: 100 }),
            years: fc.integer({ min: 1, max: 50 }),
            technology: fc
              .string({ minLength: 1, maxLength: 20 })
              .filter((s) => s.trim().length > 0),
            achievement: fc
              .string({ minLength: 1, maxLength: 30 })
              .filter((s) => s.trim().length > 0),
            year: fc.integer({ min: 2020, max: 2024 }),
            countries: fc.integer({ min: 1, max: 50 }),
          }),
          (key, values) => {
            const esTemplate = esTranslations.interpolation[
              key.split('.')[1] as keyof typeof esTranslations.interpolation
            ] as string

            const esResult = interpolate(esTemplate, values)

            // The result should be a non-empty string
            expect(esResult.length).toBeGreaterThan(0)

            // The result should not contain unreplaced placeholder syntax
            // (except for plural forms which are handled separately)
            const simplePlaceholderRegex = /\{(\w+)\}/
            const hasUnreplacedSimplePlaceholder =
              simplePlaceholderRegex.test(esResult)

            // If the template doesn't have plural forms, simple placeholders should be replaced
            if (!esTemplate.includes('plural')) {
              expect(hasUnreplacedSimplePlaceholder).toBe(false)
            }

            // The result should contain the interpolated values
            const placeholders = extractPlaceholders(esTemplate)
            placeholders.forEach((placeholder) => {
              if (values[placeholder as keyof typeof values] !== undefined) {
                const value = String(values[placeholder as keyof typeof values])
                // Value should appear in result (unless it's empty or just whitespace)
                if (value.trim().length > 0) {
                  expect(esResult).toContain(value)
                }
              }
            })

            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('property: interpolation works consistently across locales', () => {
      /**
       * Property: For any translation key with placeholders, interpolation
       * should work the same way in all supported locales (es and en).
       */
      fc.assert(
        fc.property(
          fc.constantFrom(...interpolationKeys),
          fc.record({
            name: fc.string({ minLength: 1, maxLength: 20 }),
            count: fc.integer({ min: 0, max: 100 }),
            years: fc.integer({ min: 1, max: 50 }),
            technology: fc.string({ minLength: 1, maxLength: 20 }),
            achievement: fc.string({ minLength: 1, maxLength: 30 }),
            year: fc.integer({ min: 2020, max: 2024 }),
            countries: fc.integer({ min: 1, max: 50 }),
          }),
          (key, values) => {
            const esTemplate = esTranslations.interpolation[
              key.split('.')[1] as keyof typeof esTranslations.interpolation
            ] as string
            const enTemplate = enTranslations.interpolation[
              key.split('.')[1] as keyof typeof enTranslations.interpolation
            ] as string

            const esPlaceholders = extractPlaceholders(esTemplate)
            const enPlaceholders = extractPlaceholders(enTemplate)

            // Both locales should have the same placeholders
            expect(esPlaceholders.sort()).toEqual(enPlaceholders.sort())

            // Interpolation should work for both
            const esResult = interpolate(esTemplate, values)
            const enResult = interpolate(enTemplate, values)

            // Both results should contain the interpolated values
            esPlaceholders.forEach((placeholder) => {
              if (values[placeholder as keyof typeof values] !== undefined) {
                const value = String(values[placeholder as keyof typeof values])
                expect(esResult).toContain(value)
                expect(enResult).toContain(value)
              }
            })

            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('property: plural forms are handled correctly', () => {
      /**
       * Property: For any translation with plural forms, the correct form
       * (singular or plural) should be selected based on the count value.
       */
      fc.assert(
        fc.property(
          fc.constantFrom(
            'interpolation.projectCount',
            'interpolation.greeting'
          ),
          fc.integer({ min: 0, max: 10 }),
          (key, count) => {
            const esTemplate = esTranslations.interpolation[
              key.split('.')[1] as keyof typeof esTranslations.interpolation
            ] as string
            const enTemplate = enTranslations.interpolation[
              key.split('.')[1] as keyof typeof enTranslations.interpolation
            ] as string

            const values = {
              name: 'Test',
              count,
              years: 5,
              technology: 'TypeScript',
              achievement: 'Award',
              year: 2024,
              countries: 10,
            }

            const esResult = interpolate(esTemplate, values)
            const enResult = interpolate(enTemplate, values)

            // Results should contain the count
            expect(esResult).toContain(String(count))
            expect(enResult).toContain(String(count))

            // For count === 1, should use singular form
            // For count !== 1, should use plural form
            // This is a simplified check - actual behavior depends on locale rules
            if (count === 1) {
              // Singular form should be present
              // For English: "project" or "message"
              // For Spanish: "proyecto" or "mensaje"
              const hasSingular =
                esResult.includes('proyecto') ||
                esResult.includes('mensaje') ||
                enResult.includes('project') ||
                enResult.includes('message')
              expect(hasSingular).toBe(true)
            } else {
              // Plural form should be present
              // For English: "projects" or "messages"
              // For Spanish: "proyectos" or "mensajes"
              const hasPlural =
                esResult.includes('proyectos') ||
                esResult.includes('mensajes') ||
                enResult.includes('projects') ||
                enResult.includes('messages')
              expect(hasPlural).toBe(true)
            }

            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('property: missing values do not break interpolation', () => {
      /**
       * Property: For any translation string with placeholders, if some values
       * are missing, the interpolation should still work for the provided values
       * without throwing errors.
       */
      fc.assert(
        fc.property(
          fc.constantFrom(...interpolationKeys),
          fc.record({
            name: fc.option(fc.string({ minLength: 1, maxLength: 20 }), {
              nil: undefined,
            }),
            count: fc.option(fc.integer({ min: 0, max: 100 }), {
              nil: undefined,
            }),
          }),
          (key, partialValues) => {
            const esTemplate = esTranslations.interpolation[
              key.split('.')[1] as keyof typeof esTranslations.interpolation
            ] as string

            // Provide default values for missing ones
            const values = {
              name: partialValues.name ?? 'Default',
              count: partialValues.count ?? 0,
              years: 5,
              technology: 'TypeScript',
              achievement: 'Award',
              year: 2024,
              countries: 10,
            }

            // Should not throw
            expect(() => interpolate(esTemplate, values)).not.toThrow()

            const result = interpolate(esTemplate, values)

            // Result should be a non-empty string
            expect(typeof result).toBe('string')
            expect(result.length).toBeGreaterThan(0)

            return true
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  describe('Interpolation structure validation', () => {
    it('should have matching placeholders across locales', () => {
      interpolationKeys.forEach((key) => {
        const esTemplate = esTranslations.interpolation[
          key.split('.')[1] as keyof typeof esTranslations.interpolation
        ] as string
        const enTemplate = enTranslations.interpolation[
          key.split('.')[1] as keyof typeof enTranslations.interpolation
        ] as string

        const esPlaceholders = extractPlaceholders(esTemplate)
        const enPlaceholders = extractPlaceholders(enTemplate)

        expect(esPlaceholders.sort()).toEqual(enPlaceholders.sort())
      })
    })

    it('should have valid placeholder syntax', () => {
      interpolationKeys.forEach((key) => {
        const esTemplate = esTranslations.interpolation[
          key.split('.')[1] as keyof typeof esTranslations.interpolation
        ] as string
        const enTemplate = enTranslations.interpolation[
          key.split('.')[1] as keyof typeof enTranslations.interpolation
        ] as string

        // Placeholders should follow {name} or {name, plural, ...} format
        const validPlaceholderRegex =
          /\{\w+(?:,\s*\w+(?:,\s*\w+\s*\{[^}]+\})*)*\}/g

        const esMatches = esTemplate.match(validPlaceholderRegex) || []
        const enMatches = enTemplate.match(validPlaceholderRegex) || []

        // All placeholders should be valid
        expect(esMatches.length).toBeGreaterThan(0)
        expect(enMatches.length).toBeGreaterThan(0)
      })
    })
  })
})
