import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FormLabel } from '../FormLabel'

describe('FormLabel', () => {
  it('should render children correctly', () => {
    render(<FormLabel htmlFor="test-field">Test Label</FormLabel>)

    expect(screen.getByText('Test Label')).toBeDefined()
  })

  it('should have correct htmlFor attribute', () => {
    render(<FormLabel htmlFor="test-field">Test Label</FormLabel>)

    const label = screen.getByText('Test Label')
    // In the DOM, htmlFor becomes 'for'
    expect(label.getAttribute('for')).toBe('test-field')
  })

  it('should show required indicator when required is true', () => {
    const { container } = render(
      <FormLabel htmlFor="test-field" required>
        Test Label
      </FormLabel>
    )

    const requiredIndicator = container.querySelector('.text-primary')
    expect(requiredIndicator).toBeDefined()
    expect(requiredIndicator?.textContent).toBe('*')
  })

  it('should not show required indicator when required is false', () => {
    const { container } = render(
      <FormLabel htmlFor="test-field" required={false}>
        Test Label
      </FormLabel>
    )

    const requiredIndicator = container.querySelector('.text-primary')
    expect(requiredIndicator).toBeNull()
  })

  it('should apply default styling classes', () => {
    render(<FormLabel htmlFor="test-field">Test Label</FormLabel>)

    const label = screen.getByText('Test Label')
    expect(label.className).toContain('text-xs')
    expect(label.className).toContain('font-bold')
    expect(label.className).toContain('uppercase')
    expect(label.className).toContain('tracking-wider')
    expect(label.className).toContain('text-gray-400')
  })

  it('should apply custom className', () => {
    render(
      <FormLabel htmlFor="test-field" className="custom-class">
        Test Label
      </FormLabel>
    )

    const label = screen.getByText('Test Label')
    expect(label.className).toContain('custom-class')
  })

  it('should merge custom className with default classes', () => {
    render(
      <FormLabel htmlFor="test-field" className="custom-class">
        Test Label
      </FormLabel>
    )

    const label = screen.getByText('Test Label')
    expect(label.className).toContain('custom-class')
    expect(label.className).toContain('text-xs')
    expect(label.className).toContain('font-bold')
  })
})
