import { describe, it, expect, vi, beforeEach } from 'vitest'
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

describe('ContactForm Unit Tests', () => {
  const mockSubmitContactForm = vi.mocked(submitContactForm)

  beforeEach(() => {
    vi.clearAllMocks()
    sessionStorage.clear()
  })

  describe('Form Rendering', () => {
    it('should render all form fields', () => {
      renderWithIntl(<ContactForm />)

      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/project type/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    })

    it('should render submit button', () => {
      renderWithIntl(<ContactForm />)

      const submitButton = screen.getByRole('button', { name: /send message/i })
      expect(submitButton).toBeInTheDocument()
    })

    it('should render form title and subtitle', () => {
      renderWithIntl(<ContactForm />)

      expect(screen.getByText('Get In Touch')).toBeInTheDocument()
      expect(screen.getByText("Let's discuss your project")).toBeInTheDocument()
    })
  })

  describe('Loading State', () => {
    it('should show loading state during submission', async () => {
      const user = userEvent.setup()
      mockSubmitContactForm.mockImplementation(() => new Promise(() => {})) // Never resolves

      renderWithIntl(<ContactForm />)

      // Fill form
      await user.type(screen.getByLabelText(/name/i), 'Test User')
      await user.type(screen.getByLabelText(/email/i), 'test@example.com')
      await user.selectOptions(screen.getByLabelText(/project type/i), 'mvp')
      await user.type(screen.getByLabelText(/message/i), 'Test message here.')

      // Submit
      await user.click(screen.getByRole('button', { name: /send message/i }))

      // Check loading state
      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /sending/i })
        ).toBeInTheDocument()
      })
    })

    it('should disable submit button during submission', async () => {
      const user = userEvent.setup()
      mockSubmitContactForm.mockImplementation(() => new Promise(() => {}))

      renderWithIntl(<ContactForm />)

      await user.type(screen.getByLabelText(/name/i), 'Test User')
      await user.type(screen.getByLabelText(/email/i), 'test@example.com')
      await user.selectOptions(screen.getByLabelText(/project type/i), 'mvp')
      await user.type(screen.getByLabelText(/message/i), 'Test message here.')

      await user.click(screen.getByRole('button', { name: /send message/i }))

      await waitFor(() => {
        const button = screen.getByRole('button', { name: /sending/i })
        expect(button).toBeDisabled()
      })
    })
  })

  describe('Error Display', () => {
    it('should display error message on submission failure', async () => {
      const user = userEvent.setup()
      mockSubmitContactForm.mockRejectedValueOnce(new Error('Network error'))

      renderWithIntl(<ContactForm />)

      await user.type(screen.getByLabelText(/name/i), 'Test User')
      await user.type(screen.getByLabelText(/email/i), 'test@example.com')
      await user.selectOptions(screen.getByLabelText(/project type/i), 'mvp')
      await user.type(screen.getByLabelText(/message/i), 'Test message here.')

      await user.click(screen.getByRole('button', { name: /send message/i }))

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })
    })

    it('should clear error message on successful retry', async () => {
      const user = userEvent.setup()
      mockSubmitContactForm
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({ success: true, message: 'Success' })

      renderWithIntl(<ContactForm />)

      await user.type(screen.getByLabelText(/name/i), 'Test User')
      await user.type(screen.getByLabelText(/email/i), 'test@example.com')
      await user.selectOptions(screen.getByLabelText(/project type/i), 'mvp')
      await user.type(screen.getByLabelText(/message/i), 'Test message here.')

      // First attempt - fails
      await user.click(screen.getByRole('button', { name: /send message/i }))

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      // Second attempt - succeeds
      await user.click(screen.getByRole('button', { name: /send message/i }))

      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })
  })

  describe('Success Modal', () => {
    it('should trigger success modal on successful submission', async () => {
      const user = userEvent.setup()
      mockSubmitContactForm.mockResolvedValueOnce({
        success: true,
        message: 'Success',
      })

      renderWithIntl(<ContactForm />)

      await user.type(screen.getByLabelText(/name/i), 'Test User')
      await user.type(screen.getByLabelText(/email/i), 'test@example.com')
      await user.selectOptions(screen.getByLabelText(/project type/i), 'mvp')
      await user.type(screen.getByLabelText(/message/i), 'Test message here.')

      await user.click(screen.getByRole('button', { name: /send message/i }))

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
        expect(
          screen.getByText('Message Sent Successfully!')
        ).toBeInTheDocument()
      })
    })

    it('should not show success modal on submission failure', async () => {
      const user = userEvent.setup()
      mockSubmitContactForm.mockRejectedValueOnce(new Error('Network error'))

      renderWithIntl(<ContactForm />)

      await user.type(screen.getByLabelText(/name/i), 'Test User')
      await user.type(screen.getByLabelText(/email/i), 'test@example.com')
      await user.selectOptions(screen.getByLabelText(/project type/i), 'mvp')
      await user.type(screen.getByLabelText(/message/i), 'Test message here.')

      await user.click(screen.getByRole('button', { name: /send message/i }))

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('Form Reset', () => {
    it('should reset form after successful submission and modal close', async () => {
      const user = userEvent.setup()
      mockSubmitContactForm.mockResolvedValueOnce({
        success: true,
        message: 'Success',
      })

      renderWithIntl(<ContactForm />)

      await user.type(screen.getByLabelText(/name/i), 'Test User')
      await user.type(screen.getByLabelText(/email/i), 'test@example.com')
      await user.selectOptions(screen.getByLabelText(/project type/i), 'mvp')
      await user.type(screen.getByLabelText(/message/i), 'Test message here.')

      await user.click(screen.getByRole('button', { name: /send message/i }))

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      // Close modal
      await user.click(screen.getByRole('button', { name: /explore my work/i }))

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })

      // Check form is reset
      await waitFor(
        () => {
          expect(screen.getByLabelText(/name/i)).toHaveValue('')
        },
        { timeout: 2000 }
      )

      expect(screen.getByLabelText(/email/i)).toHaveValue('')
      expect(screen.getByLabelText(/message/i)).toHaveValue('')
    })
  })
})
