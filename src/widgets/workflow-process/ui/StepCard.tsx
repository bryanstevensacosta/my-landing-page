'use client'

import { useTranslations } from 'next-intl'
import { WorkflowStep } from '@/entities/workflow-step'
import { getIconComponent } from '@/shared/lib'
import { cn } from '@/shared/lib'
import { CheckCircle } from 'lucide-react'

interface StepCardProps {
  step: WorkflowStep
  isMobile?: boolean
}

export function StepCard({ step, isMobile = false }: StepCardProps) {
  const t = useTranslations()
  const Icon = getIconComponent(step.iconName)
  const activities = t.raw(step.activitiesKey) as string[]

  return (
    <div 
      className={cn(
        "w-full max-w-md relative overflow-hidden rounded-2xl",
        "hover:scale-[1.02] transition-all duration-500",
        "group-hover:-translate-y-1",
        isMobile ? "p-6" : "p-8"
      )}
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Metallic gradient overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(76,2,251,0.1) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Background icon decoration with metallic effect */}
      <div 
        className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500" 
        aria-hidden="true"
      >
        <Icon className="w-16 h-16 text-white" />
      </div>

      {/* Floating metallic orb */}
      <div 
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10">
        <h3 className={cn(
          "font-bold text-white mb-1",
          isMobile ? "text-xl" : "text-2xl"
        )}>
          <span className="text-white/90 mr-2">{step.number}.</span>
          {t(step.titleKey)}
        </h3>
        
        <p className={cn(
          "text-white/70 font-medium uppercase tracking-wider mb-4",
          isMobile ? "text-xs" : "text-sm"
        )}>
          {t(step.subtitleKey)}
        </p>

        <ul className={cn(
          "space-y-2 text-gray-300",
          isMobile ? "text-sm" : "text-base"
        )}>
          {activities.map((activity, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#4C02FB] mt-1 flex-shrink-0" />
              <span>{activity}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
