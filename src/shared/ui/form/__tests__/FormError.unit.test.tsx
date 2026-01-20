import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FormError } from '../FormError'

describe('FormError', () => {
  it('should render error message when error is provided', () => {
    render(<FormError error="This is an error message" />)

    const errorMessage = screen.getByRole('alert')
    expect(errorMessage).toBeDefined()
    expect(errorMessage.textContent).toBe('This is an error message')
  })

  it('should not render when error is null', () => {
    const { container } = render(<FormError error={null} />)

    const errorMessage = container.querySelector('[role="alert"]')
    expect(errorMessage).toBeNull()
  })

  it('should not render when error is undefined', () => {
    const { container } = render(<FormError />)

    const errorMessage = container.querySelector('[role="alert"]')
    expect(errorMessage).toBeNull()
  })

  it('should not render when error is empty string', () => {
    const { container } = render(<FormError error="" />)

    const errorMessage = container.querySelector('[role="alert"]')
    expect(errorMessage).toBeNull()
  })

  it('should have proper accessibility attributes', () => {
    render(<FormError error="Error message" />)

    const errorMessage = screen.getByRole('alert')
    expect(errorMessage.getAttribute('aria-live')).toBe('polite')
  })

  it('should have animation classes', () => {
    render(<FormError error="Error message" />)

    const errorMessage = screen.getByRole('alert')
    expect(errorMessage.className).toContain('animate-in')
    expect(errorMessage.className).toContain('fade-in')
    expect(errorMessage.className).toContain('slide-in-from-top-1')
  })

  it('should have proper styling classes', () => {
    render(<FormError error="Error message" />)

    const errorMessage = screen.getByRole('alert')
    expect(errorMessage.className).toContain('text-sm')
    expect(errorMessage.className).toContain('text-destructive')
    expect(errorMessage.className).toContain('ml-1')
  })

  it('should apply custom className', () => {
    render(<FormError error="Error message" className="custom-class" />)

    const errorMessage = screen.getByRole('alert')
    expect(errorMessage.className).toContain('custom-class')
  })

  it('should merge custom className with default classes', () => {
    render(<FormError error="Error message" className="custom-class" />)

    const errorMessage = screen.getByRole('alert')
    expect(errorMessage.className).toContain('custom-class')
    expect(errorMessage.className).toContain('text-sm')
    expect(errorMessage.className).toContain('text-destructive')
  })
})
