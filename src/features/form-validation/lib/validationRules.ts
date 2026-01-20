/**
 * Validation rules schema for the contact form
 * Defines validation rules for each form field
 */

export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern'
  value?: any
  message: string // i18n key
}

/**
 * Contact form validation schema
 * Maps field names to their validation rules
 */
export const contactFormSchema: Record<string, ValidationRule[]> = {
  name: [
    {
      type: 'required',
      message: 'validation.name.required',
    },
  ],
  email: [
    {
      type: 'required',
      message: 'validation.email.required',
    },
    {
      type: 'email',
      message: 'validation.email.invalid',
    },
  ],
  projectType: [
    {
      type: 'required',
      message: 'validation.projectType.required',
    },
  ],
  message: [
    {
      type: 'required',
      message: 'validation.message.required',
    },
    {
      type: 'minLength',
      value: 10,
      message: 'validation.message.minLength',
    },
  ],
}

/**
 * Project type options for the select dropdown
 */
export interface SelectOption {
  value: string
  label: string // i18n key
}

export const projectTypeOptions: SelectOption[] = [
  {
    value: 'mvp',
    label: 'contact.projectType.mvp',
  },
  {
    value: 'scaling',
    label: 'contact.projectType.scaling',
  },
  {
    value: 'ai',
    label: 'contact.projectType.ai',
  },
  {
    value: 'consultation',
    label: 'contact.projectType.consultation',
  },
]
