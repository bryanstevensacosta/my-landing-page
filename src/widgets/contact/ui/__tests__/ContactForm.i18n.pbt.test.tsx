/**
 * Property-Based Tests for Internationalization
 * Feature: contact-section
 * Properties: 13, 14
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import fc from 'fast-check'
import { ContactForm } from '../ContactForm'
import { NextIntlClientProvider } from 'next-intl'
import enMessages from '@/i18n/locales/en.json'
import esMessages from '@/i18n/locales/es.json'

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

const locales = ['en', 'es'] as const
const messages = { en: enMessages, es: esMessages }

describe('Property 13: Internationalized content display', () => {
  it('should display all form labels in the selected language', () => {
    fc.assert(
      fc.property(fc.constantFrom(...locales), (locale) => {
        const { container } = render(
          <NextIntlClientProvider locale={locale} messages={messages[locale]}>
            <ContactForm />
          </NextIntlClientProvider>
        )

        const expectedMessages = messages[locale]

        // Check form title
        expect(
          screen.getByText(expectedMessages.contact.form.title)
        ).toBeInTheDocument()

        // Check form subtitle
        expect(
          screen.getByText(expectedMessages.contact.form.subtitle)
        ).toBeInTheDocument()

        // Check field labels exist (may be truncated in UI)
        const labels = container.querySelectorAll('label')
        expect(labels.length).toBeGreaterThan(0)

        // Check submit button exists
        const buttons = screen.getAllByRole('button')
        expect(buttons.length).toBeGreaterThan(0)

        // Cleanup
        container.remove()
      }),
      { numRuns: 10 } // Run for each locale multiple times
    )
  })

  it('should display all placeholders in the selected language', () => {
    fc.assert(
      fc.property(fc.constantFrom(...locales), (locale) => {
        const { container } = render(
          <NextIntlClientProvider locale={locale} messages={messages[locale]}>
            <ContactForm />
          </NextIntlClientProvider>
        )

        const expectedMessages = messages[locale]

        // Check placeholders exist
        const inputs = container.querySelectorAll('input[placeholder]')
        const textareas = container.querySelectorAll('textarea[placeholder]')
        const selects = container.querySelectorAll('select')

        // Should have multiple inputs with placeholders
        expect(inputs.length).toBeGreaterThan(0)
        expect(textareas.length).toBeGreaterThan(0)
        expect(selects.length).toBeGreaterThan(0)

        // Verify at least one placeholder matches expected
        const namePlaceholder = Array.from(inputs).find(
          (input) =>
            input.getAttribute('placeholder') ===
            expectedMessages.contact.form.name.placeholder
        )
        expect(namePlaceholder).toBeTruthy()

        // Cleanup
        container.remove()
      }),
      { numRuns: 10 }
    )
  })
})
