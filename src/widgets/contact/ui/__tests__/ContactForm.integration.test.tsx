import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'
import { ContactForm } from '../ContactForm'

vi.mock('../../lib/contactApi', () => ({
  submitContactForm: vi.fn(),
}))

import { submitContactForm } from '../../lib/contactApi'

const messages = {
  contact: {
    form: {
      title: 'Get In Touch',
      subtitle: "Let's discuss your project",
      name: { label: 'Name', placeholder: 'John Doe' },
      email: { label: 'Email', placeholder: 'john@example.com' },
      company: { label: 'Company', placeholder: 'Acme Inc. (Optional)' },
      projectType: {
        label: 'Project Type',
        placeholder: 'Select a project type',
      },
      message: {
        label: 'Message',
        placeholder: 'Tell me about your project...',
      },
      submit: 'Send Message',
      submitting: 'Sending...',
      error: { title: 'Error' },
    },
    projectType: {
      mvp: 'MVP Development',
      scaling: 'Scaling & Growth',
      ai: 'AI/ML',
      consultation: 'Consultation',
    },
    success: {
      title: 'Message Sent Successfully!',
      message:
        "Thank you for reaching out! I'll get back to you within 24 hours.",
      cta: 'Explore My Work',
    },
  },
  validation: {
    name: { required: 'Name is required' },
    email: {
      required: 'Email is required',
      invalid: 'Please enter a valid email address',
    },
    projectType: { required: 'Project type is required' },
    message: {
      required: 'Message is required',
      minLength: 'Message must be at least 10 characters',
    },
  },
}

const renderWithIntl = (ui: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  )
}

describe('ContactForm Integration Tests', () => {
  const mockSubmitContactForm = vi.mocked(submitContactForm)

  beforeEach(() => {
    vi.clearAllMocks()
    sessionStorage.removeItem('contact-form-data')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should complete full submission flow', async () => {
    const user = userEvent.setup()
    mockSubmitContactForm.mockResolvedValueOnce({
      success: true,
      message: 'Success',
    })

    renderWithIntl(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.selectOptions(screen.getByLabelText(/project type/i), 'mvp')
    await user.type(screen.getByLabelText(/message/i), 'Test message here.')

    await user.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(
      () => {
        expect(mockSubmitContactForm).toHaveBeenCalled()
      },
      { timeout: 5000 }
    )

    await waitFor(
      () => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      },
      { timeout: 5000 }
    )
  })
})
