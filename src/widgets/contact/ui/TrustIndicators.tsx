'use client'

import { useTranslations } from 'next-intl'
import { cn } from '@/shared/lib/cn'

interface TrustIndicatorsProps {
  className?: string
}

export function TrustIndicators({ className }: TrustIndicatorsProps) {
  const t = useTranslations('contact.trust')

  const trustItems = [
    {
      icon: 'schedule',
      title: t('response.title'),
      description: t('response.description'),
    },
    {
      icon: 'terminal',
      title: t('technical.title'),
      description: t('technical.description'),
    },
    {
      icon: 'lock',
      title: t('nda.title'),
      description: t('nda.description'),
    },
  ]

  return (
    <div className={cn('flex flex-col gap-10 pt-4', className)}>
      {/* Status Badge */}
      <div className="space-y-6">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#4A2BFC]/20 bg-[#4A2BFC]/10 px-3 py-1">
          <span className="size-2 animate-pulse rounded-full bg-[#4A2BFC]"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            {t('available')}
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white lg:text-6xl">
          {t('heading.line1')} <br />
          <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            {t('heading.line2')}
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-md text-xl leading-relaxed text-gray-400">
          {t('description')}
        </p>
      </div>

      {/* Trust Items */}
      <div className="flex flex-col gap-5">
        {trustItems.map((item, index) => (
          <div key={index} className="group flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-gray-800/50 transition-colors group-hover:border-primary/30">
              <span className="material-symbols-outlined text-white">
                {item.icon}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-8 space-y-4">
        {/* Get in Touch Title */}
        <h3 className="text-lg font-bold text-white">Get in Touch</h3>

        {/* Contact Cards */}
        <div className="flex flex-col gap-3">
          {/* Email Card */}
          <a
            href="mailto:bryanstevensacosta@gmail.com"
            className="group relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-4 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <span className="material-symbols-outlined text-xl text-white">
                  alternate_email
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Email Me
                </p>
                <p className="mt-0.5 text-sm font-medium text-white transition-colors group-hover:text-primary">
                  bryanstevensacosta@gmail.com
                </p>
              </div>
              <span className="material-symbols-outlined text-gray-500 transition-transform group-hover:translate-x-1 group-hover:text-primary">
                arrow_forward
              </span>
            </div>
          </a>

          {/* WhatsApp Card */}
          <a
            href="https://wa.me/18097982896"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-4 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <span className="material-symbols-outlined text-xl text-white">
                  chat
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  WhatsApp Me
                </p>
                <p className="mt-0.5 text-sm font-medium text-white transition-colors group-hover:text-primary">
                  +1 (809) 798 2896
                </p>
              </div>
              <span className="material-symbols-outlined text-gray-500 transition-transform group-hover:translate-x-1 group-hover:text-primary">
                arrow_forward
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
