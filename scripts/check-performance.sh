#!/bin/bash

# Quick Performance Check Script
# Verifica el estado actual de performance sin hacer build completo

echo "⚡ Quick Performance Check"
echo "=========================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Function to format bytes
format_bytes() {
  local bytes=$1
  if [ $bytes -lt 1024 ]; then
    echo "${bytes}B"
  elif [ $bytes -lt 1048576 ]; then
    echo "$(( bytes / 1024 ))KB"
  else
    echo "$(( bytes / 1048576 ))MB"
  fi
}

# Function to get file size
get_size() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    stat -f%z "$1" 2>/dev/null || echo "0"
  else
    stat -c%s "$1" 2>/dev/null || echo "0"
  fi
}

echo "📊 Asset Analysis"
echo "-----------------"
echo ""

# Check critical assets
echo "Critical Assets:"

# Audio GIF
if [ -f "public/gif/audio.gif" ]; then
  size=$(get_size "public/gif/audio.gif")
  formatted=$(format_bytes $size)
  if [ $size -gt 500000 ]; then
    echo -e "  ${RED}❌ audio.gif: $formatted (TOO LARGE)${NC}"
  elif [ $size -gt 300000 ]; then
    echo -e "  ${YELLOW}⚠️  audio.gif: $formatted (Could be smaller)${NC}"
  else
    echo -e "  ${GREEN}✅ audio.gif: $formatted${NC}"
  fi
fi

if [ -f "public/gif/audio.webp" ]; then
  size=$(get_size "public/gif/audio.webp")
  echo -e "  ${GREEN}✅ audio.webp: $(format_bytes $size)${NC}"
fi

# Devices SVG
if [ -f "public/device-logos/devices.svg" ]; then
  size=$(get_size "public/device-logos/devices.svg")
  formatted=$(format_bytes $size)
  if [ $size -gt 1000000 ]; then
    echo -e "  ${RED}❌ devices.svg: $formatted (TOO LARGE)${NC}"
  else
    echo -e "  ${YELLOW}⚠️  devices.svg: $formatted${NC}"
  fi
fi

if [ -f "public/device-logos/devices-optimized.png" ]; then
  size=$(get_size "public/device-logos/devices-optimized.png")
  echo -e "  ${GREEN}✅ devices-optimized.png: $(format_bytes $size)${NC}"
fi

# Wallet Connect
if [ -f "public/tech-logos/wallet-connect.svg" ]; then
  size=$(get_size "public/tech-logos/wallet-connect.svg")
  formatted=$(format_bytes $size)
  if [ $size -gt 200000 ]; then
    echo -e "  ${RED}❌ wallet-connect.svg: $formatted (TOO LARGE)${NC}"
  else
    echo -e "  ${YELLOW}⚠️  wallet-connect.svg: $formatted${NC}"
  fi
fi

echo ""
echo "Total Asset Sizes:"
echo "  PNGs: $(find public -name "*.png" -type f -exec du -ch {} + 2>/dev/null | tail -1 | cut -f1 || echo '0')"
echo "  WebPs: $(find public -name "*.webp" -type f -exec du -ch {} + 2>/dev/null | tail -1 | cut -f1 || echo '0')"
echo "  SVGs: $(find public -name "*.svg" -type f -exec du -ch {} + 2>/dev/null | tail -1 | cut -f1 || echo '0')"
echo "  GIFs: $(find public -name "*.gif" -type f -exec du -ch {} + 2>/dev/null | tail -1 | cut -f1 || echo '0')"
echo "  Total: $(du -sh public 2>/dev/null | cut -f1 || echo '0')"

echo ""
echo "📦 Font Check"
echo "-------------"

if [ -f "public/fonts/MaterialSymbolsOutlined.woff2" ]; then
  size=$(get_size "public/fonts/MaterialSymbolsOutlined.woff2")
  formatted=$(format_bytes $size)
  if [ $size -gt 50000 ]; then
    echo -e "  ${YELLOW}⚠️  MaterialSymbolsOutlined.woff2: $formatted (Consider subsetting)${NC}"
  else
    echo -e "  ${GREEN}✅ MaterialSymbolsOutlined.woff2: $formatted${NC}"
  fi
fi

if [ -f "public/fonts/MaterialSymbolsOutlined-subset.woff2" ]; then
  size=$(get_size "public/fonts/MaterialSymbolsOutlined-subset.woff2")
  echo -e "  ${GREEN}✅ MaterialSymbolsOutlined-subset.woff2: $(format_bytes $size)${NC}"
fi

echo ""
echo "🔍 Large Files (>100KB)"
echo "----------------------"
find public -type f -size +100k -exec du -h {} \; | sort -rh | head -10

echo ""
echo "💡 Recommendations"
echo "------------------"

# Check if optimizations are needed
needs_optimization=false

if [ -f "public/gif/audio.gif" ] && [ ! -f "public/gif/audio.webp" ]; then
  echo "  ⚠️  Run: ./scripts/optimize-assets.sh (optimize audio.gif)"
  needs_optimization=true
fi

if [ -f "public/device-logos/devices.svg" ] && [ ! -f "public/device-logos/devices-optimized.png" ]; then
  echo "  ⚠️  Run: ./scripts/optimize-assets.sh (optimize devices.svg)"
  needs_optimization=true
fi

if [ -f "public/fonts/MaterialSymbolsOutlined.woff2" ] && [ ! -f "public/fonts/MaterialSymbolsOutlined-subset.woff2" ]; then
  echo "  ⚠️  Run: node scripts/subset-material-symbols.js (create font subset)"
  needs_optimization=true
fi

if [ "$needs_optimization" = false ]; then
  echo -e "  ${GREEN}✅ All optimizations applied!${NC}"
  echo "  Next: Run Lighthouse audit"
  echo "    npx lighthouse http://localhost:3000 --view"
fi

echo ""
