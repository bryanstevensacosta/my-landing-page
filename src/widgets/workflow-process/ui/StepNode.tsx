'use client'

import { WorkflowStep } from '@/entities/workflow-step'
import { getIconComponent } from '@/shared/lib'
import { cn } from '@/shared/lib'

interface StepNodeProps {
  step: WorkflowStep
  isFirst: boolean
}

export function StepNode({ step, isFirst }: StepNodeProps) {
  const Icon = getIconComponent(step.iconName)

  return (
    <div 
      className={cn(
        "absolute left-8 md:left-1/2 md:-translate-x-1/2",
        "flex items-center justify-center rounded-full",
        "shadow-lg z-20 transition-all duration-500",
        "w-12 h-12 md:w-16 md:h-16",
        "group-hover:scale-110",
        "border-4 border-white/20 group-hover:border-[#4C02FB] group-hover:shadow-[0_0_20px_rgba(76,2,251,0.4)]"
      )}
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      aria-label={`Step ${step.number}`}
    >
      {/* Metallic inner glow */}
      <div 
        className="absolute inset-0 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />
      
      <Icon className="w-5 h-5 md:w-6 md:h-6 text-white relative z-10" />
    </div>
  )
}
