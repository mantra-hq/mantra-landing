#!/bin/bash
set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
FONTS_DIR="$SCRIPT_DIR/fonts"
mkdir -p "$FONTS_DIR"

# Inter fonts are loaded from node_modules/@fontsource/inter (installed via pnpm)
# Only Noto Sans SC needs to be downloaded (static OTF for CJK support)
if [ ! -f "$FONTS_DIR/NotoSansSC-Bold.otf" ]; then
  echo "Downloading NotoSansSC-Bold..."
  curl -fsSL -o "$FONTS_DIR/NotoSansSC-Bold.otf" \
    "https://github.com/notofonts/noto-cjk/raw/main/Sans/OTF/SimplifiedChinese/NotoSansSC-Bold.otf"
fi

echo "Fonts ready in $FONTS_DIR"
