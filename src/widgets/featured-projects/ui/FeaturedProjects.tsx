'use client'

import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { projects, getTechStackIcons } from '@/entities/project/lib'
import { ProjectModalDynamic } from './ProjectModalDynamic'

function ProjectCard({
  project,
  onClick,
  imagePosition = 'left',
}: {
  project: (typeof projects)[0]
  onClick: () => void
  imagePosition?: 'left' | 'right'
}) {
  const t = useTranslations()
  const tTech = useTranslations('techStack')
  const techIcons = project.techStackKeys
    ? getTechStackIcons(project.techStackKeys)
    : []

  // Clase consistente para el border-radius
  const borderRadiusClass = 'rounded-2xl'

  return (
    <div
      className={`group cursor-pointer flex flex-col ${
        imagePosition === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } bg-transparent ${borderRadiusClass} transition-all duration-300`}
      onClick={onClick}
    >
      {/* Image Container */}
      <div
        className={`relative w-full lg:w-1/2 flex-shrink-0 ${borderRadiusClass} overflow-hidden`}
        style={{ aspectRatio: '3/2' }}
      >
        <div className="absolute inset-0 -m-[1px]">
          <Image
            src={project.image || '/defi-dashboard-crypto-finance-dark-ui.png'}
            alt={t(project.titleKey as any)}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={90}
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3">
            <p className="text-white font-bold text-sm">View Project</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className={`w-full lg:w-1/2 p-6 space-y-4 flex flex-col justify-center ${
          imagePosition === 'right'
            ? 'lg:pl-8 lg:pr-4 lg:py-4'
            : 'lg:pr-8 lg:pl-4 lg:py-4'
        }`}
      >
        <h3 className="text-2xl lg:text-3xl font-bold font-display tracking-tight text-white">
          {t(project.titleKey as any)}
        </h3>
        <p className="text-gray-400 text-base lg:text-lg leading-relaxed">
          {t(project.descriptionKey as any)}
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          {techIcons.map((tech) => (
            <div
              key={tech.altKey}
              className="size-8 hover:scale-110 transition-transform"
            >
              <Image
                src={tech.logo}
                alt={tTech(tech.altKey as any)}
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function FeaturedProjects() {
  const t = useTranslations('projects')
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null)

  return (
    <>
      <section id="projects" className="py-16 px-6 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-purple/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-6 mb-16">
            <div className="space-y-4">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                style={{
                  borderWidth: '1px',
                  borderColor: '#4A2BFC',
                  backgroundColor: '#4A2BFC(74, 144, 226, 0.1)',
                  color: '#ffffffff',
                }}
              >
                <span
                  className="size-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: '#4A2BFC' }}
                />
                {t('badge')}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-balance">
                {t('title')}{' '}
                <span className="text-white">{t('titleHighlight')}</span>
              </h2>
              <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
                {t('description')}
              </p>
            </div>
          </div>

          {/* Layout alternado de proyectos */}
          <div className="space-y-16 lg:space-y-24">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
                imagePosition={index % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal - Lazy loaded */}
      <ProjectModalDynamic
        project={selectedProject || projects[0]}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
