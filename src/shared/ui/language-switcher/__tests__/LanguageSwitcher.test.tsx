import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { locales, localeNames, localeFlags } from '@/i18n/config'

// Mock next-intl hooks
const mockUseLocale = vi.fn()
const mockReplace = vi.fn()
const mockUsePathname = vi.fn()

vi.mock('next-intl', () => ({
  useLocale: () => mockUseLocale(),
}))

vi.mock('@/i18n/routing', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  usePathname: () => mockUsePathname(),
}))

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render all available locales', () => {
    mockUseLocale.mockReturnValue('es')
    mockUsePathname.mockReturnValue('/')

    render(<LanguageSwitcher />)

    // Check that all locales are rendered
    locales.forEach((locale) => {
      const button = screen.getByText(localeNames[locale])
      expect(button).toBeDefined()

      // Check that the flag is rendered
      const flag = screen.getByText(localeFlags[locale])
      expect(flag).toBeDefined()
    })
  })

  it('should visually indicate the active locale', () => {
    const activeLocale = 'es'
    mockUseLocale.mockReturnValue(activeLocale)
    mockUsePathname.mockReturnValue('/')

    render(<LanguageSwitcher />)

    locales.forEach((locale) => {
      const button = screen.getByText(localeNames[locale]).closest('button')
      expect(button).toBeDefined()

      if (locale === activeLocale) {
        // Active locale should have primary background
        expect(button?.className).toContain('bg-primary')
        expect(button?.className).toContain('text-white')
        expect(button?.getAttribute('aria-current')).toBe('true')
      } else {
        // Inactive locales should have different styling
        expect(button?.className).toContain('bg-white/5')
        expect(button?.className).toContain('text-gray-400')
        expect(button?.getAttribute('aria-current')).toBe('false')
      }
    })
  })

  it('should trigger navigation when clicking a locale', () => {
    const currentLocale = 'es'
    const targetLocale = 'en'
    const currentPath = '/'

    mockUseLocale.mockReturnValue(currentLocale)
    mockUsePathname.mockReturnValue(currentPath)

    render(<LanguageSwitcher />)

    // Click on the English locale button
    const englishButton = screen.getByText(localeNames[targetLocale])
    fireEvent.click(englishButton)

    // Verify router.replace was called with correct arguments
    expect(mockReplace).toHaveBeenCalledWith(currentPath, {
      locale: targetLocale,
    })
  })

  it('should have proper accessibility attributes', () => {
    mockUseLocale.mockReturnValue('es')
    mockUsePathname.mockReturnValue('/')

    render(<LanguageSwitcher />)

    locales.forEach((locale) => {
      const button = screen.getByText(localeNames[locale]).closest('button')
      expect(button).toBeDefined()

      // Check aria-label
      expect(button?.getAttribute('aria-label')).toBe(
        `Switch to ${localeNames[locale]}`
      )

      // Check aria-current
      expect(button?.getAttribute('aria-current')).toBeDefined()
    })
  })

  it('should render buttons in a flex container', () => {
    mockUseLocale.mockReturnValue('es')
    mockUsePathname.mockReturnValue('/')

    const { container } = render(<LanguageSwitcher />)

    const wrapper = container.querySelector('.flex.items-center.gap-2')
    expect(wrapper).toBeDefined()
  })

  it('should handle clicking the currently active locale', () => {
    const activeLocale = 'es'
    const currentPath = '/'

    mockUseLocale.mockReturnValue(activeLocale)
    mockUsePathname.mockReturnValue(currentPath)

    render(<LanguageSwitcher />)

    // Click on the already active locale
    const activeButton = screen.getByText(localeNames[activeLocale])
    fireEvent.click(activeButton)

    // Should still call router.replace (idempotent operation)
    expect(mockReplace).toHaveBeenCalledWith(currentPath, {
      locale: activeLocale,
    })
  })
})
