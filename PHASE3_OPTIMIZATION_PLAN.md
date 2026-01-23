# Phase 3 Optimization Plan - Advanced Performance

## 🎯 Objetivos

1. **Reducir TBT** de 1,070ms a < 300ms
2. **Mejorar LCP** de 2.6s a < 2.0s
3. **Optimizar Bundle Size** - Reducir JavaScript inicial
4. **Optimizar Assets** - GIFs, SVGs, Material Symbols
5. **Mejorar Speed Index** aún más

---

## 📊 Estado Actual (Phase 2)

| Métrica           | Valor Actual | Objetivo Phase 3 | Mejora Esperada |
| ----------------- | ------------ | ---------------- | --------------- |
| Performance Score | 73/100       | 85-90/100        | +12-17 puntos   |
| LCP               | 2.6s         | < 2.0s           | -0.6s (-23%)    |
| TBT               | 1,070ms      | < 300ms          | -770ms (-72%)   |
| Speed Index       | 2.6s         | < 2.0s           | -0.6s (-23%)    |
| FCP               | 1.9s         | < 1.5s           | -0.4s (-21%)    |

---

## 🚀 Estrategias de Optimización

### 1. Optimizar RotatingText Animation (Reducir TBT)

**Problema**: Framer Motion ejecuta animaciones JavaScript en el main thread

**Soluciones**:

#### Opción A: CSS Animations (Recomendado)

```typescript
// Reemplazar Framer Motion con CSS animations
// Beneficio: 0ms de JavaScript, animación en GPU
// Trade-off: Menos flexible que Framer Motion

// Implementación:
// 1. Crear @keyframes en CSS
// 2. Aplicar animation con CSS
// 3. Usar React state solo para cambiar texto
```

#### Opción B: Defer Animation Start

```typescript
// Diferir inicio de animación hasta después de LCP
useEffect(() => {
  // Esperar a que LCP ocurra
  if (typeof window !== 'undefined') {
    requestIdleCallback(() => {
      setAnimationReady(true)
    })
  }
}, [])
```

#### Opción C: Simplificar Animation

```typescript
// Cambiar de character-by-character a word-by-word
// Reducir staggerDuration de 0.05s a 0.02s
// Usar fade simple en lugar de spring animation
```

**Impacto Esperado**: TBT -400ms a -600ms

---

### 2. Optimizar Material Symbols (Reducir Bundle)

**Problema**: Material Symbols carga toda la fuente (100KB+)

**Soluciones**:

#### Opción A: Subset Font (Recomendado)

```bash
# Crear subset con solo los iconos usados
# Herramienta: glyphhanger o fonttools

# Iconos usados en el proyecto:
# - person, mail, business, send, expand_more
# - deployed_code, system_update_alt, psychology
# - design_services, conversion_path, analytics
# - speed, search, accessibility, language
# - devices, animation, security, hub
# - schedule, terminal, lock, alternate_email, chat

# Comando:
pyftsubset MaterialSymbolsOutlined.woff2 \
  --unicodes="U+E7FD,U+E0BE,U+E0AF,U+E163,U+E5CF" \
  --output-file="MaterialSymbolsOutlined-subset.woff2"
```

#### Opción B: Reemplazar con SVG Icons

```typescript
// Usar Lucide React icons en lugar de Material Symbols
// Beneficio: Tree-shakeable, solo importas lo que usas
// Trade-off: Cambiar diseño de iconos

import { User, Mail, Building, Send } from 'lucide-react'
```

#### Opción C: Lazy Load Font

```css
/* Cargar font solo cuando sea necesario */
@font-face {
  font-family: 'Material Symbols Outlined';
  src: url('/fonts/MaterialSymbolsOutlined.woff2') format('woff2');
  font-display: swap;
  font-weight: 100 700;
}
```

**Impacto Esperado**: Bundle -80KB a -100KB, FCP -0.2s

---

### 3. Optimizar GIF (Avatar Animation)

**Problema**: GIF es pesado y no optimizado

**Soluciones**:

#### Opción A: Optimizar GIF con gifsicle

```bash
# Reducir colores y optimizar frames
gifsicle -O3 --colors 128 input.gif -o output.gif

# Reducir tamaño de frames
gifsicle --resize 200x200 input.gif -o output.gif

# Combinar ambos
gifsicle -O3 --colors 64 --resize 200x200 \
  --lossy=80 input.gif -o output-optimized.gif
```

#### Opción B: Convertir a WebP Animado

```bash
# WebP animado es 30-50% más pequeño que GIF
gif2webp -q 80 input.gif -o output.webp

# Next.js Image component soporta WebP
<Image src="/avatar.webp" alt="Avatar" />
```

#### Opción C: Usar AVIF Animado (Mejor compresión)

```bash
# AVIF tiene mejor compresión que WebP
# Requiere ffmpeg con soporte AVIF
ffmpeg -i input.gif -c:v libaom-av1 -crf 30 output.avif
```

#### Opción D: Lazy Load Avatar Animation

```typescript
// Cargar GIF solo cuando esté en viewport
<Image
  src="/avatar.gif"
  alt="Avatar"
  loading="lazy"
  placeholder="blur"
  blurDataURL="/avatar-placeholder.jpg"
/>
```

**Impacto Esperado**: Asset size -50% a -70%, LCP -0.2s a -0.4s

---

### 4. Optimizar SVGs

**Problema**: SVGs no optimizados, contienen metadata innecesaria

**Soluciones**:

#### Opción A: SVGO (Recomendado)

```bash
# Instalar SVGO
pnpm add -D svgo

# Optimizar todos los SVGs
npx svgo -f public -r --config=svgo.config.js

# svgo.config.js
export default {
  multipass: true,
  plugins: [
    'preset-default',
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeEditorsNSData',
    'cleanupIds',
    'removeUselessDefs',
    'cleanupNumericValues',
    'convertColors',
    'removeUnknownsAndDefaults',
    'removeNonInheritableGroupAttrs',
    'removeUselessStrokeAndFill',
    'removeViewBox',
    'cleanupEnableBackground',
    'removeHiddenElems',
    'removeEmptyText',
    'convertShapeToPath',
    'convertEllipseToCircle',
    'moveElemsAttrsToGroup',
    'moveGroupAttrsToElems',
    'collapseGroups',
    'convertPathData',
    'convertTransform',
    'removeEmptyAttrs',
    'removeEmptyContainers',
    'mergePaths',
    'removeUnusedNS',
    'sortDefsChildren',
    'removeTitle',
    'removeDesc',
  ],
}
```

#### Opción B: Inline Critical SVGs

```typescript
// Para SVGs pequeños (<2KB), inline en JSX
// Beneficio: 0 HTTP requests, instant render
// Trade-off: Aumenta HTML size

export const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M..." />
  </svg>
)
```

#### Opción C: Sprite Sheet

```html
<!-- Crear sprite sheet para iconos repetidos -->
<svg style="display: none">
  <symbol id="icon-code" viewBox="0 0 24 24">
    <path d="..." />
  </symbol>
  <symbol id="icon-lamp" viewBox="0 0 24 24">
    <path d="..." />
  </symbol>
</svg>

<!-- Usar con <use> -->
<svg><use href="#icon-code" /></svg>
```

**Impacto Esperado**: Asset size -20% a -40%, LCP -0.1s

---

### 5. Tree-shake Framer Motion

**Problema**: Importamos toda la librería de Framer Motion

**Solución**:

```typescript
// ❌ ANTES: Importa todo
import { motion, AnimatePresence } from 'framer-motion'

// ✅ DESPUÉS: Importa solo lo necesario
import { m, LazyMotion, domAnimation } from 'framer-motion'

// Usar LazyMotion para cargar features on-demand
<LazyMotion features={domAnimation}>
  <m.div animate={{ opacity: 1 }}>
    {children}
  </m.div>
</LazyMotion>
```

**Impacto Esperado**: Bundle -30KB a -50KB

---

### 6. Preload Critical Resources

**Problema**: Recursos críticos no se precargan

**Solución**:

```typescript
// src/app/[locale]/layout.tsx
export default function Layout({ children }) {
  return (
    <html>
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/MaterialSymbolsOutlined-subset.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Preload critical images */}
        <link
          rel="preload"
          href="/professional-developer-portrait.webp"
          as="image"
          type="image/webp"
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**Impacto Esperado**: LCP -0.2s, FCP -0.1s

---

### 7. Optimize JavaScript Execution

**Problema**: Mucho JavaScript ejecutándose durante carga inicial

**Soluciones**:

#### A. Defer Non-Critical Scripts

```typescript
// Diferir analytics y scripts no críticos
useEffect(() => {
  if (typeof window !== 'undefined') {
    // Cargar después de que la página sea interactiva
    requestIdleCallback(() => {
      // Inicializar analytics
      // Cargar chat widgets
      // Cargar third-party scripts
    })
  }
}, [])
```

#### B. Use Web Workers

```typescript
// Mover cálculos pesados a Web Workers
// Ejemplo: Procesamiento de datos, validaciones complejas
const worker = new Worker('/workers/data-processor.js')
worker.postMessage(data)
worker.onmessage = (e) => {
  setProcessedData(e.data)
}
```

#### C. Code Splitting por Route

```typescript
// Ya implementado con dynamic imports
// Asegurar que cada route solo carga lo necesario
```

**Impacto Esperado**: TBT -200ms a -400ms

---

### 8. Optimize Images

**Problema**: Imágenes no están completamente optimizadas

**Soluciones**:

#### A. Usar Next.js Image con Blur Placeholder

```typescript
// Generar blur placeholder para mejor UX
import { getPlaiceholder } from 'plaiceholder'

// En build time
const { base64 } = await getPlaiceholder('/image.jpg')

// En component
<Image
  src="/image.jpg"
  placeholder="blur"
  blurDataURL={base64}
  priority // Para LCP images
/>
```

#### B. Responsive Images

```typescript
// Usar sizes para cargar imagen correcta
<Image
  src="/hero.jpg"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority
/>
```

#### C. Lazy Load Below-Fold Images

```typescript
// Imágenes below-fold con loading="lazy"
<Image
  src="/project.jpg"
  loading="lazy"
  placeholder="blur"
/>
```

**Impacto Esperado**: LCP -0.3s, Bundle -100KB

---

### 9. Reduce Third-Party Impact

**Problema**: Scripts de terceros bloquean el main thread

**Soluciones**:

#### A. Self-host Google Fonts

```bash
# Descargar fonts y servirlas localmente
# Herramienta: google-webfonts-helper
```

#### B. Defer Analytics

```typescript
// Cargar analytics después de interactividad
useEffect(() => {
  if (document.readyState === 'complete') {
    loadAnalytics()
  } else {
    window.addEventListener('load', loadAnalytics)
  }
}, [])
```

#### C. Use Facade Pattern

```typescript
// Para widgets pesados (chat, maps), mostrar placeholder
// Cargar widget real solo cuando usuario interactúa
```

**Impacto Esperado**: TBT -100ms a -200ms

---

### 10. Optimize CSS

**Problema**: CSS no usado en initial load

**Soluciones**:

#### A. Critical CSS Inline

```typescript
// Extraer CSS crítico e inline en <head>
// Herramienta: critters (ya incluido en Next.js)
```

#### B. Purge Unused CSS

```javascript
// Tailwind ya hace esto, pero verificar config
// tailwind.config.js
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  // Asegurar que purge está activo
}
```

#### C. Defer Non-Critical CSS

```html
<!-- Cargar CSS no crítico de forma asíncrona -->
<link
  rel="preload"
  href="/styles/non-critical.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
```

**Impacto Esperado**: FCP -0.1s, Bundle -20KB

---

## 📋 Implementation Checklist

### Priority 1: Quick Wins (1-2 días)

- [ ] Optimizar SVGs con SVGO
- [ ] Optimizar GIF con gifsicle o convertir a WebP
- [ ] Crear subset de Material Symbols font
- [ ] Preload critical resources
- [ ] Defer analytics y third-party scripts

### Priority 2: Medium Impact (2-3 días)

- [ ] Simplificar RotatingText animation
- [ ] Tree-shake Framer Motion con LazyMotion
- [ ] Optimize images con blur placeholders
- [ ] Implement responsive images
- [ ] Self-host Google Fonts

### Priority 3: Advanced (3-5 días)

- [ ] Reemplazar Framer Motion con CSS animations
- [ ] Implement Web Workers para cálculos pesados
- [ ] Create SVG sprite sheet
- [ ] Implement facade pattern para widgets
- [ ] Advanced code splitting

---

## 🎯 Expected Results

### After Priority 1 (Quick Wins)

| Métrica           | Actual  | Esperado | Mejora |
| ----------------- | ------- | -------- | ------ |
| Performance Score | 73      | 78-80    | +5-7   |
| LCP               | 2.6s    | 2.2s     | -0.4s  |
| TBT               | 1,070ms | 700ms    | -370ms |
| Bundle Size       | ~800KB  | ~650KB   | -150KB |

### After Priority 2 (Medium Impact)

| Métrica           | Actual  | Esperado | Mejora |
| ----------------- | ------- | -------- | ------ |
| Performance Score | 73      | 82-85    | +9-12  |
| LCP               | 2.6s    | 1.8s     | -0.8s  |
| TBT               | 1,070ms | 400ms    | -670ms |
| Bundle Size       | ~800KB  | ~500KB   | -300KB |

### After Priority 3 (Advanced)

| Métrica           | Actual  | Esperado | Mejora |
| ----------------- | ------- | -------- | ------ |
| Performance Score | 73      | 88-92    | +15-19 |
| LCP               | 2.6s    | 1.5s     | -1.1s  |
| TBT               | 1,070ms | 200ms    | -870ms |
| Bundle Size       | ~800KB  | ~400KB   | -400KB |

---

## 🔧 Tools & Commands

### Bundle Analysis

```bash
# Analizar bundle size
pnpm build && pnpm analyze

# Ver tamaño de assets
du -sh public/*

# Analizar JavaScript
npx source-map-explorer .next/static/chunks/*.js
```

### Image Optimization

```bash
# Optimizar GIF
gifsicle -O3 --colors 64 --lossy=80 input.gif -o output.gif

# Convertir a WebP
gif2webp -q 80 input.gif -o output.webp
cwebp -q 80 input.jpg -o output.webp

# Generar blur placeholder
npx plaiceholder ./public/image.jpg
```

### SVG Optimization

```bash
# Optimizar SVGs
npx svgo -f public/icons -r

# Verificar tamaño
ls -lh public/icons/*.svg
```

### Font Subsetting

```bash
# Subset Material Symbols
pyftsubset MaterialSymbolsOutlined.woff2 \
  --unicodes="U+E7FD,U+E0BE" \
  --output-file="MaterialSymbolsOutlined-subset.woff2"

# Verificar tamaño
ls -lh public/fonts/*.woff2
```

---

## 📊 Monitoring

### Metrics to Track

1. **Lighthouse Score** - Target: 90+
2. **LCP** - Target: < 2.0s
3. **TBT** - Target: < 300ms
4. **Bundle Size** - Target: < 500KB
5. **Asset Size** - Target: < 1MB total

### Tools

- Lighthouse CI
- WebPageTest
- Chrome DevTools Performance
- Bundle Analyzer
- Real User Monitoring (RUM)

---

## 🔗 Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Framer Motion Performance](https://www.framer.com/motion/guide-reduce-bundle-size/)
- [SVGO Documentation](https://github.com/svg/svgo)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)

---

**Created**: January 23, 2026  
**Status**: Planning Phase  
**Next**: Implement Priority 1 (Quick Wins)
