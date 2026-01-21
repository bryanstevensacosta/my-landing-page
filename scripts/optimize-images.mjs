#!/usr/bin/env node

import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PUBLIC_DIR = join(__dirname, '..', 'public')

// Configuración de optimización
const OPTIMIZATION_CONFIG = {
  png: {
    quality: 85,
    compressionLevel: 9,
    effort: 10,
  },
  jpg: {
    quality: 85,
    mozjpeg: true,
  },
  webp: {
    quality: 85,
    effort: 6,
  },
}

async function getFilesRecursively(dir) {
  const files = []
  const items = await readdir(dir)

  for (const item of items) {
    const fullPath = join(dir, item)
    const stats = await stat(fullPath)

    if (stats.isDirectory()) {
      if (!item.startsWith('.')) {
        files.push(...(await getFilesRecursively(fullPath)))
      }
    } else if (stats.isFile()) {
      const ext = extname(item).toLowerCase()
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        files.push(fullPath)
      }
    }
  }

  return files
}

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase()
  const originalStats = await stat(filePath)
  const originalSize = originalStats.size

  console.log(`\n📸 Optimizando: ${filePath.replace(PUBLIC_DIR, '')}`)
  console.log(`   Tamaño original: ${(originalSize / 1024).toFixed(2)} KB`)

  try {
    let image = sharp(filePath)
    const metadata = await image.metadata()

    // Optimizar según el tipo
    if (ext === '.png') {
      await image
        .png(OPTIMIZATION_CONFIG.png)
        .toFile(filePath + '.tmp')
    } else if (ext === '.jpg' || ext === '.jpeg') {
      await image
        .jpeg(OPTIMIZATION_CONFIG.jpg)
        .toFile(filePath + '.tmp')
    }

    // Verificar el tamaño optimizado
    const optimizedStats = await stat(filePath + '.tmp')
    const optimizedSize = optimizedStats.size
    const savings = ((originalSize - optimizedSize) / originalSize) * 100

    if (optimizedSize < originalSize) {
      // Reemplazar el archivo original
      await sharp(filePath + '.tmp').toFile(filePath + '.optimized')
      const { unlink, rename } = await import('fs/promises')
      await unlink(filePath + '.tmp')
      await unlink(filePath)
      await rename(filePath + '.optimized', filePath)

      console.log(`   ✅ Optimizado: ${(optimizedSize / 1024).toFixed(2)} KB`)
      console.log(`   💾 Ahorro: ${savings.toFixed(2)}%`)

      // Generar versión WebP
      const webpPath = filePath.replace(ext, '.webp')
      await sharp(filePath)
        .webp(OPTIMIZATION_CONFIG.webp)
        .toFile(webpPath)

      const webpStats = await stat(webpPath)
      console.log(`   🎨 WebP generado: ${(webpStats.size / 1024).toFixed(2)} KB`)
    } else {
      const { unlink } = await import('fs/promises')
      await unlink(filePath + '.tmp')
      console.log(`   ⏭️  Ya está optimizado`)
    }
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`)
  }
}

async function main() {
  console.log('🚀 Iniciando optimización de imágenes...\n')

  const imageFiles = await getFilesRecursively(PUBLIC_DIR)
  console.log(`📊 Encontradas ${imageFiles.length} imágenes para optimizar\n`)

  let totalOriginal = 0
  let totalOptimized = 0

  for (const file of imageFiles) {
    const statsBefore = await stat(file)
    totalOriginal += statsBefore.size

    await optimizeImage(file)

    try {
      const statsAfter = await stat(file)
      totalOptimized += statsAfter.size
    } catch {
      totalOptimized += statsBefore.size
    }
  }

  const totalSavings = ((totalOriginal - totalOptimized) / totalOriginal) * 100

  console.log('\n' + '='.repeat(60))
  console.log('📊 RESUMEN DE OPTIMIZACIÓN')
  console.log('='.repeat(60))
  console.log(`Tamaño original total: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`)
  console.log(`Tamaño optimizado total: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`)
  console.log(`Ahorro total: ${totalSavings.toFixed(2)}% (${((totalOriginal - totalOptimized) / 1024 / 1024).toFixed(2)} MB)`)
  console.log('='.repeat(60))
}

main().catch(console.error)
