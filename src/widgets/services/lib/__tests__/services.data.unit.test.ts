import { describe, it, expect } from 'vitest'
import { services } from '../services.data'

describe('Services Data', () => {
  it('should export services array correctly', () => {
    expect(services).toBeDefined()
    expect(Array.isArray(services)).toBe(true)
  })

  it('should have exactly 6 services defined', () => {
    expect(services).toHaveLength(6)
  })

  it('should have all service IDs unique', () => {
    const ids = services.map((s) => s.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('should have Custom Software configured as 2x2', () => {
    const customSoftware = services.find((s) => s.id === 'custom-software')
    expect(customSoftware).toBeDefined()
    expect(customSoftware?.colSpan).toBe(2)
    expect(customSoftware?.rowSpan).toBe(2)
    expect(customSoftware?.size).toBe('large')
  })

  it('should have Legacy Migration configured as 1x2', () => {
    const legacyMigration = services.find((s) => s.id === 'legacy-migration')
    expect(legacyMigration).toBeDefined()
    expect(legacyMigration?.colSpan).toBe(1)
    expect(legacyMigration?.rowSpan).toBe(2)
    expect(legacyMigration?.size).toBe('medium')
  })

  it('should have Multi-Platform configured as 1x2', () => {
    const multiPlatform = services.find((s) => s.id === 'multi-platform')
    expect(multiPlatform).toBeDefined()
    expect(multiPlatform?.colSpan).toBe(1)
    expect(multiPlatform?.rowSpan).toBe(2)
    expect(multiPlatform?.size).toBe('medium')
  })

  it('should have AI Integration configured as 1x1 with ai variant', () => {
    const aiIntegration = services.find((s) => s.id === 'ai-integration')
    expect(aiIntegration).toBeDefined()
    expect(aiIntegration?.colSpan).toBe(1)
    expect(aiIntegration?.rowSpan).toBe(1)
    expect(aiIntegration?.size).toBe('small')
    expect(aiIntegration?.variant).toBe('ai')
  })

  it('should have UX/UI Design configured as 1x1', () => {
    const uxUiDesign = services.find((s) => s.id === 'ux-ui-design')
    expect(uxUiDesign).toBeDefined()
    expect(uxUiDesign?.colSpan).toBe(1)
    expect(uxUiDesign?.rowSpan).toBe(1)
    expect(uxUiDesign?.size).toBe('small')
  })

  it('should have Landing Pages configured as 2x1', () => {
    const landingPages = services.find((s) => s.id === 'landing-pages')
    expect(landingPages).toBeDefined()
    expect(landingPages?.colSpan).toBe(2)
    expect(landingPages?.rowSpan).toBe(1)
    expect(landingPages?.size).toBe('small')
  })

  it('should have all required fields for each service', () => {
    services.forEach((service) => {
      expect(service.id).toBeDefined()
      expect(service.id).not.toBe('')
      expect(service.icon).toBeDefined()
      expect(service.icon).not.toBe('')
      expect(service.size).toBeDefined()
      expect(['small', 'medium', 'large']).toContain(service.size)
    })
  })
})
