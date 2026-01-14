import { describe, it, expect } from 'vitest'
import { skills } from '../skills.data'
import esMessages from '@/i18n/locales/es.json'
import enMessages from '@/i18n/locales/en.json'

/**
 * Unit tests for skill translations
 * Requirements: 6.2
 *
 * These tests verify that all skills have complete translations in both
 * Spanish and English, and that the translation structure is consistent.
 */

describe('Skill Translations Unit Tests', () => {
  describe('Spanish translations', () => {
    it('should have all skill names in Spanish', () => {
      skills.forEach((skill) => {
        const nameParts = skill.name.split('.')
        const skillId = nameParts[2]
        const name =
          esMessages.skills.items[
            skillId as keyof typeof esMessages.skills.items
          ]

        expect(name).toBeDefined()
        expect(typeof name).toBe('string')
        expect(name.length).toBeGreaterThan(0)
      })
    })

    it('should have all skill categories in Spanish', () => {
      skills.forEach((skill) => {
        const categoryParts = skill.category.split('.')
        const categoryId = categoryParts[2]
        const category =
          esMessages.skills.categories[
            categoryId as keyof typeof esMessages.skills.categories
          ]

        expect(category).toBeDefined()
        expect(typeof category).toBe('string')
        expect(category.length).toBeGreaterThan(0)
      })
    })
  })

  describe('English translations', () => {
    it('should have all skill names in English', () => {
      skills.forEach((skill) => {
        const nameParts = skill.name.split('.')
        const skillId = nameParts[2]
        const name =
          enMessages.skills.items[
            skillId as keyof typeof enMessages.skills.items
          ]

        expect(name).toBeDefined()
        expect(typeof name).toBe('string')
        expect(name.length).toBeGreaterThan(0)
      })
    })

    it('should have all skill categories in English', () => {
      skills.forEach((skill) => {
        const categoryParts = skill.category.split('.')
        const categoryId = categoryParts[2]
        const category =
          enMessages.skills.categories[
            categoryId as keyof typeof enMessages.skills.categories
          ]

        expect(category).toBeDefined()
        expect(typeof category).toBe('string')
        expect(category.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Translation structure consistency', () => {
    it('should have consistent skill items across locales', () => {
      const esSkillKeys = Object.keys(esMessages.skills.items)
      const enSkillKeys = Object.keys(enMessages.skills.items)

      // Both locales should have the same skill keys
      expect(esSkillKeys.sort()).toEqual(enSkillKeys.sort())
    })

    it('should have consistent skill categories across locales', () => {
      const esCategoryKeys = Object.keys(esMessages.skills.categories)
      const enCategoryKeys = Object.keys(enMessages.skills.categories)

      // Both locales should have the same category keys
      expect(esCategoryKeys.sort()).toEqual(enCategoryKeys.sort())
    })

    it('should have all skill items referenced in skills data', () => {
      const skillIds = skills.map((s) => s.name.split('.')[2])
      const uniqueSkillIds = [...new Set(skillIds)]

      uniqueSkillIds.forEach((skillId) => {
        expect(esMessages.skills.items).toHaveProperty(skillId)
        expect(enMessages.skills.items).toHaveProperty(skillId)
      })
    })

    it('should have all categories referenced in skills data', () => {
      const categoryIds = skills.map((s) => s.category.split('.')[2])
      const uniqueCategoryIds = [...new Set(categoryIds)]

      uniqueCategoryIds.forEach((categoryId) => {
        expect(esMessages.skills.categories).toHaveProperty(categoryId)
        expect(enMessages.skills.categories).toHaveProperty(categoryId)
      })
    })
  })

  describe('Translation quality', () => {
    it('should have non-empty skill name translations', () => {
      skills.forEach((skill) => {
        const skillId = skill.name.split('.')[2]
        const esName =
          esMessages.skills.items[
            skillId as keyof typeof esMessages.skills.items
          ]
        const enName =
          enMessages.skills.items[
            skillId as keyof typeof enMessages.skills.items
          ]

        expect(esName.trim().length).toBeGreaterThan(0)
        expect(enName.trim().length).toBeGreaterThan(0)
      })
    })

    it('should have non-empty category translations', () => {
      const uniqueCategories = [
        ...new Set(skills.map((s) => s.category.split('.')[2])),
      ]

      uniqueCategories.forEach((categoryId) => {
        const esCategory =
          esMessages.skills.categories[
            categoryId as keyof typeof esMessages.skills.categories
          ]
        const enCategory =
          enMessages.skills.categories[
            categoryId as keyof typeof enMessages.skills.categories
          ]

        expect(esCategory.trim().length).toBeGreaterThan(0)
        expect(enCategory.trim().length).toBeGreaterThan(0)
      })
    })
  })

  describe('Skill data integrity', () => {
    it('should have valid skill names', () => {
      skills.forEach((skill) => {
        expect(skill.name).toBeDefined()
        expect(typeof skill.name).toBe('string')
        expect(skill.name).toMatch(/^skills\.items\.\w+$/)
      })
    })

    it('should have valid skill categories', () => {
      skills.forEach((skill) => {
        expect(skill.category).toBeDefined()
        expect(typeof skill.category).toBe('string')
        expect(skill.category).toMatch(/^skills\.categories\.\w+$/)
      })
    })

    it('should have valid icon identifiers', () => {
      skills.forEach((skill) => {
        expect(skill.icon).toBeDefined()
        expect(typeof skill.icon).toBe('string')
        expect(skill.icon.length).toBeGreaterThan(0)
      })
    })

    it('should have unique skill names', () => {
      const names = skills.map((s) => s.name)
      const uniqueNames = new Set(names)
      expect(uniqueNames.size).toBe(skills.length)
    })

    it('should have translation keys that follow the correct pattern', () => {
      skills.forEach((skill) => {
        // Name should be skills.items.{id}
        const nameParts = skill.name.split('.')
        expect(nameParts.length).toBe(3)
        expect(nameParts[0]).toBe('skills')
        expect(nameParts[1]).toBe('items')

        // Category should be skills.categories.{id}
        const categoryParts = skill.category.split('.')
        expect(categoryParts.length).toBe(3)
        expect(categoryParts[0]).toBe('skills')
        expect(categoryParts[1]).toBe('categories')
      })
    })
  })
})
