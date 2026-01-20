'use client'

import { Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from '@/shared/ui/button'
import { Avatar } from '@/shared/ui/avatar'
import { SocialLinks } from '@/features/social-share/ui/SocialLinks'
import RotatingText from '@/shared/ui/rotating-text'
import { useEffect, useState } from 'react'

export function Hero() {
  const t = useTranslations('hero')
  const rotatingWords = t.raw('rotatingWords') as string[]
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleExploreClick = () => {
    const projectsSection = document.querySelector('#projects')
    if (projectsSection) {
      // Responsive offset: mobile vs desktop (same as Header)
      const isMobile = window.innerWidth < 768
      const headerOffset = isMobile ? 25 : 88
      console.log('Explore Click - Mobile:', isMobile, 'Offset:', headerOffset) // Debug
      const elementPosition = projectsSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <main className="relative min-h-screen pt-32 sm:pt-32 md:pt-36 pb-12 md:pb-20 flex flex-col items-center overflow-x-hidden bg-transparent">
      {/* Blur backgrounds */}
      <div
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[800px] h-[60vh] max-h-[600px] rounded-full blur-[120px] md:blur-[160px] opacity-50 pointer-events-none"
        style={{ background: '#4E03F9', zIndex: 1 }}
      />
      <div
        className="absolute bottom-[40%] right-[-10%] w-[70vw] max-w-[500px] h-[50vh] max-h-[500px] rounded-full blur-[150px] md:blur-[200px] opacity-35 pointer-events-none"
        style={{ background: '#CC5183', zIndex: 1 }}
      />
      <div
        className="absolute top-[20%] left-[-10%] w-[60vw] max-w-[400px] h-[40vh] max-h-[400px] rounded-full blur-[80px] md:blur-[100px] opacity-35 pointer-events-none"
        style={{ background: '#4E03F9', zIndex: 1 }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '3rem 3rem',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, #000 60%, transparent 100%)',
          zIndex: 2,
        }}
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center w-full">
        <Avatar />

        <div className="text-center space-y-6 md:space-y-8 max-w-4xl mx-auto w-full">
          <div
            className="inline-flex items-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full border border-white/10 bg-white/5 text-xs sm:text-sm md:text-base tracking-[0.2em] font-figtree mt-4 sm:mt-6 md:mt-8"
            style={{ color: '#ffffffff', fontWeight: 800 }}
          >
            <Image
              src="/code-square-rounded.svg"
              alt="code"
              width={16}
              height={16}
              className="size-4 sm:size-5 md:size-6"
            />
            {t('badge')}
          </div>

          <h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight font-figtree leading-[1.1] text-white px-2 sm:px-0 w-full text-center"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}
          >
            <span className="block">
              {t('titleLine1')}{' '}
              <span
                className="font-cookie font-normal text-[1.5em] inline-flex items-center gap-2"
                style={{ color: '#DD5C74' }}
              >
                {t('titleLine1Italic')}
                <Image
                  src="/lamp-icon.svg"
                  alt="lamp"
                  width={40}
                  height={40}
                  className="inline-block w-12 h-12 sm:w-15 sm:h-15 md:w-18 md:h-18"
                  style={{
                    transform: 'rotate(15deg)',
                  }}
                />
              </span>
            </span>
            <span className="block">{t('titleLine2')}</span>
            <span className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-3">
              <span
                className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-xl"
                style={{
                  background: 'linear-gradient(90deg, #4800ffff, #E4606E)',
                }}
              >
                <RotatingText
                  texts={rotatingWords}
                  mainClassName="inline-flex"
                  elementLevelClassName="text-white"
                  splitBy={isMobile ? 'words' : 'characters'}
                  staggerDuration={isMobile ? 0 : 0.05}
                  staggerFrom="first"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={
                    isMobile
                      ? { duration: 0.3 }
                      : {
                          type: 'spring',
                          damping: 25,
                          stiffness: 300,
                        }
                  }
                  rotationInterval={3000}
                />
              </span>
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed text-pretty px-4 sm:px-0 w-full">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full justify-center pt-2 sm:pt-4 px-4 sm:px-0">
            <Button
              onClick={handleExploreClick}
              className="transform-gpu w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 rounded-2xl text-white font-bold transition-all duration-300 hover:-translate-y-1 active:scale-95 cursor-pointer"
              style={{
                background: '#4A2BFC',
                boxShadow: isMobile ? 'none' : '0 0 30px rgba(72, 0, 255, 0.4)',
              }}
              onMouseEnter={
                !isMobile
                  ? (e) =>
                      (e.currentTarget.style.boxShadow =
                        '0 0 45px rgba(72, 0, 255, 0.6)')
                  : undefined
              }
              onMouseLeave={
                !isMobile
                  ? (e) =>
                      (e.currentTarget.style.boxShadow =
                        '0 0 30px rgba(72, 0, 255, 0.4)')
                  : undefined
              }
            >
              {t('cta.explore')}{' '}
              <Image
                src="/folder-file.svg"
                alt="folder"
                width={64}
                height={64}
                className="ml-1 size-6"
              />
            </Button>
            <Button
              variant="outline"
              className="transform-gpu w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 rounded-2xl border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white font-bold transition-all duration-300 hover:-translate-y-1 active:scale-95"
            >
              {t('cta.contact')}
            </Button>
            <SocialLinks />
          </div>
        </div>
      </div>
    </main>
  )
}
