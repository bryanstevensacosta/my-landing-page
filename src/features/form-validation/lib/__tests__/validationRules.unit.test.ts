import { describe, it, expect } from 'vitest'
import {
  contactFormSchema,
  projectTypeOptions,
  type ValidationRule,
} from '../validationRules'

describe('contactFormSchema', () => {
  it('should have validation rules for name field', () => {
    expect(contactFormSchema.name).toBeDefined()
    expect(Array.isArray(contactFormSchema.name)).toBe(true)
    expect(contactFormSchema.name.length).toBeGreaterThan(0)
  })

  it('should have required rule for name field', () => {
    const requiredRule = contactFormSchema.name.find(
      (rule) => rule.type === 'required'
    )
    expect(requiredRule).toBeDefined()
    expect(requiredRule?.message).toBe('validation.name.required')
  })

  it('should have validation rules for email field', () => {
    expect(contactFormSchema.email).toBeDefined()
    expect(Array.isArray(contactFormSchema.email)).toBe(true)
    expect(contactFormSchema.email.length).toBeGreaterThan(0)
  })

  it('should have required rule for email field', () => {
    const requiredRule = contactFormSchema.email.find(
      (rule) => rule.type === 'required'
    )
    expect(requiredRule).toBeDefined()
    expect(requiredRule?.message).toBe('validation.email.required')
  })

  it('should have email format rule for email field', () => {
    const emailRule = contactFormSchema.email.find(
      (rule) => rule.type === 'email'
    )
    expect(emailRule).toBeDefined()
    expect(emailRule?.message).toBe('validation.email.invalid')
  })

  it('should have validation rules for projectType field', () => {
    expect(contactFormSchema.projectType).toBeDefined()
    expect(Array.isArray(contactFormSchema.projectType)).toBe(true)
    expect(contactFormSchema.projectType.length).toBeGreaterThan(0)
  })

  it('should have required rule for projectType field', () => {
    const requiredRule = contactFormSchema.projectType.find(
      (rule) => rule.type === 'required'
    )
    expect(requiredRule).toBeDefined()
    expect(requiredRule?.message).toBe('validation.projectType.required')
  })

  it('should have validation rules for message field', () => {
    expect(contactFormSchema.message).toBeDefined()
    expect(Array.isArray(contactFormSchema.message)).toBe(true)
    expect(contactFormSchema.message.length).toBeGreaterThan(0)
  })

  it('should have required rule for message field', () => {
    const requiredRule = contactFormSchema.message.find(
      (rule) => rule.type === 'required'
    )
    expect(requiredRule).toBeDefined()
    expect(requiredRule?.message).toBe('validation.message.required')
  })

  it('should have minLength rule for message field', () => {
    const minLengthRule = contactFormSchema.message.find(
      (rule) => rule.type === 'minLength'
    )
    expect(minLengthRule).toBeDefined()
    expect(minLengthRule?.value).toBe(10)
    expect(minLengthRule?.message).toBe('validation.message.minLength')
  })

  it('should have all required fields defined', () => {
    const requiredFields = ['name', 'email', 'projectType', 'message']
    requiredFields.forEach((field) => {
      expect(contactFormSchema[field]).toBeDefined()
    })
  })
})

describe('projectTypeOptions', () => {
  it('should be an array', () => {
    expect(Array.isArray(projectTypeOptions)).toBe(true)
  })

  it('should have at least one option', () => {
    expect(projectTypeOptions.length).toBeGreaterThan(0)
  })

  it('should have MVP option', () => {
    const mvpOption = projectTypeOptions.find((opt) => opt.value === 'mvp')
    expect(mvpOption).toBeDefined()
    expect(mvpOption?.label).toBe('contact.projectType.mvp')
  })

  it('should have Scaling option', () => {
    const scalingOption = projectTypeOptions.find(
      (opt) => opt.value === 'scaling'
    )
    expect(scalingOption).toBeDefined()
    expect(scalingOption?.label).toBe('contact.projectType.scaling')
  })

  it('should have AI option', () => {
    const aiOption = projectTypeOptions.find((opt) => opt.value === 'ai')
    expect(aiOption).toBeDefined()
    expect(aiOption?.label).toBe('contact.projectType.ai')
  })

  it('should have Consultation option', () => {
    const consultationOption = projectTypeOptions.find(
      (opt) => opt.value === 'consultation'
    )
    expect(consultationOption).toBeDefined()
    expect(consultationOption?.label).toBe('contact.projectType.consultation')
  })

  it('should have all options with value and label properties', () => {
    projectTypeOptions.forEach((option) => {
      expect(option.value).toBeDefined()
      expect(typeof option.value).toBe('string')
      expect(option.label).toBeDefined()
      expect(typeof option.label).toBe('string')
    })
  })
})
