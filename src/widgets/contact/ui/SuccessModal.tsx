'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { GlassPanel } from '@/shared/ui/glass-panel'
import { cn } from '@/shared/lib/cn'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  onExploreWork?: () => void
}

export function SuccessModal({
  isOpen,
  onClose,
  onExploreWork,
}: SuccessModalProps) {
  const t = useTranslations('contact.success')
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Focus trapping
  useEffect(() => {
    if (!isOpen) return

    // Store the currently focused element
    previousFocusRef.current = document.activeElement as HTMLElement

    // Focus the modal
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    if (focusableElements && focusableElements.length > 0) {
      ;(focusableElements[0] as HTMLElement).focus()
    }

    // Restore focus when modal closes
    return () => {
      previousFocusRef.current?.focus()
    }
  }, [isOpen])

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-300"
      >
        <GlassPanel glowColor="primary">
          <div className="flex flex-col items-center text-center">
            {/* Success Icon */}
            <div className="group relative mb-8">
              <div className="absolute inset-0 scale-110 rounded-full bg-primary/20 blur-2xl transition-all duration-500 group-hover:bg-primary/30"></div>
              <span
                className={cn(
                  'material-symbols-outlined relative z-10 select-none text-[100px] leading-none',
                  'bg-gradient-to-br from-[#00bbe0] to-violet-500 bg-clip-text text-transparent',
                  'drop-shadow-[0_0_15px_rgba(0,187,224,0.3)]'
                )}
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}
                aria-hidden="true"
              >
                check_circle
              </span>
            </div>

            {/* Title */}
            <h3
              id="success-modal-title"
              className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl"
            >
              {t('title')}
            </h3>

            {/* Message */}
            <p className="mb-10 text-lg leading-relaxed text-gray-400">
              {t('message')}
            </p>

            {/* CTA Button */}
            <button
              onClick={onExploreWork || onClose}
              className="group relative rounded-xl border border-white/10 bg-white/5 px-8 py-3 transition-all duration-300 hover:border-primary/30 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(0,187,224,0.15)]"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-300 transition-colors group-hover:text-white">
                  {t('cta')}
                </span>
                <span className="material-symbols-outlined text-lg text-gray-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary">
                  arrow_forward
                </span>
              </div>
            </button>
          </div>
        </GlassPanel>
      </div>
    </div>
  )
}
