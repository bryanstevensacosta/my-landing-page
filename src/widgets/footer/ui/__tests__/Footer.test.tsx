import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from '../Footer'

// Mock next-intl
const mockUseTranslations = vi.fn()

vi.mock('next-intl', () => ({
  useTranslations: () => mockUseTranslations,
}))

// Mock Link from i18n routing
vi.mock('@/i18n/routing', () => ({
  Link: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode
    href: string
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('Footer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render with Spanish translations', () => {
    // Mock Spanish translations
    mockUseTranslations.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        copyright: '© 2024 DevPortfolio. Built with Next.js and Tailwind.',
        privacy: 'Privacidad',
        terms: 'Términos',
      }
      return translations[key] || key
    })

    render(<Footer />)

    // Check copyright text
    expect(
      screen.getByText('© 2024 DevPortfolio. Built with Next.js and Tailwind.')
    ).toBeDefined()

    // Check privacy link
    expect(screen.getByText('Privacidad')).toBeDefined()

    // Check terms link
    expect(screen.getByText('Términos')).toBeDefined()
  })

  it('should render with English translations', () => {
    // Mock English translations
    mockUseTranslations.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        copyright: '© 2024 DevPortfolio. Built with Next.js and Tailwind.',
        privacy: 'Privacy',
        terms: 'Terms',
      }
      return translations[key] || key
    })

    render(<Footer />)

    // Check copyright text
    expect(
      screen.getByText('© 2024 DevPortfolio. Built with Next.js and Tailwind.')
    ).toBeDefined()

    // Check privacy link
    expect(screen.getByText('Privacy')).toBeDefined()

    // Check terms link
    expect(screen.getByText('Terms')).toBeDefined()
  })

  it('should use translation keys for all text content', () => {
    const translationKeys: string[] = []

    // Track which translation keys are requested
    mockUseTranslations.mockImplementation((key: string) => {
      translationKeys.push(key)
      return key // Return the key itself for verification
    })

    render(<Footer />)

    // Verify all expected translation keys were requested
    expect(translationKeys).toContain('copyright')
    expect(translationKeys).toContain('privacy')
    expect(translationKeys).toContain('terms')

    // Verify no hardcoded text
    expect(
      screen.queryByText(
        '© 2024 DevPortfolio. Built with Next.js and Tailwind.'
      )
    ).toBeNull()
    expect(screen.queryByText('Privacy')).toBeNull()
    expect(screen.queryByText('Terms')).toBeNull()
  })

  it('should render all structural elements', () => {
    mockUseTranslations.mockImplementation((key: string) => key)

    const { container } = render(<Footer />)

    // Check footer element
    const footer = container.querySelector('footer')
    expect(footer).toBeDefined()

    // Check links are rendered
    const links = container.querySelectorAll('a')
    expect(links.length).toBe(2)
  })
})
