import { useTranslations } from 'next-intl'
import { ServiceCard } from './ServiceCard'
import { useServices } from '../model'

export function Services() {
  const t = useTranslations('services')
  const services = useServices()

  return (
    <section id="services" className="relative py-16 px-4 sm:px-6">
      {/* Background grid pattern */}
      <div className="absolute inset-0 pointer-events-none bg-grid-pattern h-[600px]" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <h5
              className="font-bold tracking-widest text-xs uppercase mb-3 ml-1"
              style={{ color: '#00E68B' }}
            >
              {t('label')}
            </h5>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight tracking-tight">
              {t('title')}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed md:border-l md:border-border md:pl-4">
            {t('subtitle')}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[minmax(180px,auto)]">
          {/* Gradient orbs between cards */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Top-left gradient */}
            <div
              className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-20"
              style={{
                background:
                  'radial-gradient(circle, #29C840 0%, transparent 70%)',
                top: '10%',
                left: '15%',
              }}
            />

            {/* Center gradient */}
            <div
              className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-15"
              style={{
                background:
                  'radial-gradient(circle, #29C840 0%, transparent 70%)',
                top: '40%',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />

            {/* Bottom-right gradient */}
            <div
              className="absolute w-[350px] h-[350px] rounded-full blur-[90px] opacity-20"
              style={{
                background:
                  'radial-gradient(circle, #29C840 0%, transparent 70%)',
                bottom: '5%',
                right: '10%',
              }}
            />

            {/* Subtle connecting gradients */}
            <div
              className="absolute w-[250px] h-[250px] rounded-full blur-[70px] opacity-10"
              style={{
                background:
                  'radial-gradient(circle, #29C840 0%, transparent 70%)',
                top: '60%',
                left: '25%',
              }}
            />

            <div
              className="absolute w-[200px] h-[200px] rounded-full blur-[60px] opacity-12"
              style={{
                background:
                  'radial-gradient(circle, #29C840 0%, transparent 70%)',
                top: '25%',
                right: '30%',
              }}
            />
          </div>

          {/* Custom Software - Columna izquierda, fila 1-2 en tablet */}
          <div className="md:col-span-1 md:row-span-2 lg:col-span-2 lg:row-span-2">
            <ServiceCard service={services[0]} />
          </div>

          {/* Legacy Migration - Columna derecha, fila 1-2 en tablet */}
          <div className="md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2">
            <ServiceCard service={services[1]} />
          </div>

          {/* Multi-Platform - Columna izquierda, fila 3-4 en tablet */}
          <div className="md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2">
            <ServiceCard service={services[2]} />
          </div>

          {/* AI Integration - Columna derecha superior, fila 3 en tablet */}
          <div className="md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1">
            <ServiceCard service={services[3]} />
          </div>

          {/* UX/UI Design - Columna derecha inferior, fila 4 en tablet */}
          <div className="md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1">
            <ServiceCard service={services[4]} />
          </div>

          {/* Landing Pages - Ocupa 2 columnas en tablet y desktop, fila 5 */}
          <div className="md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1">
            <ServiceCard service={services[5]} />
          </div>
        </div>
      </div>
    </section>
  )
}
