import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { Services } from '../Services'
import enMessages from '@/i18n/locales/en.json'

function renderWithIntl(component: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      {component}
    </NextIntlClientProvider>
  )
}

describe('Services Widget', () => {
  it('should render without crashing', () => {
    const { container } = renderWithIntl(<Services />)
    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('should display section header with correct text', () => {
    renderWithIntl(<Services />)

    expect(screen.getByText('Capabilities')).toBeInTheDocument()
    expect(screen.getByText('ENGINEERING ECOSYSTEM')).toBeInTheDocument()
    expect(
      screen.getByText(/We build resilient digital infrastructure/)
    ).toBeInTheDocument()
  })

  it('should render exactly 6 service cards', () => {
    const { container } = renderWithIntl(<Services />)

    const cards = container.querySelectorAll('[role="article"]')
    expect(cards).toHaveLength(6)
  })

  it('should have responsive grid classes', () => {
    const { container } = renderWithIntl(<Services />)

    const grid = container.querySelector('.grid')
    expect(grid?.className).toContain('grid-cols-1')
    expect(grid?.className).toContain('md:grid-cols-2')
    expect(grid?.className).toContain('lg:grid-cols-4')
  })

  it('should have grid gap spacing of 1.25rem', () => {
    const { container } = renderWithIntl(<Services />)

    const grid = container.querySelector('.grid')
    expect(grid?.className).toContain('gap-5')
  })

  it('should have background grid pattern', () => {
    const { container } = renderWithIntl(<Services />)

    const bgPattern = container.querySelector('.bg-grid-pattern')
    expect(bgPattern).toBeInTheDocument()
  })

  it('should use proper heading hierarchy', () => {
    const { container } = renderWithIntl(<Services />)

    const h2 = container.querySelector('h2')
    expect(h2).toBeInTheDocument()
    expect(h2?.textContent).toBe('ENGINEERING ECOSYSTEM')

    const h3Elements = container.querySelectorAll('h3')
    expect(h3Elements.length).toBeGreaterThan(0)
  })
})
