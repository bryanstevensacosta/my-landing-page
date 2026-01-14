import { getRequestConfig } from 'next-intl/server'
import { locales, type Locale } from './config'

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale as Locale)) {
    console.log('[i18n] Invalid locale, falling back to es:', locale)
    locale = 'es'
  }

  console.log('[i18n] Loading messages for locale:', locale)
  const messages = (await import(`./locales/${locale}.json`)).default
  console.log('[i18n] Messages loaded, keys:', Object.keys(messages))

  return {
    locale,
    messages,
  }
})
