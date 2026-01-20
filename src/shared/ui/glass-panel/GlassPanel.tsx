import { cn } from '@/shared/lib/cn'

interface GlassPanelProps {
  children: React.ReactNode
  className?: string
  glowColor?: 'primary' | 'purple' | 'indigo'
}

export function GlassPanel({
  children,
  className,
  glowColor = 'primary',
}: GlassPanelProps) {
  const glowColors = {
    primary: 'bg-primary/10',
    purple: 'bg-purple-500/10',
    indigo: 'bg-indigo-900/60',
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Glow spot effect */}
      <div
        className={cn(
          'pointer-events-none absolute -right-32 -top-32 -z-10 size-64 rounded-full blur-[80px]',
          glowColors[glowColor]
        )}
      />

      {/* Glass panel */}
      <div
        className={cn(
          'glass-panel rounded-2xl p-8',
          'bg-[rgba(30,35,40,0.3)]',
          'backdrop-blur-[24px] backdrop-saturate-[140%]',
          'border border-white/8',
          'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]'
        )}
      >
        {children}
      </div>
    </div>
  )
}
