import createMiddleware from 'next-intl/middleware'
import { routing } from './src/i18n/routing'
import { locales, defaultLocale } from './src/i18n/config'

export default createMiddleware({
  ...routing,
  localeDetection: true,
  localePrefix: routing.localePrefix,
  defaultLocale,
  locales,
})

export const config = {
  matcher: ['/', '/(es|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
}
