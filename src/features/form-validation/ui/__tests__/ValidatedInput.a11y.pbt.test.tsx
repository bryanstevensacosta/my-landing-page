/**
 * Property-Based Tests for Accessibility
 * Feature: contact-section
 * Properties: 9, 10, 11, 12
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import fc from 'fast-check'
import { ValidatedInput } from '../ValidatedInput'
import userEvent from '@testing-library/user-event'

describe('Property 9: ARIA labels for all form fields', () => {
  it('should have proper ARIA label for any field configuration', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string({ minLength: 1, maxLength: 20 }),
          label: fc.string({ minLength: 1, maxLength: 50 }),
          required: fc.boolean(),
          type: fc.constantFrom('text', 'email'),
        }),
        (config) => {
          const { container } = render(
            <ValidatedInput
              name={config.name}
              label={config.label}
              type={config.type}
              required={config.required}
              value=""
              onChange={vi.fn()}
            />
          )

          const input = screen.getByRole('textbox')

          // Should have aria-label
          expect(input).toHaveAttribute('aria-label', config.label)

          // Should have aria-required if required
          if (config.required) {
            expect(input).toHaveAttribute('aria-required', 'true')
          }

          // Cleanup
          container.remove()
        }
      ),
      { numRuns: 100 }
    )
  })
})

describe('Property 10: Screen reader error announcements', () => {
  it('should have aria-invalid and aria-describedby when field has error', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          name: fc.string({ minLength: 1, maxLength: 20 }),
          label: fc.string({ minLength: 1, maxLength: 50 }),
          errorMessage: fc.string({ minLength: 1, maxLength: 100 }),
        }),
        async (config) => {
          const user = userEvent.setup()

          const { container } = render(
            <ValidatedInput
              name={config.name}
              label={config.label}
              value=""
              onChange={vi.fn()}
              validationRules={[
                {
                  type: 'required',
                  message: config.errorMessage,
                },
              ]}
            />
          )

          const input = screen.getByRole('textbox')

          // Initially should not have error state
          expect(input).toHaveAttribute('aria-invalid', 'false')
          expect(input).not.toHaveAttribute('aria-describedby')

          // Trigger validation by blur
          await user.click(input)
          await user.tab()

          // Should have error state
          expect(input).toHaveAttribute('aria-invalid', 'true')
          expect(input).toHaveAttribute(
            'aria-describedby',
            `${config.name}-error`
          )

          // Error message should be in the document
          expect(screen.getByText(config.errorMessage)).toBeInTheDocument()

          // Cleanup
          container.remove()
        }
      ),
      { numRuns: 50 }
    )
  })
})

describe('Property 12: Focus indicators on interactive elements', () => {
  it('should have visible focus styles for any input', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string({ minLength: 1, maxLength: 20 }),
          label: fc.string({ minLength: 1, maxLength: 50 }),
        }),
        (config) => {
          const { container } = render(
            <ValidatedInput
              name={config.name}
              label={config.label}
              value=""
              onChange={vi.fn()}
            />
          )

          const input = screen.getByRole('textbox')

          // Check that focus styles are defined in className
          const className = input.className
          expect(className).toContain('focus:')

          // Should be focusable
          expect(input).not.toHaveAttribute('tabindex', '-1')

          // Cleanup
          container.remove()
        }
      ),
      { numRuns: 100 }
    )
  })
})
