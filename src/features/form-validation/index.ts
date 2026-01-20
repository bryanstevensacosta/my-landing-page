// Validation library
export {
  validateRequired,
  validateEmail,
  validateMinLength,
  validateMaxLength,
  validatePattern,
} from './lib/validators'

export {
  contactFormSchema,
  projectTypeOptions,
  type ValidationRule,
  type SelectOption,
} from './lib/validationRules'

// Validation hooks
export { useFieldValidation } from './model/useFieldValidation'
export { useFormValidation } from './model/useFormValidation'

// Validated components
export { ValidatedInput } from './ui/ValidatedInput'
export { ValidatedTextarea } from './ui/ValidatedTextarea'
export { ValidatedSelect } from './ui/ValidatedSelect'
