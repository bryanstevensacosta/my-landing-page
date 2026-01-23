# Mejorar LCP (Largest Contentful Paint)

## Objetivo

LCP: 2.6s → <2.0s

## Estrategias

### 1. Preload Critical Resources

```typescript
// src/app/[locale]/layout.tsx
export default function Layout({ children }) {
  return (
    <html>
      <head>
        {/* Preload hero image (LCP element) */}
        <link
          rel="preload"
          href="/professional-developer-portrait-dark-background.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />

        {/* Preload critical font */}
        <link
          rel="preload"
          href="/fonts/MaterialSymbolsOutlined-subset.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### 2. Optimize LCP Image

```typescript
// src/widgets/hero/ui/Hero.tsx
<Image
  src="/professional-developer-portrait-dark-background.webp"
  alt="Developer"
  width={600}
  height={600}
  priority // Critical for LCP
  fetchPriority="high"
  quality={90}
  sizes="(max-width: 768px) 100vw, 600px"
/>
```

### 3. Inline Critical CSS

Next.js hace esto automáticamente, pero asegúrate de que Tailwind esté optimizado:

```javascript
// tailwind.config.js
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  // Purge unused CSS
}
```

**Impacto Total**: LCP -0.4s a -0.6s
