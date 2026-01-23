'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

export function Avatar() {
  const t = useTranslations('hero')

  return (
    <div className="relative group mb-10 animate-float">
      {/* Glow Effect */}
      <div
        className="absolute -inset-1.5 rounded-full opacity-60 blur-lg group-hover:opacity-100 transition duration-700"
        style={{
          background: 'linear-gradient(90deg, #E4606E, #E4606E)',
        }}
      />

      {/* Avatar Container with Glassmorphism */}
      <div
        className="relative w-36 h-36 md:w-44 md:h-44 rounded-full p-1.5"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          boxShadow:
            '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="w-full h-full rounded-full bg-cover bg-center overflow-hidden bg-surface shadow-2xl">
          <Image
            alt={t('avatarAlt')}
            className="w-full h-full object-cover"
            src="/professional-developer-portrait-dark-background.webp"
            width={176}
            height={176}
            priority
            quality={90}
            sizes="(max-width: 768px) 144px, 176px"
          />
        </div>
      </div>

      {/* Status Badge with Glassmorphism */}
      <div
        className="absolute bottom-2 right-2 rounded-full px-3 sm:px-4 py-1.5 flex items-center gap-2"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow:
            '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-green" />
        </span>
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider sm:tracking-widest text-white/90 whitespace-nowrap">
          Open To Work
        </span>
      </div>
    </div>
  )
}
