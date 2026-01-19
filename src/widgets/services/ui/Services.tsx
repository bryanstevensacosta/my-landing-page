import { useTranslations } from 'next-intl'
import { ServiceCard } from './ServiceCard'
import { useServices } from '../model'

export function Services() {
  const t = useTranslations('services')
  const services = useServices()

  return (
    <section className="relative py-16 px-4 sm:px-6">
      {/* Background grid pattern */}
      <div className="absolute inset-0 pointer-events-none bg-grid-pattern h-[600px]" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <h5 className="text-primary font-bold tracking-widest text-xs uppercase mb-3 ml-1">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[minmax(180px,auto)]">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
