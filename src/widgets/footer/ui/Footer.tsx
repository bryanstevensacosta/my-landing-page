'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{t('copyright')}</p>
        <div className="flex gap-6">
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-white transition-colors"
          >
            {t('privacy')}
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-white transition-colors"
          >
            {t('terms')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
