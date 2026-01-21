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
        "w-full max-w-md bg-surface-dark dark:bg-surface-dark border border-gray-800 rounded-2xl shadow-xl",
        "hover:border-[#4C02FB]/50 transition-all duration-300 relative overflow-hidden",
        "group-hover:-translate-y-1",
        isMobile ? "p-6" : "p-8"
      )}
    >
      {/* Background icon decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-10" aria-hidden="true">
        <Icon className="w-16 h-16" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className={cn(
          "font-bold text-white mb-1",
          isMobile ? "text-xl" : "text-2xl"
        )}>
          <span className="text-white mr-2">{step.number}.</span>
          {t(step.titleKey)}
        </h3>
        
        <p className={cn(
          "text-white/80 font-medium uppercase tracking-wider mb-4",
          isMobile ? "text-xs" : "text-sm"
        )}>
          {t(step.subtitleKey)}
        </p>

        <ul className={cn(
          "space-y-2 text-gray-400",
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
