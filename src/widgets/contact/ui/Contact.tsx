'use client'

import { cn } from '@/shared/lib/cn'
import { TrustIndicators } from './TrustIndicators'
import { ContactForm } from './ContactForm'

interface ContactProps {
  className?: string
}

export function Contact({ className }: ContactProps) {
  return (
    <section
      id="contact"
      className={cn(
        'relative overflow-hidden py-20 md:py-32',
        'bg-gradient-to-b from-[#0a0b0d] via-[#0f1115] to-[#0a0b0d]',
        className
      )}
    >
      {/* Background noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient glow spots */}
      <div className="pointer-events-none absolute left-1/4 top-20 h-96 w-96 rounded-full bg-primary/5 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-violet-500/5 blur-[100px]" />

      <div className="container relative mx-auto px-6">
        {/* Two-column layout for desktop, single column for mobile */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Trust Indicators */}
          <div className="flex flex-col justify-center">
            <TrustIndicators />
          </div>

          {/* Right Column - Contact Form */}
          <div className="flex flex-col justify-center">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
