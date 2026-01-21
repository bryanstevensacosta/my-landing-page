'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/shared/ui/button'
import { ArrowRight } from 'lucide-react'

export function WorkflowCTA() {
  const t = useTranslations('workflow.cta')

  const handleStartDiscovery = () => {
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      const isMobile = window.innerWidth < 768
      const headerOffset = isMobile ? 25 : 88
      const elementPosition = contactSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="py-20 px-6 relative z-10">
      <div 
        className="max-w-4xl mx-auto rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Metallic white gradient blurs */}
        <div 
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-30" 
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(76,2,251,0.2) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          aria-hidden="true"
        />
        <div 
          className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-30" 
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(224,93,114,0.2) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          aria-hidden="true"
        />

        {/* Top metallic shine */}
        <div 
          className="absolute top-0 left-1/4 right-1/4 h-px opacity-50"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">
          {t('title')}
        </h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto relative z-10">
          {t('description')}
        </p>
        <Button
          onClick={handleStartDiscovery}
          className="relative z-10 group bg-[#4C02FB] hover:bg-[#3D02C9] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-[#4C02FB]/25 flex items-center gap-2 mx-auto backdrop-blur-sm"
          style={{
            boxShadow: '0 4px 20px rgba(76,2,251,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        >
          {t('button')}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  )
}
