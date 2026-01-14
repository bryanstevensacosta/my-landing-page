import { describe, it, expect } from 'vitest'
import { projects } from '../projects.data'
import esMessages from '@/i18n/locales/es.json'
import enMessages from '@/i18n/locales/en.json'

/**
 * Unit tests for project translations
 * Requirements: 6.1, 6.5
 *
 * These tests verify that all projects have complete translations in both
 * Spanish and English, and that the translation structure is consistent.
 */

describe('Project Translations Unit Tests', () => {
  describe('Spanish translations', () => {
    it('should have all project titles in Spanish', () => {
      projects.forEach((project) => {
        const titleParts = project.titleKey.split('.')
        const projectId = titleParts[2]
        const title =
          esMessages.projects.items[
            projectId as keyof typeof esMessages.projects.items
          ].title

        expect(title).toBeDefined()
        expect(typeof title).toBe('string')
        expect(title.length).toBeGreaterThan(0)
      })
    })

    it('should have all project descriptions in Spanish', () => {
      projects.forEach((project) => {
        const descParts = project.descriptionKey.split('.')
        const projectId = descParts[2]
        const description =
          esMessages.projects.items[
            projectId as keyof typeof esMessages.projects.items
          ].description

        expect(description).toBeDefined()
        expect(typeof description).toBe('string')
        expect(description.length).toBeGreaterThan(0)
      })
    })

    it('should have category translations for projects with categories', () => {
      const projectsWithCategories = projects.filter((p) => p.categoryKey)

      projectsWithCategories.forEach((project) => {
        const categoryParts = project.categoryKey!.split('.')
        const projectId = categoryParts[2]
        const projectItem = esMessages.projects.items[
          projectId as keyof typeof esMessages.projects.items
        ] as any
        const category = projectItem.category

        expect(category).toBeDefined()
        expect(typeof category).toBe('string')
        expect(category.length).toBeGreaterThan(0)
      })
    })

    it('should have stat translations for projects with stats', () => {
      const projectsWithStats = projects.filter((p) => p.statKey)

      projectsWithStats.forEach((project) => {
        const statParts = project.statKey!.split('.')
        const projectId = statParts[2]
        const projectItem = esMessages.projects.items[
          projectId as keyof typeof esMessages.projects.items
        ] as any
        const stat = projectItem.stat

        expect(stat).toBeDefined()
        expect(typeof stat).toBe('string')
        expect(stat.length).toBeGreaterThan(0)
      })
    })
  })

  describe('English translations', () => {
    it('should have all project titles in English', () => {
      projects.forEach((project) => {
        const titleParts = project.titleKey.split('.')
        const projectId = titleParts[2]
        const title =
          enMessages.projects.items[
            projectId as keyof typeof enMessages.projects.items
          ].title

        expect(title).toBeDefined()
        expect(typeof title).toBe('string')
        expect(title.length).toBeGreaterThan(0)
      })
    })

    it('should have all project descriptions in English', () => {
      projects.forEach((project) => {
        const descParts = project.descriptionKey.split('.')
        const projectId = descParts[2]
        const description =
          enMessages.projects.items[
            projectId as keyof typeof enMessages.projects.items
          ].description

        expect(description).toBeDefined()
        expect(typeof description).toBe('string')
        expect(description.length).toBeGreaterThan(0)
      })
    })

    it('should have category translations for projects with categories', () => {
      const projectsWithCategories = projects.filter((p) => p.categoryKey)

      projectsWithCategories.forEach((project) => {
        const categoryParts = project.categoryKey!.split('.')
        const projectId = categoryParts[2]
        const projectItem = enMessages.projects.items[
          projectId as keyof typeof enMessages.projects.items
        ] as any
        const category = projectItem.category

        expect(category).toBeDefined()
        expect(typeof category).toBe('string')
        expect(category.length).toBeGreaterThan(0)
      })
    })

    it('should have stat translations for projects with stats', () => {
      const projectsWithStats = projects.filter((p) => p.statKey)

      projectsWithStats.forEach((project) => {
        const statParts = project.statKey!.split('.')
        const projectId = statParts[2]
        const projectItem = enMessages.projects.items[
          projectId as keyof typeof enMessages.projects.items
        ] as any
        const stat = projectItem.stat

        expect(stat).toBeDefined()
        expect(typeof stat).toBe('string')
        expect(stat.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Translation structure consistency', () => {
    it('should have consistent structure across locales', () => {
      const esProjectKeys = Object.keys(esMessages.projects.items)
      const enProjectKeys = Object.keys(enMessages.projects.items)

      // Both locales should have the same project keys
      expect(esProjectKeys.sort()).toEqual(enProjectKeys.sort())
    })

    it('should have matching fields for each project across locales', () => {
      const projectIds = projects.map((p) => p.titleKey.split('.')[2])

      projectIds.forEach((projectId) => {
        const esProject =
          esMessages.projects.items[
            projectId as keyof typeof esMessages.projects.items
          ]
        const enProject =
          enMessages.projects.items[
            projectId as keyof typeof enMessages.projects.items
          ]

        // Both should have the same keys
        const esKeys = Object.keys(esProject).sort()
        const enKeys = Object.keys(enProject).sort()
        expect(esKeys).toEqual(enKeys)
      })
    })

    it('should have all required fields for each project', () => {
      const requiredFields = ['title', 'description']

      projects.forEach((project) => {
        const projectId = project.titleKey.split('.')[2]
        const esProject =
          esMessages.projects.items[
            projectId as keyof typeof esMessages.projects.items
          ]
        const enProject =
          enMessages.projects.items[
            projectId as keyof typeof enMessages.projects.items
          ]

        requiredFields.forEach((field) => {
          expect(esProject).toHaveProperty(field)
          expect(enProject).toHaveProperty(field)
        })
      })
    })

    it('should have consistent optional fields across locales', () => {
      projects.forEach((project) => {
        const projectId = project.titleKey.split('.')[2]
        const esProject =
          esMessages.projects.items[
            projectId as keyof typeof esMessages.projects.items
          ]
        const enProject =
          enMessages.projects.items[
            projectId as keyof typeof enMessages.projects.items
          ]

        // If category exists in one locale, it should exist in both
        const hasCategoryInEs = 'category' in esProject
        const hasCategoryInEn = 'category' in enProject
        expect(hasCategoryInEs).toBe(hasCategoryInEn)

        // If stat exists in one locale, it should exist in both
        const hasStatInEs = 'stat' in esProject
        const hasStatInEn = 'stat' in enProject
        expect(hasStatInEs).toBe(hasStatInEn)
      })
    })
  })

  describe('Translation quality', () => {
    it('should have non-empty translations', () => {
      projects.forEach((project) => {
        const projectId = project.titleKey.split('.')[2]
        const esProject =
          esMessages.projects.items[
            projectId as keyof typeof esMessages.projects.items
          ]
        const enProject =
          enMessages.projects.items[
            projectId as keyof typeof enMessages.projects.items
          ]

        // Check Spanish translations are not empty
        expect(esProject.title.trim().length).toBeGreaterThan(0)
        expect(esProject.description.trim().length).toBeGreaterThan(0)

        // Check English translations are not empty
        expect(enProject.title.trim().length).toBeGreaterThan(0)
        expect(enProject.description.trim().length).toBeGreaterThan(0)
      })
    })

    it('should have meaningful descriptions (not just placeholders)', () => {
      projects.forEach((project) => {
        const projectId = project.titleKey.split('.')[2]
        const esProject =
          esMessages.projects.items[
            projectId as keyof typeof esMessages.projects.items
          ]
        const enProject =
          enMessages.projects.items[
            projectId as keyof typeof enMessages.projects.items
          ]

        // Descriptions should be reasonably long (more than just a few words)
        expect(esProject.description.length).toBeGreaterThan(20)
        expect(enProject.description.length).toBeGreaterThan(20)

        // Should not contain placeholder text
        expect(esProject.description.toLowerCase()).not.toContain('lorem ipsum')
        expect(enProject.description.toLowerCase()).not.toContain('lorem ipsum')
        expect(esProject.description.toLowerCase()).not.toContain('placeholder')
        expect(enProject.description.toLowerCase()).not.toContain('placeholder')
      })
    })

    it('should have different translations between Spanish and English', () => {
      projects.forEach((project) => {
        const projectId = project.titleKey.split('.')[2]
        const esProject =
          esMessages.projects.items[
            projectId as keyof typeof esMessages.projects.items
          ]
        const enProject =
          enMessages.projects.items[
            projectId as keyof typeof enMessages.projects.items
          ]

        // Descriptions should be different (actual translations, not copies)
        // We allow titles to be the same for technical terms
        expect(esProject.description).not.toBe(enProject.description)
      })
    })
  })

  describe('Project data integrity', () => {
    it('should have valid project IDs', () => {
      projects.forEach((project) => {
        expect(project.id).toBeDefined()
        expect(typeof project.id).toBe('number')
        expect(project.id).toBeGreaterThan(0)
      })
    })

    it('should have unique project IDs', () => {
      const ids = projects.map((p) => p.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(projects.length)
    })

    it('should have valid project types', () => {
      const validTypes = ['featured', 'small', 'icon', 'wide']
      projects.forEach((project) => {
        expect(validTypes).toContain(project.type)
      })
    })

    it('should have translation keys that match project structure', () => {
      projects.forEach((project) => {
        const titleId = project.titleKey.split('.')[2]
        const descId = project.descriptionKey.split('.')[2]

        // Title and description should reference the same project
        expect(titleId).toBe(descId)

        // Optional fields should also reference the same project
        if (project.categoryKey) {
          const categoryId = project.categoryKey.split('.')[2]
          expect(categoryId).toBe(titleId)
        }

        if (project.statKey) {
          const statId = project.statKey.split('.')[2]
          expect(statId).toBe(titleId)
        }
      })
    })
  })
})
