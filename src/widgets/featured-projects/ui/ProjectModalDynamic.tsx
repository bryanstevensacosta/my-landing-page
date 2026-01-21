'use client'

import dynamic from 'next/dynamic'
import type { Project } from '@/entities/project/types'

// Dynamic import del modal para reducir el bundle inicial
const ProjectModal = dynamic(
  () => import('./ProjectModal').then((mod) => ({ default: mod.ProjectModal })),
  {
    loading: () => null,
    ssr: false, // El modal no necesita SSR
  }
)

interface ProjectModalDynamicProps {
  project: Project
  isOpen: boolean
  onClose: () => void
}

export function ProjectModalDynamic({
  project,
  isOpen,
  onClose,
}: ProjectModalDynamicProps) {
  if (!isOpen) return null

  return <ProjectModal project={project} isOpen={isOpen} onClose={onClose} />
}
