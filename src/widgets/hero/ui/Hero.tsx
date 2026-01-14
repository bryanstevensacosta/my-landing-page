'use client'

import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/shared/ui/button'
import { Avatar } from '@/shared/ui/avatar'
import { TechStackScroller } from './TechStackScroller'
import { StatsCards } from './StatsCards'
import { SocialLinks } from '@/features/social-share/ui/SocialLinks'
import RotatingText from '@/shared/ui/rotating-text'

export function Hero() {
  const t = useTranslations('hero')
  const rotatingWords = t.raw('rotatingWords') as string[]

  return (
    <main className="relative min-h-screen pt-32 sm:pt-32 md:pt-36 pb-16 md:pb-24 flex flex-col items-center overflow-x-hidden">
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[800px] h-[60vh] max-h-[600px] bg-primary/20 rounded-full blur-[120px] md:blur-[160px] -z-10 opacity-50" />
      <div className="absolute bottom-[10%] right-[-10%] w-[70vw] max-w-[500px] h-[50vh] max-h-[500px] bg-neon-purple/15 rounded-full blur-[100px] md:blur-[120px] -z-10" />
      <div className="absolute top-[20%] left-[-10%] w-[60vw] max-w-[400px] h-[40vh] max-h-[400px] bg-neon-green/10 rounded-full blur-[80px] md:blur-[100px] -z-10" />

      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '3rem 3rem',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, #000 60%, transparent 100%)',
        }}
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center w-full">
        <Avatar />

        <div className="text-center space-y-6 md:space-y-8 max-w-4xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-neon-blue">
            <Sparkles className="size-3 sm:size-3.5" /> {t('badge')}
          </div>

          <h1 className="text-7xl sm:text-7xl md:text-8xl lg:text-8xl font-bold tracking-tight font-display leading-[1.1] text-white px-4 sm:px-0 w-full flex flex-col items-center">
            <span>Turning ideas</span>
            <span>into software</span>
            <span className="flex items-center gap-2 sm:gap-3">
              for{' '}
              <span
                className="inline-block px-3 py-1 rounded-xl"
                style={{ background: 'linear-gradient(90deg, #4800ffff)' }}
              >
                <RotatingText
                  texts={rotatingWords}
                  mainClassName="inline-flex"
                  elementLevelClassName="text-white"
                  splitBy="words"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  rotationInterval={3000}
                />
              </span>
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed text-pretty px-4 sm:px-0 w-full">
            {t('description')}
          </p>

          <TechStackScroller />

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full justify-center pt-2 sm:pt-4 px-4 sm:px-0">
            <Button className="w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold transition-all shadow-[0_0_30px_rgba(37,37,244,0.4)] hover:shadow-[0_0_45px_rgba(37,37,244,0.6)] hover:-translate-y-1 active:scale-95">
              {t('cta.explore')} <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 rounded-2xl border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white font-bold transition-all hover:-translate-y-1 active:scale-95"
            >
              {t('cta.contact')}
            </Button>
            <SocialLinks />
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-widest pt-1 sm:pt-2">
            <CheckCircle2 className="text-neon-green size-3.5 sm:size-4" />
            <span>{t('guarantee')}</span>
          </div>

          <StatsCards />
        </div>
      </div>
    </main>
  )
}
