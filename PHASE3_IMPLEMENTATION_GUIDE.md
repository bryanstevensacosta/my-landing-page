# Phase 3 Implementation Guide

## 🎯 Guía Completa de Implementación

Esta guía te llevará paso a paso para optimizar tu sitio y alcanzar Performance Score 85-90.

---

## Paso 1: Preparar Herramientas (5 minutos)

### Instalar herramientas de optimización:

```bash
# macOS con Homebrew
brew install gifsicle webp imagemagick pngquant

# Verificar instalación
gifsicle --version
cwebp -version
convert --version
pngquant --version

# Instalar fonttools para subset de fonts
pip3 install fonttools
# o
brew install fonttools
```

---

## Paso 2: Optimizar Assets (15 minutos)

### Ejecutar script de optimización:

```bash
# Dar permisos de ejecución
chmod +x scripts/optimize-assets.sh
chmod +x scripts/analyze-bundle.sh

# Ejecutar optimización
./scripts/optimize-assets.sh
```

Este script:

- ✅ Optimiza audio.gif (830KB → ~300KB)
- ✅ Optimiza devices.svg (2.9MB → ~150KB)
- ✅ Optimiza wallet-connect.svg (370KB → ~50KB)
- ✅ Convierte PNGs grandes a WebP
- ✅ Optimiza todos los SVGs
- ✅ Crea backup automático

---

## Paso 3: Crear Subset de Material Symbols (10 minutos)

### Reducir font de 100KB a ~20KB:

```bash
# Ejecutar script de subsetting
node scripts/subset-material-symbols.js
```

### Actualizar CSS para usar subset:

```typescript
// src/app/[locale]/layout.tsx o globals.css
// Reemplazar:
@font-face {
  font-family: 'Material Symbols Outlined';
  src: url('/fonts/MaterialSymbolsOutlined.woff2') format('woff2');
}

// Con:
@font-face {
  font-family: 'Material Symbols Outlined';
  src: url('/fonts/MaterialSymbolsOutlined-subset.woff2') format('woff2');
  font-display: swap;
}
```

---

## Paso 4: Actualizar Referencias de Assets (10 minutos)

### Buscar y reemplazar referencias a assets optimizados:

```bash
# Buscar usos de audio.gif
grep -r "audio.gif" src/

# Buscar usos de devices.svg
grep -r "devices.svg" src/

# Buscar usos de wallet-connect.svg
grep -r "wallet-connect.svg" src/
```

### Actualizar componentes:

```typescript
// Ejemplo: Avatar component
<Image
  src="/gif/audio.webp" // Cambiar de .gif a .webp
  alt="Avatar"
  width={200}
  height={200}
  loading="lazy"
/>

// Ejemplo: Devices illustration
<Image
  src="/device-logos/devices-optimized.png" // Cambiar de .svg a .png
  alt="Multiple devices"
  width={800}
  height={600}
  loading="lazy"
/>
```

---

## Paso 5: Optimizar RotatingText (20 minutos)

### Opción A: Simplificar animación (Rápido)

```typescript
// src/widgets/hero/ui/RotatingText.tsx
'use client'

import { useState, useEffect } from 'react'
import { m, LazyMotion, domAnimation } from 'framer-motion'

export function RotatingText({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Defer animation until after page load
    const timer = setTimeout(() => {
      setIsReady(true)
      const interval = setInterval(() => {
        setIndex(i => (i + 1) % texts.length)
      }, 3000)
      return () => clearInterval(interval)
    }, 1000)

    return () => clearTimeout(timer)
  }, [texts.length])

  if (!isReady) {
    return <span>{texts[0]}</span>
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.span
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {texts[index]}
      </m.span>
    </LazyMotion>
  )
}
```

### Opción B: CSS puro (Mejor performance)

```typescript
// src/widgets/hero/ui/RotatingText.tsx
'use client'

import { useState, useEffect } from 'react'
import styles from './RotatingText.module.css'

export function RotatingText({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % texts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [texts.length])

  return (
    <span className={styles.rotating} key={index}>
      {texts[index]}
    </span>
  )
}
```

```css
/* src/widgets/hero/ui/RotatingText.module.css */
.rotating {
  display: inline-block;
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Paso 6: Preload Critical Resources (5 minutos)

```typescript
// src/app/[locale]/layout.tsx
export default function Layout({ children, params: { locale } }) {
  return (
    <html lang={locale}>
      <head>
        {/* Preload LCP image */}
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

---

## Paso 7: Optimizar Hero Image (5 minutos)

```typescript
// src/widgets/hero/ui/Hero.tsx
<Image
  src="/professional-developer-portrait-dark-background.webp"
  alt="Developer Portrait"
  width={600}
  height={600}
  priority // Critical for LCP
  fetchPriority="high"
  quality={90}
  sizes="(max-width: 768px) 100vw, 600px"
  className="..."
/>
```

---

## Paso 8: Analizar Bundle (5 minutos)

```bash
# Analizar bundle size
./scripts/analyze-bundle.sh

# O manualmente:
ANALYZE=true pnpm build
```

Esto abrirá un reporte visual mostrando:

- Tamaño de cada chunk
- Dependencias más pesadas
- Oportunidades de optimización

---

## Paso 9: Build y Test (10 minutos)

```bash
# Build production
pnpm build

# Start production server
pnpm start

# En otra terminal, run Lighthouse
npx lighthouse http://localhost:3000 \
  --output=json \
  --output=html \
  --output-path=./lighthouse-phase3.report \
  --only-categories=performance \
  --preset=desktop
```

---

## Paso 10: Verificar Resultados

### Métricas esperadas después de optimizaciones:

| Métrica           | Antes   | Después   | Mejora |
| ----------------- | ------- | --------- | ------ |
| Performance Score | 73      | 80-85     | +7-12  |
| LCP               | 2.6s    | 1.8-2.0s  | -0.6s  |
| TBT               | 1,070ms | 400-600ms | -470ms |
| Speed Index       | 2.6s    | 2.0-2.2s  | -0.4s  |
| Bundle Size       | ~800KB  | ~500KB    | -300KB |
| Asset Size        | 6.3MB   | ~900KB    | -5.4MB |

---

## Troubleshooting

### Si audio.gif no se optimiza bien:

```bash
# Probar con diferentes configuraciones
gifsicle -O3 --colors 64 --lossy=80 public/gif/audio.gif -o public/gif/audio-opt.gif

# O convertir directamente a WebP
gif2webp -q 75 -m 6 public/gif/audio.gif -o public/gif/audio.webp
```

### Si devices.svg sigue siendo grande:

```bash
# Convertir a PNG optimizado
convert public/device-logos/devices.svg -resize 1200x900 -quality 90 temp.png
pngquant --quality=85-95 temp.png -o public/device-logos/devices-optimized.png
rm temp.png
```

### Si Material Symbols subset falla:

```bash
# Verificar que fonttools está instalado
pip3 install --upgrade fonttools

# O usar Homebrew
brew install fonttools
```

---

## Checklist Final

- [ ] Herramientas instaladas
- [ ] Assets optimizados (./scripts/optimize-assets.sh)
- [ ] Material Symbols subset creado
- [ ] Referencias actualizadas en componentes
- [ ] RotatingText optimizado
- [ ] Preload resources agregados
- [ ] Hero image optimizado
- [ ] Bundle analizado
- [ ] Build production exitoso
- [ ] Lighthouse score mejorado

---

## Próximos Pasos (Opcional)

Si quieres llegar a 90+ Performance Score:

1. **Implementar Service Worker** para caching
2. **Lazy load below-fold components** con dynamic imports
3. **Implement Web Workers** para cálculos pesados
4. **Self-host Google Fonts** (si usas)
5. **Implement Critical CSS** inline
6. **Add resource hints** (dns-prefetch, preconnect)

---

**Tiempo total estimado**: 1-2 horas  
**Impacto esperado**: +7-12 puntos en Performance Score
