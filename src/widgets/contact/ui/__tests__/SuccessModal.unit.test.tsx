import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'
import { SuccessModal } from '../SuccessModal'

const messages = {
  contact: {
    success: {
      title: 'Message Sent Successfully!',
      message:
        "Thank you for reaching out! I'll get back to you within 24 hours.",
      cta: 'Explore My Work',
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

describe('SuccessModal', () => {
  const mockOnClose = vi.fn()
  const mockOnExploreWork = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Rendering', () => {
    it('should render when open', () => {
      renderWithIntl(<SuccessModal isOpen={true} onClose={mockOnClose} />)

      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByText('Message Sent Successfully!')).toBeInTheDocument()
      expect(
        screen.getByText(
          "Thank you for reaching out! I'll get back to you within 24 hours."
        )
      ).toBeInTheDocument()
    })

    it('should not render when closed', () => {
      renderWithIntl(<SuccessModal isOpen={false} onClose={mockOnClose} />)

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('should render CTA button', () => {
      renderWithIntl(<SuccessModal isOpen={true} onClose={mockOnClose} />)

      expect(
        screen.getByRole('button', { name: /explore my work/i })
      ).toBeInTheDocument()
    })

    it('should render success icon', () => {
      renderWithIntl(<SuccessModal isOpen={true} onClose={mockOnClose} />)

      const icon = screen.getByText('check_circle')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveClass('material-symbols-outlined')
    })
  })

  describe('Close Interactions', () => {
    it('should close on outside click', async () => {
      const user = userEvent.setup()
      renderWithIntl(<SuccessModal isOpen={true} onClose={mockOnClose} />)

      const backdrop = screen.getByRole('dialog')
      await user.click(backdrop)

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('should not close when clicking inside modal', async () => {
      const user = userEvent.setup()
      renderWithIntl(<SuccessModal isOpen={true} onClose={mockOnClose} />)

      const title = screen.getByText('Message Sent Successfully!')
      await user.click(title)

      expect(mockOnClose).not.toHaveBeenCalled()
    })

    it('should close on escape key', async () => {
      const user = userEvent.setup()
      renderWithIntl(<SuccessModal isOpen={true} onClose={mockOnClose} />)

      await user.keyboard('{Escape}')

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('should call onExploreWork when CTA button is clicked', async () => {
      const user = userEvent.setup()
      renderWithIntl(
        <SuccessModal
          isOpen={true}
          onClose={mockOnClose}
          onExploreWork={mockOnExploreWork}
        />
      )

      const ctaButton = screen.getByRole('button', { name: /explore my work/i })
      await user.click(ctaButton)

      expect(mockOnExploreWork).toHaveBeenCalledTimes(1)
      expect(mockOnClose).not.toHaveBeenCalled()
    })

    it('should call onClose when CTA button is clicked and onExploreWork is not provided', async () => {
      const user = userEvent.setup()
      renderWithIntl(<SuccessModal isOpen={true} onClose={mockOnClose} />)

      const ctaButton = screen.getByRole('button', { name: /explore my work/i })
      await user.click(ctaButton)

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('Focus Trapping', () => {
    it('should focus first focusable element when opened', async () => {
      renderWithIntl(<SuccessModal isOpen={true} onClose={mockOnClose} />)

      await waitFor(() => {
        const ctaButton = screen.getByRole('button', {
          name: /explore my work/i,
        })
        expect(ctaButton).toHaveFocus()
      })
    })

    it('should restore focus to previous element when closed', async () => {
      const { rerender } = renderWithIntl(
        <>
          <button>Previous Button</button>
          <SuccessModal isOpen={false} onClose={mockOnClose} />
        </>
      )

      const previousButton = screen.getByRole('button', {
        name: 'Previous Button',
      })
      previousButton.focus()
      expect(previousButton).toHaveFocus()

      // Open modal
      rerender(
        <NextIntlClientProvider locale="en" messages={messages}>
          <button>Previous Button</button>
          <SuccessModal isOpen={true} onClose={mockOnClose} />
        </NextIntlClientProvider>
      )

      await waitFor(() => {
        const ctaButton = screen.getByRole('button', {
          name: /explore my work/i,
        })
        expect(ctaButton).toHaveFocus()
      })

      // Close modal
      rerender(
        <NextIntlClientProvider locale="en" messages={messages}>
          <button>Previous Button</button>
          <SuccessModal isOpen={false} onClose={mockOnClose} />
        </NextIntlClientProvider>
      )

      await waitFor(() => {
        expect(previousButton).toHaveFocus()
      })
    })
  })

  describe('ARIA Attributes', () => {
    it('should have role="dialog"', () => {
      renderWithIntl(<SuccessModal isOpen={true} onClose={mockOnClose} />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
    })

    it('should have aria-modal="true"', () => {
      renderWithIntl(<SuccessModal isOpen={true} onClose={mockOnClose} />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-modal', 'true')
    })

    it('should have aria-labelledby pointing to title', () => {
      renderWithIntl(<SuccessModal isOpen={true} onClose={mockOnClose} />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-labelledby', 'success-modal-title')

      const title = screen.getByText('Message Sent Successfully!')
      expect(title).toHaveAttribute('id', 'success-modal-title')
    })

    it('should have aria-hidden on decorative icon', () => {
      renderWithIntl(<SuccessModal isOpen={true} onClose={mockOnClose} />)

      const icon = screen.getByText('check_circle')
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('i18n Integration', () => {
    it('should display translated title', () => {
      renderWithIntl(<SuccessModal isOpen={true} onClose={mockOnClose} />)

      expect(screen.getByText('Message Sent Successfully!')).toBeInTheDocument()
    })

    it('should display translated message', () => {
      renderWithIntl(<SuccessModal isOpen={true} onClose={mockOnClose} />)

      expect(
        screen.getByText(
          "Thank you for reaching out! I'll get back to you within 24 hours."
        )
      ).toBeInTheDocument()
    })

    it('should display translated CTA button text', () => {
      renderWithIntl(<SuccessModal isOpen={true} onClose={mockOnClose} />)

      expect(
        screen.getByRole('button', { name: /explore my work/i })
      ).toBeInTheDocument()
    })

    it('should support Spanish translations', () => {
      const spanishMessages = {
        contact: {
          success: {
            title: '¡Mensaje Enviado Exitosamente!',
            message:
              '¡Gracias por contactarme! Te responderé dentro de 24 horas.',
            cta: 'Explorar Mi Trabajo',
          },
        },
      }

      render(
        <NextIntlClientProvider locale="es" messages={spanishMessages}>
          <SuccessModal isOpen={true} onClose={mockOnClose} />
        </NextIntlClientProvider>
      )

      expect(
        screen.getByText('¡Mensaje Enviado Exitosamente!')
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          '¡Gracias por contactarme! Te responderé dentro de 24 horas.'
        )
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /explorar mi trabajo/i })
      ).toBeInTheDocument()
    })
  })

  describe('Event Cleanup', () => {
    it('should remove escape key listener when modal closes', () => {
      const { rerender } = renderWithIntl(
        <SuccessModal isOpen={true} onClose={mockOnClose} />
      )

      // Close modal
      rerender(
        <NextIntlClientProvider locale="en" messages={messages}>
          <SuccessModal isOpen={false} onClose={mockOnClose} />
        </NextIntlClientProvider>
      )

      // Try to trigger escape key - should not call onClose
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' })
      document.dispatchEvent(escapeEvent)

      // onClose should not be called since modal is closed
      expect(mockOnClose).not.toHaveBeenCalled()
    })

    it('should remove escape key listener when component unmounts', () => {
      const { unmount } = renderWithIntl(
        <SuccessModal isOpen={true} onClose={mockOnClose} />
      )

      unmount()

      // Try to trigger escape key - should not call onClose
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' })
      document.dispatchEvent(escapeEvent)

      expect(mockOnClose).not.toHaveBeenCalled()
    })
  })
})
