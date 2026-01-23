#!/bin/bash

# Phase 3 Asset Optimization Script
# Optimiza GIFs, SVGs, PNGs sin perder calidad visual

set -e

echo "🚀 Phase 3 Asset Optimization"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if tools are installed
check_tool() {
  if ! command -v $1 &> /dev/null; then
    echo -e "${RED}❌ $1 is not installed${NC}"
    echo "Install with: brew install $2"
    exit 1
  fi
}

echo "📋 Checking required tools..."
check_tool "gifsicle" "gifsicle"
check_tool "cwebp" "webp"
check_tool "convert" "imagemagick"
check_tool "pngquant" "pngquant"
check_tool "svgo" "svgo"
echo -e "${GREEN}✅ All tools installed${NC}"
echo ""

# Create backup directory
BACKUP_DIR="public/.backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "📦 Backup directory: $BACKUP_DIR"
echo ""

# Function to get file size
get_size() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    stat -f%z "$1"
  else
    stat -c%s "$1"
  fi
}

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

# ============================================
# 1. OPTIMIZE GIF (audio.gif)
# ============================================
echo "🎬 Optimizing GIF..."
GIF_FILE="public/gif/audio.gif"

if [ -f "$GIF_FILE" ]; then
  ORIGINAL_SIZE=$(get_size "$GIF_FILE")
  echo "Original size: $(format_bytes $ORIGINAL_SIZE)"
  
  # Backup original
  cp "$GIF_FILE" "$BACKUP_DIR/"
  
  # Optimize with gifsicle (aggressive but maintains quality)
  gifsicle -O3 --colors 64 --lossy=80 "$GIF_FILE" -o "${GIF_FILE%.gif}-optimized.gif"
  
  OPTIMIZED_SIZE=$(get_size "${GIF_FILE%.gif}-optimized.gif")
  REDUCTION=$(( 100 - (OPTIMIZED_SIZE * 100 / ORIGINAL_SIZE) ))
  
  echo -e "${GREEN}✅ GIF optimized: $(format_bytes $OPTIMIZED_SIZE) (-${REDUCTION}%)${NC}"
  
  # Also create WebP version for modern browsers
  gif2webp -q 70 -lossy -m 6 "$GIF_FILE" -o "${GIF_FILE%.gif}.webp"
  WEBP_SIZE=$(get_size "${GIF_FILE%.gif}.webp")
  WEBP_REDUCTION=$(( 100 - (WEBP_SIZE * 100 / ORIGINAL_SIZE) ))
  
  echo -e "${GREEN}✅ WebP created: $(format_bytes $WEBP_SIZE) (-${WEBP_REDUCTION}%)${NC}"
else
  echo -e "${YELLOW}⚠️  $GIF_FILE not found${NC}"
fi
echo ""

# ============================================
# 2. OPTIMIZE GIANT SVG (devices.svg)
# ============================================
echo "📱 Optimizing devices.svg..."
DEVICES_SVG="public/device-logos/devices.svg"

if [ -f "$DEVICES_SVG" ]; then
  ORIGINAL_SIZE=$(get_size "$DEVICES_SVG")
  echo "Original size: $(format_bytes $ORIGINAL_SIZE)"
  
  # Backup original
  cp "$DEVICES_SVG" "$BACKUP_DIR/"
  
  # Try SVGO first
  svgo "$DEVICES_SVG" \
    --multipass \
    --precision=1 \
    -o "${DEVICES_SVG%.svg}-optimized.svg"
  
  OPTIMIZED_SIZE=$(get_size "${DEVICES_SVG%.svg}-optimized.svg")
  REDUCTION=$(( 100 - (OPTIMIZED_SIZE * 100 / ORIGINAL_SIZE) ))
  
  echo -e "${GREEN}✅ SVG optimized: $(format_bytes $OPTIMIZED_SIZE) (-${REDUCTION}%)${NC}"
  
  # If still too large (>500KB), convert to optimized PNG
  if [ $OPTIMIZED_SIZE -gt 512000 ]; then
    echo "⚠️  Still too large, converting to PNG..."
    convert "$DEVICES_SVG" -resize 1200x900 -quality 90 "${DEVICES_SVG%.svg}.png"
    pngquant --quality=85-95 "${DEVICES_SVG%.svg}.png" --output "${DEVICES_SVG%.svg}-optimized.png" --force
    
    PNG_SIZE=$(get_size "${DEVICES_SVG%.svg}-optimized.png")
    PNG_REDUCTION=$(( 100 - (PNG_SIZE * 100 / ORIGINAL_SIZE) ))
    
    echo -e "${GREEN}✅ PNG created: $(format_bytes $PNG_SIZE) (-${PNG_REDUCTION}%)${NC}"
  fi
else
  echo -e "${YELLOW}⚠️  $DEVICES_SVG not found${NC}"
fi
echo ""

# ============================================
# 3. OPTIMIZE WALLET-CONNECT SVG
# ============================================
echo "🔗 Optimizing wallet-connect.svg..."
WALLET_SVG="public/tech-logos/wallet-connect.svg"

if [ -f "$WALLET_SVG" ]; then
  ORIGINAL_SIZE=$(get_size "$WALLET_SVG")
  echo "Original size: $(format_bytes $ORIGINAL_SIZE)"
  
  # Backup original
  cp "$WALLET_SVG" "$BACKUP_DIR/"
  
  # Optimize with SVGO
  svgo "$WALLET_SVG" \
    --multipass \
    --precision=2 \
    -o "${WALLET_SVG%.svg}-optimized.svg"
  
  OPTIMIZED_SIZE=$(get_size "${WALLET_SVG%.svg}-optimized.svg")
  REDUCTION=$(( 100 - (OPTIMIZED_SIZE * 100 / ORIGINAL_SIZE) ))
  
  echo -e "${GREEN}✅ SVG optimized: $(format_bytes $OPTIMIZED_SIZE) (-${REDUCTION}%)${NC}"
else
  echo -e "${YELLOW}⚠️  $WALLET_SVG not found${NC}"
fi
echo ""

# ============================================
# 4. OPTIMIZE ALL LARGE PNGs
# ============================================
echo "🖼️  Optimizing large PNGs..."
PNG_COUNT=0

find public -name "*.png" -size +100k | while read -r png_file; do
  ORIGINAL_SIZE=$(get_size "$png_file")
  
  # Skip if WebP already exists
  webp_file="${png_file%.png}.webp"
  if [ -f "$webp_file" ]; then
    echo "⏭️  Skipping $png_file (WebP exists)"
    continue
  fi
  
  echo "Processing: $png_file ($(format_bytes $ORIGINAL_SIZE))"
  
  # Backup original
  cp "$png_file" "$BACKUP_DIR/"
  
  # Convert to WebP
  cwebp -q 85 -m 6 "$png_file" -o "$webp_file"
  
  WEBP_SIZE=$(get_size "$webp_file")
  REDUCTION=$(( 100 - (WEBP_SIZE * 100 / ORIGINAL_SIZE) ))
  
  echo -e "${GREEN}✅ WebP created: $(format_bytes $WEBP_SIZE) (-${REDUCTION}%)${NC}"
  PNG_COUNT=$((PNG_COUNT + 1))
done

echo -e "${GREEN}✅ Optimized $PNG_COUNT PNG files${NC}"
echo ""

# ============================================
# 5. OPTIMIZE ALL SVGs IN TECH-LOGOS
# ============================================
echo "🎨 Optimizing tech-logos SVGs..."
SVG_COUNT=0

find public/tech-logos -name "*.svg" ! -name "*-optimized.svg" | while read -r svg_file; do
  ORIGINAL_SIZE=$(get_size "$svg_file")
  
  # Skip if already optimized
  optimized_file="${svg_file%.svg}-optimized.svg"
  if [ -f "$optimized_file" ]; then
    echo "⏭️  Skipping $svg_file (already optimized)"
    continue
  fi
  
  # Skip small files (<10KB)
  if [ $ORIGINAL_SIZE -lt 10240 ]; then
    echo "⏭️  Skipping $svg_file (already small: $(format_bytes $ORIGINAL_SIZE))"
    continue
  fi
  
  echo "Processing: $svg_file ($(format_bytes $ORIGINAL_SIZE))"
  
  # Backup original
  cp "$svg_file" "$BACKUP_DIR/"
  
  # Optimize with SVGO
  svgo "$svg_file" --multipass --precision=2 -o "$optimized_file" 2>/dev/null || {
    echo "⚠️  Failed to optimize $svg_file"
    continue
  }
  
  OPTIMIZED_SIZE=$(get_size "$optimized_file")
  REDUCTION=$(( 100 - (OPTIMIZED_SIZE * 100 / ORIGINAL_SIZE) ))
  
  echo -e "${GREEN}✅ Optimized: $(format_bytes $OPTIMIZED_SIZE) (-${REDUCTION}%)${NC}"
  SVG_COUNT=$((SVG_COUNT + 1))
done

echo -e "${GREEN}✅ Optimized $SVG_COUNT SVG files${NC}"
echo ""

# ============================================
# SUMMARY
# ============================================
echo "================================"
echo "📊 Optimization Summary"
echo "================================"
echo ""
echo "Backup location: $BACKUP_DIR"
echo ""
echo "Next steps:"
echo "1. Review optimized files"
echo "2. Update component imports to use optimized versions"
echo "3. Run: pnpm build:analyze to check bundle size"
echo "4. Run: npx lighthouse http://localhost:3000"
echo ""
echo -e "${GREEN}✅ Optimization complete!${NC}"
