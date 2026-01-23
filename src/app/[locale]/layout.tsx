import type React from 'react'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ViewTransitions } from 'next-view-transitions'
import {
  Noto_Sans,
  Space_Grotesk,
  Geist_Mono,
  Figtree,
  Cookie,
  Bricolage_Grotesque,
} from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { locales, type Locale } from '@/i18n/config'
import '../globals.css'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-figtree',
  display: 'swap',
})

const cookie = Cookie({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-cookie',
  display: 'swap',
})

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://devportfolio.com'

  return {
    title: t('title'),
    description: t('description'),
    generator: 'v0.app',
    icons: {
      icon: [
        {
          url: '/icon-light-32x32.png',
          media: '(prefers-color-scheme: light)',
        },
        {
          url: '/icon-dark-32x32.png',
          media: '(prefers-color-scheme: dark)',
        },
        {
          url: '/icon.svg',
          type: 'image/svg+xml',
        },
      ],
      apple: '/apple-icon.png',
    },
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
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <ViewTransitions>
      <html lang={locale} className="dark">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          />
          {/* Preload critical images */}
          <link
            rel="preload"
            as="image"
            href="/professional-developer-portrait-dark-background.webp"
            type="image/webp"
            fetchPriority="high"
          />
          <link
            rel="preload"
            as="image"
            href="/lamp-icon.svg"
            type="image/svg+xml"
          />
          <link
            rel="preload"
            as="image"
            href="/code-square-rounded.svg"
            type="image/svg+xml"
          />
        </head>
        <body
          className={`${notoSans.variable} ${spaceGrotesk.variable} ${geistMono.variable} ${figtree.variable} ${cookie.variable} ${bricolageGrotesque.variable} font-sans antialiased overflow-x-hidden`}
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  )
}
