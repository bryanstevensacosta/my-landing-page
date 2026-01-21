'use client'

import { useTranslations } from 'next-intl'
import { WorkflowTimeline } from './WorkflowTimeline'
import { WorkflowCTA } from './WorkflowCTA'

export function WorkflowProcess() {
  const t = useTranslations('workflow')

  return (
    <section 
      id="workflow" 
      className="relative py-16 md:py-24 px-4 sm:px-6"
      aria-labelledby="workflow-heading"
    >
      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 md:mb-20">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide border border-primary/20">
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
