#!/bin/bash

# Bundle Analysis Script
# Analyzes Next.js bundle size and provides optimization recommendations

set -e

echo "📦 Bundle Size Analysis"
echo "======================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Build with bundle analyzer
echo "🔨 Building with bundle analyzer..."
ANALYZE=true pnpm build

echo ""
echo "📊 Bundle Analysis Complete!"
echo ""

# Analyze .next directory
echo "📁 Next.js Build Output:"
echo "------------------------"

if [ -d ".next" ]; then
  # Show size of main chunks
  echo ""
  echo "Main JavaScript Chunks:"
  find .next/static/chunks -name "*.js" -type f -exec du -h {} \; | sort -rh | head -20
  
  echo ""
  echo "Total JavaScript Size:"
  du -sh .next/static/chunks
  
  echo ""
  echo "CSS Files:"
  find .next/static/css -name "*.css" -type f -exec du -h {} \; 2>/dev/null || echo "No CSS files found"
  
  echo ""
  echo "Total CSS Size:"
  du -sh .next/static/css 2>/dev/null || echo "0B"
fi

echo ""
echo "📊 Public Assets:"
echo "-----------------"

# Analyze public directory
echo ""
echo "Largest Assets:"
find public -type f -exec du -h {} \; | sort -rh | head -20

echo ""
echo "Total Public Size:"
du -sh public

echo ""
echo "Asset Breakdown:"
echo "  Images (PNG):"
find public -name "*.png" -type f -exec du -ch {} + | tail -1 || echo "  0B"
echo "  Images (WebP):"
find public -name "*.webp" -type f -exec du -ch {} + | tail -1 || echo "  0B"
echo "  Images (AVIF):"
find public -name "*.avif" -type f -exec du -ch {} + | tail -1 || echo "  0B"
echo "  SVGs:"
find public -name "*.svg" -type f -exec du -ch {} + | tail -1 || echo "  0B"
echo "  GIFs:"
find public -name "*.gif" -type f -exec du -ch {} + | tail -1 || echo "  0B"

echo ""
echo "🎯 Optimization Recommendations:"
echo "--------------------------------"

# Check for large files
echo ""
echo "⚠️  Files larger than 100KB:"
find public -type f -size +100k -exec du -h {} \; | sort -rh

echo ""
echo "⚠️  Files larger than 500KB:"
find public -type f -size +500k -exec du -h {} \; | sort -rh

echo ""
echo "💡 Quick Wins:"
echo "  1. Convert large PNGs to WebP: cwebp -q 85 input.png -o output.webp"
echo "  2. Optimize GIFs: gifsicle -O3 --lossy=60 input.gif -o output.gif"
echo "  3. Optimize SVGs: npx svgo input.svg -o output.svg"
echo "  4. Create Material Symbols subset: node scripts/subset-material-symbols.js"
echo ""

# Check for duplicate files
echo "🔍 Checking for potential duplicates..."
echo ""
find public -type f -name "*.png" | while read png; do
  webp="${png%.png}.webp"
  if [ -f "$webp" ]; then
    png_size=$(stat -f%z "$png" 2>/dev/null || stat -c%s "$png")
    webp_size=$(stat -f%z "$webp" 2>/dev/null || stat -c%s "$webp")
    if [ $webp_size -lt $png_size ]; then
      echo "  ✅ $png has WebP alternative ($(( (png_size - webp_size) / 1024 ))KB saved)"
    fi
  fi
done

echo ""
echo "📈 Next Steps:"
echo "  1. Review bundle analyzer report (opens in browser)"
echo "  2. Run: ./scripts/optimize-assets.sh"
echo "  3. Run: node scripts/subset-material-symbols.js"
echo "  4. Test with: npx lighthouse http://localhost:3000"
echo ""
