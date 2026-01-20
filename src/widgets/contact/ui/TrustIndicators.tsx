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
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
          <span className="size-2 animate-pulse rounded-full bg-primary"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
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
        <p className="max-w-md text-lg leading-relaxed text-gray-400">
          {t('description')}
        </p>
      </div>

      {/* Trust Items */}
      <div className="flex flex-col gap-5">
        {trustItems.map((item, index) => (
          <div key={index} className="group flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-gray-800/50 transition-colors group-hover:border-primary/30">
              <span className="material-symbols-outlined text-primary/80 group-hover:text-primary">
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

      {/* Client Logos */}
      <div className="border-t border-white/5 pt-8">
        <p className="mb-4 text-sm font-medium text-gray-500">
          {t('trustedBy')}
        </p>
        <div className="flex gap-6 opacity-50 grayscale transition-all duration-500 hover:grayscale-0">
          <div className="flex h-8 items-center text-xl font-bold tracking-tighter text-white">
            ACME <span className="text-primary">.ai</span>
          </div>
          <div className="flex h-8 items-center font-mono text-xl font-bold tracking-widest text-white">
            STACK
          </div>
          <div className="flex h-8 items-center text-xl font-bold italic text-white">
            Prism
          </div>
        </div>
      </div>
    </div>
  )
}
