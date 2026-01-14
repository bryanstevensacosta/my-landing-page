'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { locales, localeNames, localeFlags } from '@/i18n/config'
import type { Locale } from '@/i18n/config'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLocaleChange = (newLocale: Locale) => {
    // Use '/' as the pathname to ensure we're always at the root
    // The router will handle adding the locale prefix
    router.replace('/', { locale: newLocale })
  }

  return (
    <div className="flex items-center gap-2">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            locale === loc
              ? 'bg-primary text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
          }`}
          aria-label={`Switch to ${localeNames[loc]}`}
          aria-current={locale === loc ? 'true' : 'false'}
        >
          <span className="mr-1.5">{localeFlags[loc]}</span>
          {localeNames[loc]}
        </button>
      ))}
    </div>
  )
}
