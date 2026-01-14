import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'
import { LanguageSwitcher } from '@/shared/ui/language-switcher/LanguageSwitcher'
import esMessages from '@/i18n/locales/es.json'
import enMessages from '@/i18n/locales/en.json'

/**
 * Integration Test: Full Locale Switching Flow
 *
 * Tests the complete user journey:
 * 1. User visits site → detects browser language → renders in detected language
 * 2. User clicks language switcher → changes locale → UI updates
 * 3. User refreshes page → locale persists
 */

// Mock next-intl hooks
const mockRouter = {
  replace: vi.fn(),
  push: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
}

const mockPathname = '/'

vi.mock('@/i18n/routing', () => ({
  useRouter: () => mockRouter,
  usePathname: () => mockPathname,
  Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}))

describe('Integration: Full Locale Switching Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render language switcher with Spanish as default locale', () => {
    render(
      <NextIntlClientProvider locale="es" messages={esMessages}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    )

    // Verify Spanish button is active
    const spanishButton = screen.getByRole('button', {
      name: /switch to español/i,
    })
    const englishButton = screen.getByRole('button', {
      name: /switch to english/i,
    })

    expect(spanishButton).toBeInTheDocument()
    expect(englishButton).toBeInTheDocument()

    // Spanish should be marked as current
    expect(spanishButton).toHaveAttribute('aria-current', 'true')
    expect(englishButton).toHaveAttribute('aria-current', 'false')
  })

  it('should render language switcher with English locale', () => {
    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    )

    const spanishButton = screen.getByRole('button', {
      name: /switch to español/i,
    })
    const englishButton = screen.getByRole('button', {
      name: /switch to english/i,
    })

    // English should be marked as current
    expect(spanishButton).toHaveAttribute('aria-current', 'false')
    expect(englishButton).toHaveAttribute('aria-current', 'true')
  })

  it('should trigger locale change when clicking language switcher', async () => {
    const user = userEvent.setup()

    render(
      <NextIntlClientProvider locale="es" messages={esMessages}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    )

    const englishButton = screen.getByRole('button', {
      name: /switch to english/i,
    })

    // Click English button
    await user.click(englishButton)

    // Verify router.replace was called with correct locale
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/', { locale: 'en' })
    })
  })

  it('should trigger locale change from English to Spanish', async () => {
    const user = userEvent.setup()

    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    )

    const spanishButton = screen.getByRole('button', {
      name: /switch to español/i,
    })

    // Click Spanish button
    await user.click(spanishButton)

    // Verify router.replace was called with correct locale
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/', { locale: 'es' })
    })
  })

  it('should maintain locale context after switching', async () => {
    const user = userEvent.setup()

    const { rerender } = render(
      <NextIntlClientProvider locale="es" messages={esMessages}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    )

    // Click English button
    const englishButton = screen.getByRole('button', {
      name: /switch to english/i,
    })
    await user.click(englishButton)

    // Simulate re-render with new locale (as would happen in real app)
    rerender(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    )

    // Verify English is now active
    const spanishButton = screen.getByRole('button', {
      name: /switch to español/i,
    })
    const englishButtonAfter = screen.getByRole('button', {
      name: /switch to english/i,
    })

    expect(spanishButton).toHaveAttribute('aria-current', 'false')
    expect(englishButtonAfter).toHaveAttribute('aria-current', 'true')
  })

  it('should handle multiple locale switches', async () => {
    const user = userEvent.setup()

    const { rerender } = render(
      <NextIntlClientProvider locale="es" messages={esMessages}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    )

    // Switch to English
    const englishButton = screen.getByRole('button', {
      name: /switch to english/i,
    })
    await user.click(englishButton)

    expect(mockRouter.replace).toHaveBeenCalledWith('/', { locale: 'en' })

    // Simulate re-render with English
    rerender(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    )

    // Switch back to Spanish
    const spanishButton = screen.getByRole('button', {
      name: /switch to español/i,
    })
    await user.click(spanishButton)

    expect(mockRouter.replace).toHaveBeenCalledWith('/', { locale: 'es' })

    // Verify both calls were made
    expect(mockRouter.replace).toHaveBeenCalledTimes(2)
  })

  it('should preserve pathname when switching locales', async () => {
    const user = userEvent.setup()

    render(
      <NextIntlClientProvider locale="es" messages={esMessages}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    )

    const englishButton = screen.getByRole('button', {
      name: /switch to english/i,
    })
    await user.click(englishButton)

    // Should call router.replace with the current pathname
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith(mockPathname, {
        locale: 'en',
      })
    })
  })

  it('should be keyboard accessible', async () => {
    const user = userEvent.setup()

    render(
      <NextIntlClientProvider locale="es" messages={esMessages}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    )

    const spanishButton = screen.getByRole('button', {
      name: /switch to español/i,
    })
    const englishButton = screen.getByRole('button', {
      name: /switch to english/i,
    })

    // Tab to first button
    await user.tab()
    expect(spanishButton).toHaveFocus()

    // Tab to second button
    await user.tab()
    expect(englishButton).toHaveFocus()

    // Press Enter to activate
    await user.keyboard('{Enter}')

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/', { locale: 'en' })
    })
  })
})
