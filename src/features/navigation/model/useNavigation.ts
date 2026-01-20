import { useTranslations } from 'next-intl'

export function useNavigation() {
  const t = useTranslations('header')

  const items = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.stack'), href: '#stack' },
    { label: t('nav.journey'), href: '#career' },
  ]

  return {
    items,
    isScrolled: false,
    mobileMenuOpen: false,
  }
}
