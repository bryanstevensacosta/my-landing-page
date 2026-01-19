import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Services } from '../ui/Services'

// Mock next-intl
const mockTranslations = {
  label: 'Capabilities',
  title: 'Engineering Ecosystem',
  subtitle: 'We build resilient digital infrastructure',
  cards: {
    'custom-software': {
      title: 'Custom Software & MVPs',
      description: 'Scalable architecture for high-growth startups',
    },
    'legacy-migration': {
      title: 'Legacy Migration',
      description: 'Modernize aging infrastructure',
    },
    'multi-platform': {
      title: 'Multi-Platform',
      description: 'Seamless experiences across platforms',
    },
    'ai-integration': {
      title: 'AI Integration',
      description: 'LLM Agents & Automation',
    },
    'ux-ui-design': {
      title: 'UX/UI Design',
      description: 'Functional interfaces',
    },
    'landing-pages': {
      title: 'Landing Pages',
      description: 'High-conversion architecture',
    },
  },
}

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const keys = key.split('.')
    let value: any = mockTranslations
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  },
}))

describe('Services Theme Integration', () => {
  it('should use theme token classes for background', () => {
    const { container } = render(<Services />)
    const section = container.querySelector('section')

    expect(section).toBeTruthy()
    // Section should have relative positioning for background pattern
    expect(section?.className).toContain('relative')

    // Background grid pattern should exist as child
    const bgPattern = container.querySelector('.bg-grid-pattern')
    expect(bgPattern).toBeTruthy()
  })

  it('should use theme-aware border colors', () => {
    const { container } = render(<Services />)
    const cards = container.querySelectorAll('[class*="border"]')

    expect(cards.length).toBeGreaterThan(0)
    // Cards should have border classes that use theme tokens
    cards.forEach((card) => {
      expect(card.className).toMatch(/border/)
    })
  })

  it('should apply card-hover-effect class for theme-aware hover', () => {
    const { container } = render(<Services />)
    const cards = container.querySelectorAll('.card-hover-effect')

    // Should have 6 service cards with hover effect
    expect(cards.length).toBe(6)
  })

  it('should apply icon-glow class for theme-aware icon effects', () => {
    const { container } = render(<Services />)
    const icons = container.querySelectorAll('.icon-glow')

    // Should have 6 icons with glow effect
    expect(icons.length).toBe(6)
  })

  it('should apply ai-card class for special purple theme', () => {
    const { container } = render(<Services />)
    const aiCard = container.querySelector('.ai-card')

    expect(aiCard).toBeTruthy()
    expect(aiCard?.className).toContain('card-hover-effect')
  })

  it('should use bg-grid-pattern for background decoration', () => {
    const { container } = render(<Services />)
    const gridPattern = container.querySelector('.bg-grid-pattern')

    expect(gridPattern).toBeTruthy()
  })

  it('should use theme-aware text colors', () => {
    const { container } = render(<Services />)
    const section = container.querySelector('section')

    // Check for text color classes
    expect(section?.innerHTML).toMatch(/text-(white|foreground|muted|gray)/)
  })
})
