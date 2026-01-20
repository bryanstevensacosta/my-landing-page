/**
 * Unit Tests for Keyboard Navigation
 * Feature: contact-section
 * Tests keyboard accessibility and navigation
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '../ContactForm'
import { NextIntlClientProvider } from 'next-intl'
import enMessages from '@/i18n/locales/en.json'

// Mock the hooks before imports
vi.mock('../../model', () => ({
  useContactForm: vi.fn(),
}))

describe('Keyboard Navigation', () => {
  let mockUpdateField: ReturnType<typeof vi.fn>
  let mockHandleSubmit: ReturnType<typeof vi.fn>

  beforeEach(async () => {
    mockUpdateField = vi.fn()
    mockHandleSubmit = vi.fn((e) => e.preventDefault())

    const { useContactForm } = await import('../../model')
    vi.mocked(useContactForm).mockReturnValue({
      formData: {
        name: '',
        email: '',
        company: '',
        projectType: '',
        message: '',
      },
      validationState: {
        isValid: true,
        errors: {},
        isDirty: false,
      },
      isSubmitting: false,
      isSuccess: false,
      error: null,
      updateField: mockUpdateField as any,
      handleSubmit: mockHandleSubmit as any,
      resetForm: vi.fn(),
    })
  })

  it('should navigate through form fields using Tab key', async () => {
    const user = userEvent.setup()

    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <ContactForm />
      </NextIntlClientProvider>
    )

    const nameInput = screen.getByPlaceholderText(
      enMessages.contact.form.name.placeholder
    )
    const emailInput = screen.getByPlaceholderText(
      enMessages.contact.form.email.placeholder
    )
    const companyInput = screen.getByPlaceholderText(
      enMessages.contact.form.company.placeholder
    )
    const projectTypeSelect = screen.getByRole('combobox')
    const messageTextarea = screen.getByPlaceholderText(
      enMessages.contact.form.message.placeholder
    )
    const submitButton = screen.getByRole('button', {
      name: /send message/i,
    })

    // Start from name input
    nameInput.focus()
    expect(document.activeElement).toBe(nameInput)

    // Tab to email
    await user.tab()
    expect(document.activeElement).toBe(emailInput)

    // Tab to company
    await user.tab()
    expect(document.activeElement).toBe(companyInput)

    // Tab to project type
    await user.tab()
    expect(document.activeElement).toBe(projectTypeSelect)

    // Tab to message
    await user.tab()
    expect(document.activeElement).toBe(messageTextarea)

    // Tab to submit button
    await user.tab()
    expect(document.activeElement).toBe(submitButton)
  })

  it('should navigate backwards using Shift+Tab', async () => {
    const user = userEvent.setup()

    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <ContactForm />
      </NextIntlClientProvider>
    )

    const submitButton = screen.getByRole('button', {
      name: /send message/i,
    })
    const messageTextarea = screen.getByPlaceholderText(
      enMessages.contact.form.message.placeholder
    )

    // Start from submit button
    submitButton.focus()
    expect(document.activeElement).toBe(submitButton)

    // Shift+Tab to message
    await user.tab({ shift: true })
    expect(document.activeElement).toBe(messageTextarea)
  })

  it('should submit form using Enter key on submit button', async () => {
    const user = userEvent.setup()

    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <ContactForm />
      </NextIntlClientProvider>
    )

    const submitButton = screen.getByRole('button', {
      name: /send message/i,
    })

    submitButton.focus()
    await user.keyboard('{Enter}')

    expect(mockHandleSubmit).toHaveBeenCalled()
  })

  it('should allow typing in inputs using keyboard', async () => {
    const user = userEvent.setup()

    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <ContactForm />
      </NextIntlClientProvider>
    )

    const nameInput = screen.getByPlaceholderText(
      enMessages.contact.form.name.placeholder
    )

    await user.click(nameInput)
    await user.keyboard('John Doe')

    // Verify updateField was called (actual value update is tested in integration tests)
    expect(mockUpdateField).toHaveBeenCalled()
  })

  it('should allow selecting options in select using keyboard', async () => {
    const user = userEvent.setup()

    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <ContactForm />
      </NextIntlClientProvider>
    )

    const projectTypeSelect = screen.getByRole('combobox')

    await user.click(projectTypeSelect)
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{Enter}')

    // Verify updateField was called (actual value update is tested in integration tests)
    expect(mockUpdateField).toHaveBeenCalled()
  })

  it('should show focus indicators on all interactive elements', async () => {
    const user = userEvent.setup()

    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <ContactForm />
      </NextIntlClientProvider>
    )

    const nameInput = screen.getByPlaceholderText(
      enMessages.contact.form.name.placeholder
    )
    const submitButton = screen.getByRole('button', {
      name: /send message/i,
    })

    // Check that focus styles are defined
    expect(nameInput.className).toMatch(/focus:/)
    expect(submitButton.className).toMatch(/focus:/)
  })

  it('should not trap focus in the form', async () => {
    const user = userEvent.setup()

    render(
      <div>
        <button>Before Form</button>
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <ContactForm />
        </NextIntlClientProvider>
        <button>After Form</button>
      </div>
    )

    const beforeButton = screen.getByText('Before Form')
    const afterButton = screen.getByText('After Form')
    const nameInput = screen.getByPlaceholderText(
      enMessages.contact.form.name.placeholder
    )

    // Focus before button
    beforeButton.focus()
    expect(document.activeElement).toBe(beforeButton)

    // Tab into form
    await user.tab()
    expect(document.activeElement).toBe(nameInput)

    // Tab through form to after button
    await user.tab() // email
    await user.tab() // company
    await user.tab() // project type
    await user.tab() // message
    await user.tab() // submit button
    await user.tab() // should exit form

    expect(document.activeElement).toBe(afterButton)
  })
})
