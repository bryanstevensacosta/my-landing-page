'use client'

import { Suspense, lazy } from 'react'
import { useTranslations } from 'next-intl'
import { GlassPanel } from '@/shared/ui/glass-panel'
import {
  ValidatedInput,
  ValidatedTextarea,
  ValidatedSelect,
} from '@/features/form-validation/ui'
import { projectTypeOptions } from '@/features/form-validation/lib'
import { useContactForm } from '../model'
import { cn } from '@/shared/lib/cn'

// Lazy load SuccessModal for better performance
const SuccessModal = lazy(() =>
  import('./SuccessModal').then((mod) => ({ default: mod.SuccessModal }))
)

interface ContactFormProps {
  className?: string
}

export function ContactForm({ className }: ContactFormProps) {
  const t = useTranslations('contact.form')

  const {
    formData,
    validationState,
    isSubmitting,
    isSuccess,
    error,
    updateField,
    handleSubmit,
    resetForm,
  } = useContactForm()

  const isFormValid = validationState.isValid

  return (
    <>
      <GlassPanel glowColor="primary" className={cn('relative', className)}>
        {/* Ambient glow spots */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

        <form onSubmit={handleSubmit} className="relative space-y-6">
          {/* Form Title */}
          <div className="mb-8">
            <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">
              {t('title')}
            </h3>
            <p className="text-base text-gray-400">{t('subtitle')}</p>
          </div>

          {/* Name Field */}
          <ValidatedInput
            name="name"
            label={t('name.label')}
            placeholder={t('name.placeholder')}
            required
            icon="person"
            value={formData.name}
            onChange={(value) => updateField('name', value)}
            validationRules={[
              {
                type: 'required',
                message: 'validation.name.required',
              },
            ]}
          />

          {/* Email Field */}
          <ValidatedInput
            name="email"
            type="email"
            label={t('email.label')}
            placeholder={t('email.placeholder')}
            required
            icon="mail"
            value={formData.email}
            onChange={(value) => updateField('email', value)}
            validationRules={[
              {
                type: 'required',
                message: 'validation.email.required',
              },
              {
                type: 'email',
                message: 'validation.email.invalid',
              },
            ]}
          />

          {/* Company Field (Optional) */}
          <ValidatedInput
            name="company"
            label={t('company.label')}
            placeholder={t('company.placeholder')}
            icon="business"
            value={formData.company || ''}
            onChange={(value) => updateField('company', value)}
          />

          {/* Project Type Field */}
          <ValidatedSelect
            name="projectType"
            label={t('projectType.label')}
            placeholder={t('projectType.placeholder')}
            required
            options={projectTypeOptions}
            value={formData.projectType}
            onChange={(value) => updateField('projectType', value)}
            validationRules={[
              {
                type: 'required',
                message: 'validation.projectType.required',
              },
            ]}
          />

          {/* Message Field */}
          <ValidatedTextarea
            name="message"
            label={t('message.label')}
            placeholder={t('message.placeholder')}
            required
            rows={6}
            value={formData.message}
            onChange={(value) => updateField('message', value)}
            validationRules={[
              {
                type: 'required',
                message: 'validation.message.required',
              },
              {
                type: 'minLength',
                value: 10,
                message: 'validation.message.minLength',
              },
            ]}
          />

          {/* Error Message */}
          {error && (
            <div
              className="animate-in fade-in slide-in-from-top-2 rounded-lg border border-destructive/20 bg-destructive/10 p-4 duration-300"
              role="alert"
            >
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[20px] text-destructive">
                  error
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-destructive">
                    {t('error.title')}
                  </p>
                  <p className="mt-1 text-sm text-destructive/80">
                    {error.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={cn(
              'group relative w-full overflow-hidden rounded-xl px-8 py-4 font-medium transition-all duration-300',
              'bg-[#4A2BFC]',
              'hover:shadow-[0_0_30px_rgba(74,43,252,0.3)]',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none',
              'focus:outline-none focus:ring-2 focus:ring-[#4A2BFC] focus:ring-offset-2 focus:ring-offset-[#0a0b0d]',
              'cursor-pointer'
            )}
          >
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            <span className="relative flex items-center justify-center gap-2 text-base text-white">
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[20px]">
                    progress_activity
                  </span>
                  {t('submitting')}
                </>
              ) : (
                <>
                  {t('submit')}
                  <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:translate-x-1">
                    send
                  </span>
                </>
              )}
            </span>
          </button>
        </form>
      </GlassPanel>

      {/* Success Modal with Suspense boundary */}
      {isSuccess && (
        <Suspense fallback={null}>
          <SuccessModal
            isOpen={isSuccess}
            onClose={resetForm}
            onExploreWork={() => {
              resetForm()
              // Scroll to projects section
              document
                .getElementById('projects')
                ?.scrollIntoView({ behavior: 'smooth' })
            }}
          />
        </Suspense>
      )}
    </>
  )
}
