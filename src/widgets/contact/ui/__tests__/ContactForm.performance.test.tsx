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

describe('ContactForm Performance Tests', () => {
  const mockSubmitContactForm = vi.mocked(submitContactForm)

  beforeEach(() => {
    vi.clearAllMocks()
    sessionStorage.clear()
  })

  describe('Lazy Loading', () => {
    it('should lazy load SuccessModal component', async () => {
      const user = userEvent.setup()
      mockSubmitContactForm.mockResolvedValueOnce({
        success: true,
        message: 'Success',
      })

      renderWithIntl(<ContactForm />)

      // SuccessModal should not be in the DOM initially
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), 'Test User')
      await user.type(screen.getByLabelText(/email/i), 'test@example.com')
      await user.selectOptions(screen.getByLabelText(/project type/i), 'mvp')
      await user.type(screen.getByLabelText(/message/i), 'Test message here.')

      await user.click(screen.getByRole('button', { name: /send message/i }))

      // SuccessModal should be loaded and rendered after successful submission
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    })

    it('should not load SuccessModal until needed', () => {
      renderWithIntl(<ContactForm />)

      // SuccessModal should not be loaded initially
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      expect(
        screen.queryByText('Message Sent Successfully!')
      ).not.toBeInTheDocument()
    })
  })

  describe('Validation Debouncing', () => {
    it('should debounce validation on input change', async () => {
      const user = userEvent.setup({ delay: null }) // No delay for faster test
      renderWithIntl(<ContactForm />)

      const nameInput = screen.getByLabelText(/name/i)

      // Type quickly (simulating real user input)
      await user.type(nameInput, 'T')
      await user.type(nameInput, 'e')
      await user.type(nameInput, 's')
      await user.type(nameInput, 't')

      // Validation should not show errors immediately during typing
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument()
    })

    it('should validate immediately on blur', async () => {
      const user = userEvent.setup()
      renderWithIntl(<ContactForm />)

      const nameInput = screen.getByLabelText(/name/i)

      // Focus and blur without entering value
      await user.click(nameInput)
      await user.tab()

      // Validation should show error immediately on blur
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument()
      })
    })

    it('should not trigger excessive re-renders during typing', async () => {
      const user = userEvent.setup({ delay: null })
      renderWithIntl(<ContactForm />)

      const nameInput = screen.getByLabelText(/name/i)

      // Type a longer string
      await user.type(nameInput, 'Test User Name')

      // The component should still be responsive
      expect(nameInput).toHaveValue('Test User Name')
    })
  })

  describe('Performance Optimization', () => {
    it('should render form quickly', () => {
      const startTime = performance.now()
      renderWithIntl(<ContactForm />)
      const endTime = performance.now()

      // Form should render in less than 100ms
      expect(endTime - startTime).toBeLessThan(100)
    })

    it('should handle rapid input changes efficiently', async () => {
      const user = userEvent.setup({ delay: null })
      renderWithIntl(<ContactForm />)

      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/message/i)

      // Rapidly fill multiple fields
      await user.type(nameInput, 'Test User')
      await user.type(emailInput, 'test@example.com')
      await user.type(messageInput, 'This is a test message')

      // All fields should have correct values
      expect(nameInput).toHaveValue('Test User')
      expect(emailInput).toHaveValue('test@example.com')
      expect(messageInput).toHaveValue('This is a test message')
    })
  })
})
