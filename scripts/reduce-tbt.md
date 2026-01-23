# Reducir TBT (Total Blocking Time)

## Problema Actual

TBT: 1,070ms → Objetivo: <300ms

## Causas Principales

1. **Framer Motion animations** ejecutándose en main thread
2. **RotatingText** con animaciones character-by-character
3. **JavaScript hydration** pesado
4. **Third-party scripts** bloqueando

## Soluciones

### 1. Optimizar RotatingText (Mayor impacto)

Reemplazar animación JavaScript con CSS:

```typescript
// src/widgets/hero/ui/RotatingText.tsx
'use client'

import { useState, useEffect } from 'react'
import styles from './RotatingText.module.css'

const TEXTS = ['Full-Stack Developer', 'Cloud Architect', 'DevOps Engineer']

export function RotatingText() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    // Defer animation start until after page load
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setIndex(i => (i + 1) % TEXTS.length)
      }, 3000)
      return () => clearInterval(interval)
    }, 1000) // Wait 1s after mount

    return () => clearTimeout(timer)
  }, [])

  return (
    <span className={styles.rotating}>
      {TEXTS[index]}
    </span>
  )
}
```

```css
/* src/widgets/hero/ui/RotatingText.module.css */
.rotating {
  display: inline-block;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
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

**Impacto**: TBT -400ms a -600ms

### 2. Lazy Load Framer Motion

```typescript
// src/shared/lib/motion.tsx
import { LazyMotion, domAnimation, m } from 'framer-motion'

export function MotionProvider({ children }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}

// Use 'm' instead of 'motion'
export { m }
```

**Impacto**: Bundle -30KB, TBT -100ms

### 3. Defer Non-Critical Scripts

```typescript
// src/app/[locale]/layout.tsx
useEffect(() => {
  // Load after page is interactive
  if (typeof window !== 'undefined') {
    requestIdleCallback(
      () => {
        // Load analytics
        // Load chat widgets
        // Load other third-party scripts
      },
      { timeout: 2000 }
    )
  }
}, [])
```

**Impacto**: TBT -100ms a -200ms
