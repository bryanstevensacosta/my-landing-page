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
      {/* Background grid pattern - Full visibility */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Black gradient overlays to hide grid in certain areas - z-[2] above grid */}
      <div className="absolute inset-0 pointer-events-none z-[2]" aria-hidden="true">
        {/* Top gradient overlay */}
        <div 
          className="absolute top-0 left-0 right-0 h-48"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, transparent 100%)',
          }}
        />
        
        {/* Bottom gradient overlay */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, transparent 100%)',
          }}
        />

        {/* Left side gradient overlay */}
        <div 
          className="absolute top-0 bottom-0 left-0 w-32"
          style={{
            background: 'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
          }}
        />

        {/* Right side gradient overlay */}
        <div 
          className="absolute top-0 bottom-0 right-0 w-32"
          style={{
            background: 'linear-gradient(270deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
          }}
        />

        {/* Diagonal gradient overlay - top left to center */}
        <div 
          className="absolute top-0 left-0 w-96 h-96"
          style={{
            background: 'radial-gradient(ellipse at top left, rgba(0,0,0,0.7) 0%, transparent 60%)',
          }}
        />

        {/* Diagonal gradient overlay - bottom right */}
        <div 
          className="absolute bottom-0 right-0 w-96 h-96"
          style={{
            background: 'radial-gradient(ellipse at bottom right, rgba(0,0,0,0.7) 0%, transparent 60%)',
          }}
        />

        {/* Additional layer - top right corner */}
        <div 
          className="absolute top-0 right-0 w-80 h-80"
          style={{
            background: 'radial-gradient(circle at top right, rgba(0,0,0,0.6) 0%, transparent 70%)',
          }}
        />

        {/* Additional layer - bottom left corner */}
        <div 
          className="absolute bottom-0 left-0 w-80 h-80"
          style={{
            background: 'radial-gradient(circle at bottom left, rgba(0,0,0,0.6) 0%, transparent 70%)',
          }}
        />

        {/* Middle left organic shape */}
        <div 
          className="absolute top-1/3 left-0 w-64 h-96"
          style={{
            background: 'radial-gradient(ellipse at left, rgba(0,0,0,0.5) 0%, transparent 65%)',
          }}
        />

        {/* Middle right organic shape */}
        <div 
          className="absolute top-1/2 right-0 w-72 h-80"
          style={{
            background: 'radial-gradient(ellipse at right, rgba(0,0,0,0.5) 0%, transparent 65%)',
          }}
        />

        {/* Upper middle scattered overlay */}
        <div 
          className="absolute top-20 left-1/4 w-56 h-56"
          style={{
            background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, transparent 70%)',
          }}
        />

        {/* Lower middle scattered overlay */}
        <div 
          className="absolute bottom-32 right-1/3 w-64 h-64"
          style={{
            background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, transparent 70%)',
          }}
        />

        {/* Center-left asymmetric overlay */}
        <div 
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-72"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 75%)',
            transform: 'rotate(-15deg)',
          }}
        />

        {/* Center-right asymmetric overlay */}
        <div 
          className="absolute top-1/3 right-1/4 w-52 h-80"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 75%)',
            transform: 'rotate(20deg)',
          }}
        />
      </div>

      {/* Abstract gradient shapes on top - z-[3] above everything */}
      <div className="absolute inset-0 pointer-events-none z-[3]" aria-hidden="true">
        {/* Purple-white gradient blob - top left */}
        <div 
          className="absolute top-16 left-12 w-72 h-72"
          style={{
            background: 'radial-gradient(circle, rgba(76,2,251,0.15) 0%, rgba(255,255,255,0.08) 30%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Pink-white gradient blob - top right */}
        <div 
          className="absolute top-32 right-20 w-80 h-64"
          style={{
            background: 'radial-gradient(ellipse, rgba(224,93,114,0.12) 0%, rgba(255,255,255,0.06) 35%, transparent 70%)',
            filter: 'blur(45px)',
            transform: 'rotate(-25deg)',
          }}
        />

        {/* White-purple gradient blob - center left */}
        <div 
          className="absolute top-1/3 left-1/4 w-64 h-96"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, rgba(76,2,251,0.08) 40%, transparent 75%)',
            filter: 'blur(50px)',
            transform: 'rotate(15deg)',
          }}
        />

        {/* Purple gradient blob - center */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-80"
          style={{
            background: 'radial-gradient(circle, rgba(76,2,251,0.1) 0%, rgba(255,255,255,0.05) 45%, transparent 80%)',
            filter: 'blur(55px)',
          }}
        />

        {/* Pink-white gradient blob - center right */}
        <div 
          className="absolute top-2/3 right-1/4 w-72 h-88"
          style={{
            background: 'radial-gradient(ellipse, rgba(224,93,114,0.1) 0%, rgba(255,255,255,0.07) 38%, transparent 72%)',
            filter: 'blur(48px)',
            transform: 'rotate(30deg)',
          }}
        />

        {/* White gradient blob - bottom left */}
        <div 
          className="absolute bottom-24 left-16 w-80 h-72"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(76,2,251,0.06) 42%, transparent 75%)',
            filter: 'blur(52px)',
          }}
        />

        {/* Purple-pink gradient blob - bottom center */}
        <div 
          className="absolute bottom-16 left-1/3 w-88 h-64"
          style={{
            background: 'radial-gradient(ellipse, rgba(76,2,251,0.08) 0%, rgba(224,93,114,0.08) 35%, transparent 70%)',
            filter: 'blur(46px)',
            transform: 'rotate(-18deg)',
          }}
        />

        {/* White-pink gradient blob - bottom right */}
        <div 
          className="absolute bottom-32 right-12 w-76 h-76"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.09) 0%, rgba(224,93,114,0.1) 40%, transparent 78%)',
            filter: 'blur(44px)',
          }}
        />

        {/* Small accent blob - upper center */}
        <div 
          className="absolute top-24 left-1/2 -translate-x-1/2 w-56 h-56"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(76,2,251,0.1) 30%, transparent 65%)',
            filter: 'blur(35px)',
          }}
        />

        {/* Small accent blob - middle left */}
        <div 
          className="absolute top-1/2 left-8 w-48 h-64"
          style={{
            background: 'radial-gradient(ellipse, rgba(224,93,114,0.14) 0%, transparent 68%)',
            filter: 'blur(38px)',
            transform: 'rotate(45deg)',
          }}
        />
      </div>

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
