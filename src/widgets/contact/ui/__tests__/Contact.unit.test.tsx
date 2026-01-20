import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { Contact } from '../Contact'

vi.mock('../../lib/contactApi', () => ({
  submitContactForm: vi.fn(),
}))

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
    trust: {
      response: {
        title: '24h Response',
        description: 'Quick turnaround on all inquiries',
      },
      technical: {
        title: 'Technical Feedback',
        description: 'Detailed project assessment',
      },
      nda: {
        title: 'NDA Respect',
        description: 'Your ideas stay confidential',
      },
      available: 'Available for Projects',
      heading: { line1: 'Ready to Build', line2: 'Something Amazing' },
      description: 'Let me help you bring your ideas to life',
      trustedBy: 'Trusted By',
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

describe('Contact Widget Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    sessionStorage.clear()
  })

  describe('Layout Rendering', () => {
    it('should render two-column layout', () => {
      const { container } = renderWithIntl(<Contact />)

      const grid = container.querySelector('.grid')
      expect(grid).toBeInTheDocument()
      expect(grid).toHaveClass('lg:grid-cols-2')
    })

    it('should render both TrustIndicators and ContactForm components', () => {
      const { container } = renderWithIntl(<Contact />)

      // Check that both columns exist
      const columns = container.querySelectorAll('.grid > div')
      expect(columns.length).toBe(2)
    })
  })

  describe('Background Effects', () => {
    it('should render ambient glow spots', () => {
      const { container } = renderWithIntl(<Contact />)

      const glowSpots = container.querySelectorAll('[class*="blur-"]')
      expect(glowSpots.length).toBeGreaterThan(0)
    })

    it('should render background decorative elements', () => {
      const { container } = renderWithIntl(<Contact />)

      // Check for pointer-events-none elements (noise texture and glow spots)
      const decorativeElements = container.querySelectorAll(
        '.pointer-events-none'
      )
      expect(decorativeElements.length).toBeGreaterThan(0)
    })

    it('should have gradient background', () => {
      const { container } = renderWithIntl(<Contact />)

      const section = container.querySelector('section')
      expect(section).toHaveClass('bg-gradient-to-b')
    })
  })

  describe('Responsive Layout', () => {
    it('should have responsive grid classes', () => {
      const { container } = renderWithIntl(<Contact />)

      const grid = container.querySelector('.grid')
      expect(grid).toHaveClass('gap-12')
      expect(grid).toHaveClass('lg:gap-16')
    })

    it('should have responsive padding', () => {
      const { container } = renderWithIntl(<Contact />)

      const section = container.querySelector('section')
      expect(section).toHaveClass('py-20')
      expect(section).toHaveClass('md:py-32')
    })
  })

  describe('Section Attributes', () => {
    it('should have contact id for navigation', () => {
      const { container } = renderWithIntl(<Contact />)

      const section = container.querySelector('#contact')
      expect(section).toBeInTheDocument()
    })

    it('should be a section element', () => {
      const { container } = renderWithIntl(<Contact />)

      const section = container.querySelector('section')
      expect(section).toBeInTheDocument()
    })

    it('should accept custom className', () => {
      const { container } = renderWithIntl(<Contact className="custom-class" />)

      const section = container.querySelector('section')
      expect(section).toHaveClass('custom-class')
    })
  })
})
