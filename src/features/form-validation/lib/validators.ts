/**
 * Pure validation functions for form fields
 * These functions return boolean values indicating whether the input is valid
 */

/**
 * Validates that a value is not empty
 * @param value - The value to validate
 * @returns true if the value is not empty, false otherwise
 */
export function validateRequired(value: string): boolean {
  if (value === null || value === undefined) return false
  if (typeof value !== 'string') return false
  return value.trim().length > 0
}

/**
 * Validates that a value matches a valid email format
 * @param value - The email address to validate
 * @returns true if the value is a valid email, false otherwise
 */
export function validateEmail(value: string): boolean {
  if (!value || typeof value !== 'string') return false

  // Basic email regex pattern
  // Checks for: characters@characters.domain
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value.trim())
}

/**
 * Validates that a value meets a minimum length requirement
 * @param value - The value to validate
 * @param minLength - The minimum required length
 * @returns true if the value meets the minimum length, false otherwise
 */
export function validateMinLength(value: string, minLength: number): boolean {
  if (!value || typeof value !== 'string') return false
  return value.trim().length >= minLength
}

/**
 * Validates that a value does not exceed a maximum length
 * @param value - The value to validate
 * @param maxLength - The maximum allowed length
 * @returns true if the value does not exceed the maximum length, false otherwise
 */
export function validateMaxLength(value: string, maxLength: number): boolean {
  if (!value || typeof value !== 'string') return false
  return value.trim().length <= maxLength
}

/**
 * Validates that a value matches a given regex pattern
 * @param value - The value to validate
 * @param pattern - The regex pattern to match against
 * @returns true if the value matches the pattern, false otherwise
 */
export function validatePattern(value: string, pattern: RegExp): boolean {
  if (!value || typeof value !== 'string') return false
  return pattern.test(value.trim())
}
