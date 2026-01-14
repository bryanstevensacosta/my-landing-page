import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from '../Hero'

// Mock next-intl
const mockTranslations: Record<string, string | string[]> = {}

const createMockT = () => {
  const t = (key: string) => mockTranslations[key] || key
  t.raw = (key: string) => mockTranslations[key] || []
  return t
}

vi.mock('next-intl', () => ({
  useTranslations: () => createMockT(),
}))

// Mock RotatingText
vi.mock('@/shared/ui/rotating-text', () => ({
  default: ({ texts }: { texts: string[] }) => (
    <span data-testid="rotating-text">{texts[0]}</span>
  ),
}))

// Mock Avatar
vi.mock('@/shared/ui/avatar', () => ({
  Avatar: () => <div data-testid="avatar">Avatar</div>,
}))

// Mock Button
vi.mock('@/shared/ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}))

// Mock TechStackScroller
vi.mock('../TechStackScroller', () => ({
  TechStackScroller: () => (
    <div data-testid="tech-stack-scroller">Tech Stack</div>
  ),
}))

// Mock StatsCards
vi.mock('../StatsCards', () => ({
  StatsCards: () => <div data-testid="stats-cards">Stats</div>,
}))

// Mock SocialLinks
vi.mock('@/features/social-share/ui/SocialLinks', () => ({
  SocialLinks: () => <div data-testid="social-links">Social Links</div>,
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ArrowRight: () => <div data-testid="arrow-right-icon">→</div>,
  Sparkles: () => <div data-testid="sparkles-icon">✨</div>,
  CheckCircle2: () => <div data-testid="check-circle-icon">✓</div>,
}))

describe('Hero', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset translations
    Object.keys(mockTranslations).forEach((key) => delete mockTranslations[key])
  })

  it('should render with Spanish translations', () => {
    // Set Spanish translations
    Object.assign(mockTranslations, {
      badge: 'Software Developer',
      title: 'Construyo el futuro con',
      titleHighlight: 'código de alto impacto',
      rotatingWords: [
        'startups',
        'empresas',
        'innovadores',
        'soñadores',
        'equipos',
      ],
      description:
        'Especialista en arquitecturas escalables, IA y desarrollo Full-Stack. Transformo la visión de tu startup en productos digitales robustos y memorables.',
      'cta.explore': 'Explorar Proyectos',
      'cta.contact': 'Iniciar Contacto',
      guarantee:
        'Proyectos entregados a tiempo y con calidad técnica garantizada',
    })

    render(<Hero />)

    // Check badge
    expect(screen.getByText('Software Developer')).toBeDefined()

    // Check description
    expect(
      screen.getByText(
        'Especialista en arquitecturas escalables, IA y desarrollo Full-Stack. Transformo la visión de tu startup en productos digitales robustos y memorables.'
      )
    ).toBeDefined()

    // Check CTA buttons
    expect(screen.getByText('Explorar Proyectos')).toBeDefined()
    expect(screen.getByText('Iniciar Contacto')).toBeDefined()

    // Check guarantee text
    expect(
      screen.getByText(
        'Proyectos entregados a tiempo y con calidad técnica garantizada'
      )
    ).toBeDefined()

    // Check rotating text is rendered
    expect(screen.getByTestId('rotating-text')).toBeDefined()
  })

  it('should render with English translations', () => {
    // Set English translations
    Object.assign(mockTranslations, {
      badge: 'Software Developer',
      title: 'Building the future with',
      titleHighlight: 'high-impact code',
      rotatingWords: [
        'startups',
        'founders',
        'teams',
        'companies',
        'businesses',
      ],
      description:
        'Specialist in scalable architectures, AI, and Full-Stack development. I transform your startup vision into robust and memorable digital products.',
      'cta.explore': 'Explore Projects',
      'cta.contact': 'Start Contact',
      guarantee: 'Projects delivered on time with guaranteed technical quality',
    })

    render(<Hero />)

    // Check badge
    expect(screen.getByText('Software Developer')).toBeDefined()

    // Check description
    expect(
      screen.getByText(
        'Specialist in scalable architectures, AI, and Full-Stack development. I transform your startup vision into robust and memorable digital products.'
      )
    ).toBeDefined()

    // Check CTA buttons
    expect(screen.getByText('Explore Projects')).toBeDefined()
    expect(screen.getByText('Start Contact')).toBeDefined()

    // Check guarantee text
    expect(
      screen.getByText(
        'Projects delivered on time with guaranteed technical quality'
      )
    ).toBeDefined()
  })

  it('should render all child components', () => {
    Object.assign(mockTranslations, {
      rotatingWords: ['test'],
    })

    render(<Hero />)

    // Check all child components are rendered
    expect(screen.getByTestId('avatar')).toBeDefined()
    expect(screen.getByTestId('tech-stack-scroller')).toBeDefined()
    expect(screen.getByTestId('stats-cards')).toBeDefined()
    expect(screen.getByTestId('social-links')).toBeDefined()
    expect(screen.getByTestId('rotating-text')).toBeDefined()
  })

  it('should render all structural elements', () => {
    Object.assign(mockTranslations, {
      rotatingWords: ['test'],
    })

    const { container } = render(<Hero />)

    // Check main element
    const main = container.querySelector('main')
    expect(main).toBeDefined()

    // Check h1 element
    const h1 = container.querySelector('h1')
    expect(h1).toBeDefined()

    // Check icons are rendered
    expect(screen.getByTestId('sparkles-icon')).toBeDefined()
    expect(screen.getByTestId('arrow-right-icon')).toBeDefined()
    expect(screen.getByTestId('check-circle-icon')).toBeDefined()
  })
})
