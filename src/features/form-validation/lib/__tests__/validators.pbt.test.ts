import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import {
  validateRequired,
  validateEmail,
  validateMinLength,
} from '../validators'

// Feature: contact-section, Property 1: Required field validation
describe('Property 1: Required field validation', () => {
  it('should accept non-empty strings and reject empty/whitespace strings', () => {
    // Test that non-empty strings are accepted
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
        (validInput) => {
          const result = validateRequired(validInput)
          expect(result).toBe(true)
        }
      ),
      { numRuns: 100 }
    )

    // Test that empty strings and whitespace-only strings are rejected
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant(''),
          fc.string().filter((s) => s.length > 0 && s.trim().length === 0)
        ),
        (invalidInput) => {
          const result = validateRequired(invalidInput)
          expect(result).toBe(false)
        }
      ),
      { numRuns: 100 }
    )
  })
})

// Feature: contact-section, Property 2: Email format validation
describe('Property 2: Email format validation', () => {
  it('should accept valid email formats and reject invalid formats', () => {
    // Test that valid email formats are accepted
    fc.assert(
      fc.property(fc.emailAddress(), (validEmail) => {
        const result = validateEmail(validEmail)
        expect(result).toBe(true)
      }),
      { numRuns: 100 }
    )

    // Test that invalid email formats are rejected
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant(''),
          fc.constant('notanemail'),
          fc.constant('@example.com'),
          fc.constant('user@'),
          fc.constant('user@domain'),
          fc.string().filter((s) => !s.includes('@'))
        ),
        (invalidEmail) => {
          const result = validateEmail(invalidEmail)
          expect(result).toBe(false)
        }
      ),
      { numRuns: 100 }
    )
  })
})

// Feature: contact-section, Property 3: Message minimum length validation
describe('Property 3: Message minimum length validation', () => {
  it('should accept strings with 10+ characters and reject shorter strings', () => {
    const minLength = 10

    // Test that strings with 10+ non-whitespace characters are accepted
    fc.assert(
      fc.property(
        fc.string({ minLength: 10 }).filter((s) => s.trim().length >= 10),
        (validMessage) => {
          const result = validateMinLength(validMessage, minLength)
          expect(result).toBe(true)
        }
      ),
      { numRuns: 100 }
    )

    // Test that strings with less than 10 non-whitespace characters are rejected
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant(''),
          fc.string({ maxLength: 9 }),
          fc.string().filter((s) => s.length > 0 && s.trim().length < 10)
        ),
        (invalidMessage) => {
          const result = validateMinLength(invalidMessage, minLength)
          expect(result).toBe(false)
        }
      ),
      { numRuns: 100 }
    )
  })
})
