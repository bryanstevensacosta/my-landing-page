'use client'

import { useTranslations } from 'next-intl'
import { WorkflowTimeline } from './WorkflowTimeline'
import { WorkflowCTA } from './WorkflowCTA'

export function WorkflowProcess() {
  const t = useTranslations('workflow')

  return (
    <section 
      id="workflow" 
      className="relative py-16 md:py-24 px-4 sm:px-6 overflow-hidden"
      aria-labelledby="workflow-heading"
    >
      {/* Background grid pattern - Higher z-index and more visible */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.15] z-[1]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Abstract gradient shapes - Metallic white blurs - Lower z-index */}
      <div className="absolute inset-0 pointer-events-none z-[0]" aria-hidden="true">
        {/* Top left metallic blur */}
        <div 
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        
        {/* Top right abstract shape */}
        <div 
          className="absolute top-20 -right-32 w-80 h-80 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.3) 0%, rgba(200,200,255,0.1) 50%, transparent 70%)',
            filter: 'blur(70px)',
            transform: 'rotate(45deg)',
          }}
        />

        {/* Center floating orb */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(76,2,251,0.1) 30%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Bottom left shape */}
        <div 
          className="absolute -bottom-32 -left-20 w-72 h-72 opacity-15"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.35) 0%, rgba(224,93,114,0.1) 40%, transparent 70%)',
            filter: 'blur(65px)',
            borderRadius: '40% 60% 70% 30%',
          }}
        />

        {/* Bottom right metallic glow */}
        <div 
          className="absolute bottom-10 -right-40 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 50%, transparent 70%)',
            filter: 'blur(75px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 md:mb-20">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 backdrop-blur-sm text-white text-sm font-bold tracking-wide border border-white/10 shadow-lg">
            {t('badge')}
          </span>
          <h2 
            id="workflow-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
          >
            {t('title.part1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A2BFC] to-[#E05D72]">
              {t('title.highlight')}
            </span>{' '}
            {t('title.part2')}
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Timeline */}
        <WorkflowTimeline />

        {/* CTA Section */}
        <WorkflowCTA />
      </div>
    </section>
  )
}
