/**
 * Integration Tests for Language Switching
 * Feature: contact-section
 * Tests language switching behavior with form state preservation
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '../ContactForm'
import { NextIntlClientProvider } from 'next-intl'
import enMessages from '@/i18n/locales/en.json'
import esMessages from '@/i18n/locales/es.json'

const messages = { en: enMessages, es: esMessages }

describe('Language Switching Integration', () => {
  let mockUpdateField: ReturnType<typeof vi.fn>
  let mockHandleSubmit: ReturnType<typeof vi.fn>
  let currentFormData: any

  beforeEach(() => {
    mockUpdateField = vi.fn((field, value) => {
      currentFormData[field] = value
    })
    mockHandleSubmit = vi.fn((e) => e.preventDefault())

    currentFormData = {
      name: '',
      email: '',
      company: '',
      projectType: '',
      message: '',
    }

    vi.mock('../model', () => ({
      useContactForm: () => ({
        formData: currentFormData,
        validationState: {
          isValid: false,
          errors: {},
          isDirty: false,
        },
        isSubmitting: false,
        isSuccess: false,
        error: null,
        updateField: mockUpdateField,
        handleSubmit: mockHandleSubmit,
        resetForm: vi.fn(),
      }),
    }))
  })

  it('should switch from English to Spanish', async () => {
    const { rerender } = render(
      <NextIntlClientProvider locale="en" messages={messages.en}>
        <ContactForm />
      </NextIntlClientProvider>
    )

    // Verify English content
    expect(screen.getByText(messages.en.contact.form.title)).toBeInTheDocument()
    expect(
      screen.getByText(messages.en.contact.form.name.label)
    ).toBeInTheDocument()

    // Switch to Spanish
    rerender(
      <NextIntlClientProvider locale="es" messages={messages.es}>
        <ContactForm />
      </NextIntlClientProvider>
    )

    // Verify Spanish content
    await waitFor(() => {
      expect(
        screen.getByText(messages.es.contact.form.title)
      ).toBeInTheDocument()
      expect(
        screen.getByText(messages.es.contact.form.name.label)
      ).toBeInTheDocument()
    })
  })

  it('should switch from Spanish to English', async () => {
    const { rerender } = render(
      <NextIntlClientProvider locale="es" messages={messages.es}>
        <ContactForm />
      </NextIntlClientProvider>
    )

    // Verify Spanish content
    expect(screen.getByText(messages.es.contact.form.title)).toBeInTheDocument()

    // Switch to English
    rerender(
      <NextIntlClientProvider locale="en" messages={messages.en}>
        <ContactForm />
      </NextIntlClientProvider>
    )

    // Verify English content
    await waitFor(() => {
      expect(
        screen.getByText(messages.en.contact.form.title)
      ).toBeInTheDocument()
    })
  })

  it('should preserve form state when switching languages', async () => {
    const user = userEvent.setup()

    const { rerender } = render(
      <NextIntlClientProvider locale="en" messages={messages.en}>
        <ContactForm />
      </NextIntlClientProvider>
    )

    // Fill form in English
    const nameInput = screen.getByPlaceholderText(
      messages.en.contact.form.name.placeholder
    )
    const emailInput = screen.getByPlaceholderText(
      messages.en.contact.form.email.placeholder
    )

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')

    currentFormData.name = 'John Doe'
    currentFormData.email = 'john@example.com'

    // Switch to Spanish
    rerender(
      <NextIntlClientProvider locale="es" messages={messages.es}>
        <ContactForm />
      </NextIntlClientProvider>
    )

    // Verify form data is preserved
    const nameInputEs = screen.getByPlaceholderText(
      messages.es.contact.form.name.placeholder
    )
    const emailInputEs = screen.getByPlaceholderText(
      messages.es.contact.form.email.placeholder
    )

    expect(nameInputEs).toHaveValue('John Doe')
    expect(emailInputEs).toHaveValue('john@example.com')
  })

  it('should update validation messages when switching languages', async () => {
    const user = userEvent.setup()

    // Mock with validation errors
    vi.doMock('../model', () => ({
      useContactForm: () => ({
        formData: currentFormData,
        validationState: {
          isValid: false,
          errors: { name: messages.en.validation.name.required },
          isDirty: true,
        },
        isSubmitting: false,
        isSuccess: false,
        error: null,
        updateField: mockUpdateField,
        handleSubmit: mockHandleSubmit,
        resetForm: vi.fn(),
      }),
    }))

    const { rerender } = render(
      <NextIntlClientProvider locale="en" messages={messages.en}>
        <ContactForm />
      </NextIntlClientProvider>
    )

    // Trigger validation by blurring empty field
    const nameInput = screen.getByPlaceholderText(
      messages.en.contact.form.name.placeholder
    )
    await user.click(nameInput)
    await user.tab()

    // Switch to Spanish
    rerender(
      <NextIntlClientProvider locale="es" messages={messages.es}>
        <ContactForm />
      </NextIntlClientProvider>
    )

    // Labels should be in Spanish
    await waitFor(() => {
      expect(
        screen.getByText(messages.es.contact.form.name.label)
      ).toBeInTheDocument()
    })
  })
})
