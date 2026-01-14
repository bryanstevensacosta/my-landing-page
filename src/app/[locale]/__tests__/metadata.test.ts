import { describe, it, expect } from 'vitest'
import esTranslations from '@/i18n/locales/es.json'
import enTranslations from '@/i18n/locales/en.json'

describe('Metadata Translations', () => {
  it('should have metadata translations in Spanish', () => {
    expect(esTranslations.metadata).toBeDefined()
    expect(esTranslations.metadata.title).toBe('Desarrollador de Software')
    expect(esTranslations.metadata.description).toBe(
      'Software Developer especialista en arquitecturas escalables, IA y desarrollo Full-Stack'
    )
  })

  it('should have metadata translations in English', () => {
    expect(enTranslations.metadata).toBeDefined()
    expect(enTranslations.metadata.title).toBe('Software Developer')
    expect(enTranslations.metadata.description).toBe(
      'Software Developer specializing in scalable architectures, AI, and Full-Stack development'
    )
  })

  it('should have Open Graph metadata in Spanish', () => {
    expect(esTranslations.metadata.openGraph).toBeDefined()
    expect(esTranslations.metadata.openGraph.title).toBe(
      'Desarrollador de Software'
    )
    expect(esTranslations.metadata.openGraph.description).toBe(
      'Software Developer especialista en arquitecturas escalables, IA y desarrollo Full-Stack'
    )
    expect(esTranslations.metadata.openGraph.siteName).toBe('DevPortfolio')
  })

  it('should have Open Graph metadata in English', () => {
    expect(enTranslations.metadata.openGraph).toBeDefined()
    expect(enTranslations.metadata.openGraph.title).toBe('Software Developer')
    expect(enTranslations.metadata.openGraph.description).toBe(
      'Software Developer specializing in scalable architectures, AI, and Full-Stack development'
    )
    expect(enTranslations.metadata.openGraph.siteName).toBe('Bryan S. Nunez A.')
  })

  it('should have metadata translations for all supported locales', () => {
    const translations = [esTranslations, enTranslations]

    translations.forEach((t) => {
      expect(t.metadata).toBeDefined()
      expect(t.metadata.title).toBeTruthy()
      expect(t.metadata.description).toBeTruthy()
      expect(t.metadata.openGraph).toBeDefined()
      expect(t.metadata.openGraph.title).toBeTruthy()
      expect(t.metadata.openGraph.description).toBeTruthy()
      expect(t.metadata.openGraph.siteName).toBeTruthy()
    })
  })
})
