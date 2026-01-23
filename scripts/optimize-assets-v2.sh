#!/bin/bash

# Phase 3 Asset Optimization Script - Version 2
# Optimized parameters for better results

set -e

echo "🚀 Phase 3 Asset Optimization (v2)"
echo "===================================="
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

get_size() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    stat -f%z "$1"
  else
    stat -c%s "$1"
  fi
}

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

BACKUP_DIR="public/.backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "📦 Backup: $BACKUP_DIR"
echo ""

# ============================================
# 1. OPTIMIZE GIF - Convert to WebP only
# ============================================
echo "🎬 Optimizing audio.gif..."
GIF_FILE="public/gif/audio.gif"

if [ -f "$GIF_FILE" ]; then
  ORIGINAL_SIZE=$(get_size "$GIF_FILE")
  echo "Original: $(format_bytes $ORIGINAL_SIZE)"
  
  cp "$GIF_FILE" "$BACKUP_DIR/"
  
  # Convert to WebP (much better compression for animated images)
  gif2webp -lossy -q 70 -m 6 -mt "$GIF_FILE" -o "${GIF_FILE%.gif}.webp"
  
  WEBP_SIZE=$(get_size "${GIF_FILE%.gif}.webp")
  REDUCTION=$(( 100 - (WEBP_SIZE * 100 / ORIGINAL_SIZE) ))
  
  echo -e "${GREEN}✅ WebP: $(format_bytes $WEBP_SIZE) (-${REDUCTION}%)${NC}"
else
  echo -e "${YELLOW}⚠️  Not found${NC}"
fi
echo ""

# ============================================
# 2. OPTIMIZE devices.svg - Convert to PNG
# ============================================
echo "📱 Optimizing devices.svg..."
DEVICES_SVG="public/device-logos/devices.svg"

if [ -f "$DEVICES_SVG" ]; then
  ORIGINAL_SIZE=$(get_size "$DEVICES_SVG")
  echo "Original: $(format_bytes $ORIGINAL_SIZE)"
  
  cp "$DEVICES_SVG" "$BACKUP_DIR/"
  
  # SVG is too complex, convert to optimized PNG
  convert "$DEVICES_SVG" -resize 1200x900 -quality 92 "${DEVICES_SVG%.svg}-temp.png"
  pngquant --quality=85-95 "${DEVICES_SVG%.svg}-temp.png" --output "${DEVICES_SVG%.svg}-optimized.png" --force
  rm "${DEVICES_SVG%.svg}-temp.png"
  
  PNG_SIZE=$(get_size "${DEVICES_SVG%.svg}-optimized.png")
  REDUCTION=$(( 100 - (PNG_SIZE * 100 / ORIGINAL_SIZE) ))
  
  echo -e "${GREEN}✅ PNG: $(format_bytes $PNG_SIZE) (-${REDUCTION}%)${NC}"
else
  echo -e "${YELLOW}⚠️  Not found${NC}"
fi
echo ""

# ============================================
# 3. OPTIMIZE wallet-connect.svg
# ============================================
echo "🔗 Optimizing wallet-connect.svg..."
WALLET_SVG="public/tech-logos/wallet-connect.svg"

if [ -f "$WALLET_SVG" ]; then
  ORIGINAL_SIZE=$(get_size "$WALLET_SVG")
  echo "Original: $(format_bytes $ORIGINAL_SIZE)"
  
  cp "$WALLET_SVG" "$BACKUP_DIR/"
  
  svgo "$WALLET_SVG" --multipass --precision=2 -o "${WALLET_SVG%.svg}-optimized.svg"
  
  OPT_SIZE=$(get_size "${WALLET_SVG%.svg}-optimized.svg")
  REDUCTION=$(( 100 - (OPT_SIZE * 100 / ORIGINAL_SIZE) ))
  
  echo -e "${GREEN}✅ Optimized: $(format_bytes $OPT_SIZE) (-${REDUCTION}%)${NC}"
else
  echo -e "${YELLOW}⚠️  Not found${NC}"
fi
echo ""

# ============================================
# 4. CONVERT LARGE PNGs TO WebP
# ============================================
echo "🖼️  Converting large PNGs to WebP..."
PNG_COUNT=0

find public -name "*.png" -size +100k | while read -r png_file; do
  webp_file="${png_file%.png}.webp"
  
  if [ -f "$webp_file" ]; then
    continue
  fi
  
  ORIGINAL_SIZE=$(get_size "$png_file")
  echo "Processing: $(basename $png_file) ($(format_bytes $ORIGINAL_SIZE))"
  
  cp "$png_file" "$BACKUP_DIR/"
  cwebp -q 85 -m 6 -mt "$png_file" -o "$webp_file"
  
  WEBP_SIZE=$(get_size "$webp_file")
  REDUCTION=$(( 100 - (WEBP_SIZE * 100 / ORIGINAL_SIZE) ))
  
  echo -e "${GREEN}✅ $(basename $webp_file): $(format_bytes $WEBP_SIZE) (-${REDUCTION}%)${NC}"
  PNG_COUNT=$((PNG_COUNT + 1))
done

echo ""
echo "================================"
echo "📊 Summary"
echo "================================"
echo ""
echo "Backup: $BACKUP_DIR"
echo ""
echo "Next steps:"
echo "1. Update component imports"
echo "2. Run: ./scripts/check-performance.sh"
echo "3. Run: pnpm build"
echo ""
echo -e "${GREEN}✅ Done!${NC}"
