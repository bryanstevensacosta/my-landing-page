import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GlassPanel } from '../GlassPanel'

describe('GlassPanel', () => {
  it('should render children correctly', () => {
    render(
      <GlassPanel>
        <div data-testid="child-content">Test Content</div>
      </GlassPanel>
    )

    expect(screen.getByTestId('child-content')).toBeDefined()
    expect(screen.getByText('Test Content')).toBeDefined()
  })

  it('should apply default primary glow color', () => {
    const { container } = render(
      <GlassPanel>
        <div>Content</div>
      </GlassPanel>
    )

    const glowElement = container.querySelector('.bg-primary\\/10')
    expect(glowElement).toBeDefined()
  })

  it('should apply purple glow color when specified', () => {
    const { container } = render(
      <GlassPanel glowColor="purple">
        <div>Content</div>
      </GlassPanel>
    )

    const glowElement = container.querySelector('.bg-purple-500\\/10')
    expect(glowElement).toBeDefined()
  })

  it('should apply indigo glow color when specified', () => {
    const { container } = render(
      <GlassPanel glowColor="indigo">
        <div>Content</div>
      </GlassPanel>
    )

    const glowElement = container.querySelector('.bg-indigo-900\\/60')
    expect(glowElement).toBeDefined()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <GlassPanel className="custom-class">
        <div>Content</div>
      </GlassPanel>
    )

    const wrapper = container.querySelector('.custom-class')
    expect(wrapper).toBeDefined()
  })

  it('should have glass panel styling classes', () => {
    const { container } = render(
      <GlassPanel>
        <div>Content</div>
      </GlassPanel>
    )

    const glassPanel = container.querySelector('.glass-panel')
    expect(glassPanel).toBeDefined()
    expect(glassPanel?.className).toContain('rounded-2xl')
    expect(glassPanel?.className).toContain('p-8')
  })

  it('should have backdrop blur effect', () => {
    const { container } = render(
      <GlassPanel>
        <div>Content</div>
      </GlassPanel>
    )

    const glassPanel = container.querySelector('.backdrop-blur-\\[24px\\]')
    expect(glassPanel).toBeDefined()
  })

  it('should have border styling', () => {
    const { container } = render(
      <GlassPanel>
        <div>Content</div>
      </GlassPanel>
    )

    const glassPanel = container.querySelector('.border')
    expect(glassPanel).toBeDefined()
    expect(glassPanel?.className).toContain('border-white/8')
  })
})
