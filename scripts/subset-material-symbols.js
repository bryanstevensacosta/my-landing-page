#!/usr/bin/env node

/**
 * Material Symbols Font Subsetting Script
 *
 * This script creates a subset of Material Symbols font containing only
 * the icons actually used in the project, reducing font size by ~80-90%.
 *
 * Usage: node scripts/subset-material-symbols.js
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { execSync } from 'child_process'
import { join } from 'path'

// Icons used in the project (extracted from codebase)
const USED_ICONS = [
  // Contact section
  'person',
  'mail',
  'business',
  'send',
  'expand_more',

  // Services section
  'deployed_code',
  'system_update_alt',
  'psychology',
  'design_services',
  'conversion_path',
  'analytics',
  'speed',
  'search',
  'accessibility',
  'language',
  'devices',
  'animation',
  'security',
  'hub',
  'schedule',
  'terminal',
  'lock',
  'alternate_email',
  'chat',

  // Add more as needed
]

// Material Symbols codepoint mapping
// Source: https://github.com/google/material-design-icons/blob/master/font/MaterialSymbolsOutlined%5BFILL%2CGRAD%2Copsz%2Cwght%5D.codepoints
const CODEPOINTS = {
  person: 'e7fd',
  mail: 'e0be',
  business: 'e0af',
  send: 'e163',
  expand_more: 'e5cf',
  deployed_code: 'e9e7',
  system_update_alt: 'e8d6',
  psychology: 'ea4a',
  design_services: 'f10a',
  conversion_path: 'e3e3',
  analytics: 'e618',
  speed: 'e9e4',
  search: 'e8b6',
  accessibility: 'e84e',
  language: 'e894',
  devices: 'e1b1',
  animation: 'e71c',
  security: 'e32a',
  hub: 'e9f4',
  schedule: 'e8b5',
  terminal: 'eb8e',
  lock: 'e897',
  alternate_email: 'e0e6',
  chat: 'e0b7',
}

console.log('🔤 Material Symbols Font Subsetting')
console.log('====================================\n')

// Check if pyftsubset is installed
try {
  execSync('pyftsubset --help', { stdio: 'ignore' })
} catch (error) {
  console.error('❌ pyftsubset is not installed')
  console.error('\nInstall with:')
  console.error('  pip install fonttools')
  console.error('  # or')
  console.error('  pip3 install fonttools')
  console.error('  # or')
  console.error('  brew install fonttools')
  process.exit(1)
}

// Find Material Symbols font file
const possiblePaths = [
  'public/fonts/MaterialSymbolsOutlined.woff2',
  'public/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].woff2',
  'node_modules/material-symbols/outlined.woff2',
]

let fontPath = null
for (const path of possiblePaths) {
  if (existsSync(path)) {
    fontPath = path
    break
  }
}

if (!fontPath) {
  console.error('❌ Material Symbols font not found')
  console.error('\nSearched in:')
  possiblePaths.forEach((p) => console.error(`  - ${p}`))
  console.error('\nPlease download from:')
  console.error(
    '  https://github.com/google/material-design-icons/tree/master/font'
  )
  process.exit(1)
}

console.log(`📦 Found font: ${fontPath}`)

// Get original file size
const originalSize = execSync(
  `stat -f%z "${fontPath}" || stat -c%s "${fontPath}"`,
  { encoding: 'utf8' }
).trim()
console.log(
  `📊 Original size: ${(parseInt(originalSize) / 1024).toFixed(2)} KB\n`
)

// Build unicode list
const unicodes = USED_ICONS.filter((icon) => CODEPOINTS[icon])
  .map((icon) => `U+${CODEPOINTS[icon].toUpperCase()}`)
  .join(',')

console.log(`🎯 Subsetting ${USED_ICONS.length} icons...`)
console.log(`Icons: ${USED_ICONS.join(', ')}\n`)

// Create subset
const outputPath = 'public/fonts/MaterialSymbolsOutlined-subset.woff2'

try {
  const command = `pyftsubset "${fontPath}" \
    --unicodes="${unicodes}" \
    --output-file="${outputPath}" \
    --flavor=woff2 \
    --layout-features="*" \
    --no-hinting \
    --desubroutinize`

  execSync(command, { stdio: 'inherit' })

  // Get new file size
  const newSize = execSync(
    `stat -f%z "${outputPath}" || stat -c%s "${outputPath}"`,
    { encoding: 'utf8' }
  ).trim()
  const reduction = (
    (1 - parseInt(newSize) / parseInt(originalSize)) *
    100
  ).toFixed(1)

  console.log('\n✅ Subset created successfully!')
  console.log(`📊 New size: ${(parseInt(newSize) / 1024).toFixed(2)} KB`)
  console.log(`📉 Reduction: ${reduction}%\n`)

  console.log('Next steps:')
  console.log('1. Update your CSS to use the subset font:')
  console.log(`
@font-face {
  font-family: 'Material Symbols Outlined';
  src: url('/fonts/MaterialSymbolsOutlined-subset.woff2') format('woff2');
  font-display: swap;
  font-weight: 100 700;
}
`)
  console.log('2. Test all icons render correctly')
  console.log('3. Remove original font file if everything works\n')
} catch (error) {
  console.error('❌ Subsetting failed:', error.message)
  process.exit(1)
}
