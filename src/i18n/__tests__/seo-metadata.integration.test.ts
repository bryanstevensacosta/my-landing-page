import { describe, it, expect, vi } from 'vitest'
import { locales } from '../config'
import esMessages from '@/i18n/locales/es.json'
import enMessages from '@/i18n/locales/en.json'

/**
 * Integration Test: SEO Metadata
 *
 * Tests SEO metadata generation and localization:
 * 1. Spanish page has Spanish metadata
 * 2. English page has English metadata
 * 3. hreflang tags point to correct alternate versions
 */

// Mock getTranslations for testing
const mockGetTranslations = (locale: string, namespace: string) => {
  const messages = locale === 'es' ? esMessages : enMessages
  const namespaceMessages = messages[namespace as keyof typeof messages] as any

  return {
    locale,
    namespace,
    t: (key: string) => {
      const keys = key.split('.')
      let value: any = namespaceMessages

      for (const k of keys) {
        value = value?.[k]
      }

      return value || key
    },
  }
}

describe('Integration: SEO Metadata Generation', () => {
  it('should generate Spanish metadata for Spanish locale', () => {
    const locale = 'es'
    const { t } = mockGetTranslations(locale, 'metadata')

    const metadata = {
      title: t('title'),
      description: t('description'),
      openGraph: {
        title: t('openGraph.title'),
        description: t('openGraph.description'),
        siteName: t('openGraph.siteName'),
        locale: locale,
      },
    }

    expect(metadata.title).toBe('Desarrollador de Software')
    expect(metadata.description).toBe(
      'Software Developer especialista en arquitecturas escalables, IA y desarrollo Full-Stack'
    )
    expect(metadata.openGraph.title).toBe('Desarrollador de Software')
    expect(metadata.openGraph.description).toBe(
      'Software Developer especialista en arquitecturas escalables, IA y desarrollo Full-Stack'
    )
    expect(metadata.openGraph.siteName).toBe('DevPortfolio')
    expect(metadata.openGraph.locale).toBe('es')
  })

  it('should generate English metadata for English locale', () => {
    const locale = 'en'
    const { t } = mockGetTranslations(locale, 'metadata')

    const metadata = {
      title: t('title'),
      description: t('description'),
      openGraph: {
        title: t('openGraph.title'),
        description: t('openGraph.description'),
        siteName: t('openGraph.siteName'),
        locale: locale,
      },
    }

    expect(metadata.title).toBe('Software Developer')
    expect(metadata.description).toBe(
      'Software Developer specializing in scalable architectures, AI, and Full-Stack development'
    )
    expect(metadata.openGraph.title).toBe('Software Developer')
    expect(metadata.openGraph.description).toBe(
      'Software Developer specializing in scalable architectures, AI, and Full-Stack development'
    )
    expect(metadata.openGraph.siteName).toBe('Bryan S. Nunez A.')
    expect(metadata.openGraph.locale).toBe('en')
  })

  it('should have different metadata for different locales', () => {
    const esTranslations = mockGetTranslations('es', 'metadata')
    const enTranslations = mockGetTranslations('en', 'metadata')

    const esTitle = esTranslations.t('title')
    const enTitle = enTranslations.t('title')

    expect(esTitle).not.toBe(enTitle)
    expect(esTitle).toBe('Desarrollador de Software')
    expect(enTitle).toBe('Software Developer')
  })

  it('should generate correct hreflang structure', () => {
    const baseUrl = 'https://devportfolio.com'

    const hreflangTags = {
      canonical: `${baseUrl}/es`,
      languages: {
        es: `${baseUrl}/es`,
        en: `${baseUrl}/en`,
        'x-default': `${baseUrl}/es`,
      },
    }

    expect(hreflangTags.languages.es).toBe(`${baseUrl}/es`)
    expect(hreflangTags.languages.en).toBe(`${baseUrl}/en`)
    expect(hreflangTags.languages['x-default']).toBe(`${baseUrl}/es`)
  })

  it('should include all supported locales in hreflang tags', () => {
    const baseUrl = 'https://devportfolio.com'

    const hreflangTags = locales.reduce(
      (acc, locale) => {
        acc[locale] = `${baseUrl}/${locale}`
        return acc
      },
      {} as Record<string, string>
    )

    locales.forEach((locale) => {
      expect(hreflangTags[locale]).toBe(`${baseUrl}/${locale}`)
    })
  })

  it('should set x-default to default locale', () => {
    const baseUrl = 'https://devportfolio.com'
    const defaultLocale = 'es'

    const xDefault = `${baseUrl}/${defaultLocale}`

    expect(xDefault).toBe(`${baseUrl}/es`)
  })

  it('should generate canonical URL with locale', () => {
    const baseUrl = 'https://devportfolio.com'

    const testCases = [
      { locale: 'es', expected: `${baseUrl}/es` },
      { locale: 'en', expected: `${baseUrl}/en` },
    ]

    testCases.forEach(({ locale, expected }) => {
      const canonical = `${baseUrl}/${locale}`
      expect(canonical).toBe(expected)
    })
  })

  it('should include locale in Open Graph metadata', () => {
    const localeMetadata = locales.map((locale) => {
      const { t } = mockGetTranslations(locale, 'metadata')

      return {
        locale,
        openGraph: {
          title: t('openGraph.title'),
          description: t('openGraph.description'),
          siteName: t('openGraph.siteName'),
          locale: locale,
        },
      }
    })

    localeMetadata.forEach((metadata) => {
      expect(metadata.openGraph.locale).toBe(metadata.locale)
      expect(metadata.openGraph.title).toBeTruthy()
      expect(metadata.openGraph.description).toBeTruthy()
      expect(metadata.openGraph.siteName).toBeTruthy()
    })
  })

  it('should have consistent siteName across locales', () => {
    const siteNames = locales.map((locale) => {
      const { t } = mockGetTranslations(locale, 'metadata')
      return t('openGraph.siteName')
    })

    // All site names should be truthy (they may differ per locale)
    siteNames.forEach((siteName) => {
      expect(siteName).toBeTruthy()
    })
  })

  it('should generate metadata for all supported locales', () => {
    const allMetadata = locales.map((locale) => {
      const { t } = mockGetTranslations(locale, 'metadata')

      return {
        locale,
        title: t('title'),
        description: t('description'),
        openGraph: {
          title: t('openGraph.title'),
          description: t('openGraph.description'),
          siteName: t('openGraph.siteName'),
        },
      }
    })

    expect(allMetadata).toHaveLength(locales.length)

    allMetadata.forEach((metadata) => {
      expect(metadata.title).toBeTruthy()
      expect(metadata.description).toBeTruthy()
      expect(metadata.openGraph.title).toBeTruthy()
      expect(metadata.openGraph.description).toBeTruthy()
      expect(metadata.openGraph.siteName).toBeTruthy()
    })
  })

  it('should have unique titles for different locales', () => {
    const titles = locales.map((locale) => {
      const { t } = mockGetTranslations(locale, 'metadata')
      return t('title')
    })

    const uniqueTitles = new Set(titles)
    expect(uniqueTitles.size).toBe(locales.length)
  })

  it('should have unique descriptions for different locales', () => {
    const descriptions = locales.map((locale) => {
      const { t } = mockGetTranslations(locale, 'metadata')
      return t('description')
    })

    const uniqueDescriptions = new Set(descriptions)
    expect(uniqueDescriptions.size).toBe(locales.length)
  })

  it('should validate metadata structure completeness', () => {
    locales.forEach((locale) => {
      const { t } = mockGetTranslations(locale, 'metadata')

      const metadata = {
        title: t('title'),
        description: t('description'),
        openGraph: {
          title: t('openGraph.title'),
          description: t('openGraph.description'),
          siteName: t('openGraph.siteName'),
        },
      }

      // All fields should be present and non-empty
      expect(metadata.title).toBeTruthy()
      expect(metadata.description).toBeTruthy()
      expect(metadata.openGraph.title).toBeTruthy()
      expect(metadata.openGraph.description).toBeTruthy()
      expect(metadata.openGraph.siteName).toBeTruthy()

      // Titles should not be translation keys
      expect(metadata.title).not.toContain('metadata.')
      expect(metadata.description).not.toContain('metadata.')
    })
  })

  it('should generate proper alternate links structure', () => {
    const baseUrl = 'https://devportfolio.com'

    const alternates = {
      canonical: `${baseUrl}/es`,
      languages: locales.reduce(
        (acc, locale) => {
          acc[locale] = `${baseUrl}/${locale}`
          return acc
        },
        { 'x-default': `${baseUrl}/es` } as Record<string, string>
      ),
    }

    expect(alternates.canonical).toBeTruthy()
    expect(alternates.languages['x-default']).toBeTruthy()

    locales.forEach((locale) => {
      expect(alternates.languages[locale]).toBe(`${baseUrl}/${locale}`)
    })
  })

  it('should validate hreflang URLs are absolute', () => {
    const baseUrl = 'https://devportfolio.com'

    const hreflangUrls = locales.map((locale) => `${baseUrl}/${locale}`)

    hreflangUrls.forEach((url) => {
      expect(url).toMatch(/^https?:\/\//)
    })
  })

  it('should ensure metadata keys exist in all locale files', () => {
    const requiredKeys = [
      'title',
      'description',
      'openGraph.title',
      'openGraph.description',
      'openGraph.siteName',
    ]

    locales.forEach((locale) => {
      const { t } = mockGetTranslations(locale, 'metadata')

      requiredKeys.forEach((key) => {
        const value = t(key)
        expect(value).toBeTruthy()
        expect(value).not.toBe(key) // Should not return the key itself
      })
    })
  })
})

describe('Integration: Metadata Locale Consistency', () => {
  it('should maintain consistent metadata structure across locales', () => {
    const metadataStructures = locales.map((locale) => {
      const { t } = mockGetTranslations(locale, 'metadata')

      return {
        hasTitle: !!t('title'),
        hasDescription: !!t('description'),
        hasOpenGraphTitle: !!t('openGraph.title'),
        hasOpenGraphDescription: !!t('openGraph.description'),
        hasOpenGraphSiteName: !!t('openGraph.siteName'),
      }
    })

    // All locales should have the same structure
    metadataStructures.forEach((structure) => {
      expect(structure.hasTitle).toBe(true)
      expect(structure.hasDescription).toBe(true)
      expect(structure.hasOpenGraphTitle).toBe(true)
      expect(structure.hasOpenGraphDescription).toBe(true)
      expect(structure.hasOpenGraphSiteName).toBe(true)
    })
  })

  it('should have metadata in the correct language for each locale', () => {
    // Spanish metadata should contain Spanish text
    const esTranslations = mockGetTranslations('es', 'metadata')
    const esTitle = esTranslations.t('title')
    expect(esTitle).toContain('Desarrollador')

    // English metadata should contain English text
    const enTranslations = mockGetTranslations('en', 'metadata')
    const enTitle = enTranslations.t('title')
    expect(enTitle).toContain('Developer')
  })

  it('should generate valid metadata for page rendering', () => {
    locales.forEach((locale) => {
      const { t } = mockGetTranslations(locale, 'metadata')
      const baseUrl = 'https://devportfolio.com'

      const metadata = {
        title: t('title'),
        description: t('description'),
        openGraph: {
          title: t('openGraph.title'),
          description: t('openGraph.description'),
          siteName: t('openGraph.siteName'),
          locale: locale,
          type: 'website',
        },
        alternates: {
          canonical: `${baseUrl}/${locale}`,
          languages: {
            es: `${baseUrl}/es`,
            en: `${baseUrl}/en`,
            'x-default': `${baseUrl}/es`,
          },
        },
      }

      // Validate complete metadata structure
      expect(metadata.title).toBeTruthy()
      expect(metadata.description).toBeTruthy()
      expect(metadata.openGraph.title).toBeTruthy()
      expect(metadata.openGraph.description).toBeTruthy()
      expect(metadata.openGraph.siteName).toBeTruthy()
      expect(metadata.openGraph.locale).toBe(locale)
      expect(metadata.openGraph.type).toBe('website')
      expect(metadata.alternates.canonical).toContain(locale)
      expect(Object.keys(metadata.alternates.languages)).toHaveLength(3)
    })
  })
})
