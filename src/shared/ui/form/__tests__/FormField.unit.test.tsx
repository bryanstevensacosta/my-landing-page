import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FormField } from '../FormField'

describe('FormField', () => {
  it('should render label correctly', () => {
    render(
      <FormField label="Test Label" name="test-field">
        <input type="text" />
      </FormField>
    )

    expect(screen.getByText('Test Label')).toBeDefined()
  })

  it('should render children correctly', () => {
    render(
      <FormField label="Test Label" name="test-field">
        <input type="text" data-testid="test-input" />
      </FormField>
    )

    expect(screen.getByTestId('test-input')).toBeDefined()
  })

  it('should show required indicator when required is true', () => {
    const { container } = render(
      <FormField label="Test Label" name="test-field" required>
        <input type="text" />
      </FormField>
    )

    const requiredIndicator = container.querySelector('.text-primary')
    expect(requiredIndicator).toBeDefined()
    expect(requiredIndicator?.textContent).toBe('*')
  })

  it('should not show required indicator when required is false', () => {
    const { container } = render(
      <FormField label="Test Label" name="test-field" required={false}>
        <input type="text" />
      </FormField>
    )

    const requiredIndicator = container.querySelector('.text-primary')
    expect(requiredIndicator).toBeNull()
  })

  it('should display error message when error is provided', () => {
    render(
      <FormField label="Test Label" name="test-field" error="This is an error">
        <input type="text" />
      </FormField>
    )

    const errorMessage = screen.getByRole('alert')
    expect(errorMessage).toBeDefined()
    expect(errorMessage.textContent).toBe('This is an error')
  })

  it('should not display error message when error is null', () => {
    render(
      <FormField label="Test Label" name="test-field" error={null}>
        <input type="text" />
      </FormField>
    )

    const errorMessage = screen.queryByRole('alert')
    expect(errorMessage).toBeNull()
  })

  it('should have proper accessibility attributes on error', () => {
    render(
      <FormField label="Test Label" name="test-field" error="Error message">
        <input type="text" />
      </FormField>
    )

    const errorMessage = screen.getByRole('alert')
    expect(errorMessage.getAttribute('aria-live')).toBe('polite')
  })

  it('should associate label with input via htmlFor', () => {
    render(
      <FormField label="Test Label" name="test-field">
        <input type="text" id="test-field" />
      </FormField>
    )

    const label = screen.getByText('Test Label').closest('label')
    // In the DOM, htmlFor becomes 'for'
    expect(label?.getAttribute('for')).toBe('test-field')
  })

  it('should apply custom className', () => {
    const { container } = render(
      <FormField label="Test Label" name="test-field" className="custom-class">
        <input type="text" />
      </FormField>
    )

    const wrapper = container.querySelector('.custom-class')
    expect(wrapper).toBeDefined()
  })

  it('should have proper spacing classes', () => {
    const { container } = render(
      <FormField label="Test Label" name="test-field">
        <input type="text" />
      </FormField>
    )

    const wrapper = container.querySelector('.space-y-2')
    expect(wrapper).toBeDefined()
  })
})
