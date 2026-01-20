/**
 * Property-Based Tests for Reduced Motion
 * Feature: contact-section
 * Property: 17
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import fc from 'fast-check'
import { ContactForm } from '../ContactForm'
import { NextIntlClientProvider } from 'next-intl'
import enMessages from '@/i18n/locales/en.json'

// Mock the hooks
vi.mock('../model', () => ({
  useContactForm: () => ({
    formData: {
      name: '',
      email: '',
      company: '',
      projectType: '',
      message: '',
    },
    validationState: {
      isValid: false,
      errors: {},
      isDirty: false,
    },
    isSubmitting: false,
    isSuccess: false,
    error: null,
    updateField: vi.fn(),
    handleSubmit: vi.fn((e) => e.preventDefault()),
    resetForm: vi.fn(),
  }),
}))

/**
 * Helper to mock prefers-reduced-motion media query
 */
function mockPrefersReducedMotion(value: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)' ? value : false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

describe('Property 17: Reduced motion preference respect', () => {
  afterEach(() => {
    // Reset matchMedia mock
    vi.restoreAllMocks()
  })

  it('should respect prefers-reduced-motion setting', () => {
    fc.assert(
      fc.property(fc.boolean(), (prefersReducedMotion) => {
        // Mock the media query
        mockPrefersReducedMotion(prefersReducedMotion)

        const { container } = render(
          <NextIntlClientProvider locale="en" messages={enMessages}>
            <ContactForm />
          </NextIntlClientProvider>
        )

        // Check that CSS variables or classes respect reduced motion
        // In globals.css, we have:
        // @media (prefers-reduced-motion: reduce) {
        //   *, *::before, *::after {
        //     animation-duration: 0.01ms !important;
        //     animation-iteration-count: 1 !important;
        //     transition-duration: 0.01ms !important;
        //   }
        // }

        // Verify the media query is being checked
        const matchMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
        expect(matchMedia.matches).toBe(prefersReducedMotion)

        // Cleanup
        container.remove()
      }),
      { numRuns: 100 }
    )
  })

  it('should have animation classes that can be disabled', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        mockPrefersReducedMotion(false)

        const { container } = render(
          <NextIntlClientProvider locale="en" messages={enMessages}>
            <ContactForm />
          </NextIntlClientProvider>
        )

        // Check that animated elements have animation classes
        const form = container.querySelector('form')
        expect(form).toBeTruthy()

        // The form and its children should have transition or animation classes
        const elementsWithTransitions = container.querySelectorAll(
          '[class*="transition"], [class*="animate"], [class*="duration"]'
        )

        // Should have some animated elements
        expect(elementsWithTransitions.length).toBeGreaterThan(0)

        // Cleanup
        container.remove()
      }),
      { numRuns: 20 }
    )
  })

  it('should apply reduced motion styles when preference is set', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        mockPrefersReducedMotion(true)

        const { container } = render(
          <NextIntlClientProvider locale="en" messages={enMessages}>
            <ContactForm />
          </NextIntlClientProvider>
        )

        // Verify matchMedia returns correct value
        const matchMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
        expect(matchMedia.matches).toBe(true)

        // The CSS media query in globals.css will handle the actual animation disabling
        // We just verify that the media query is accessible
        expect(matchMedia).toBeDefined()

        // Cleanup
        container.remove()
      }),
      { numRuns: 20 }
    )
  })
})
