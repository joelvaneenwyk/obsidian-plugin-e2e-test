#!/usr/bin/sh

VERSION=0.12.19

set -eax

# This is all the stuff obsidian needs to run
sudo apt-get update && sudo apt-get install -y --no-install-recommends \
    xvfb \
    libgtk-3-0 \
    libnotify4 \
    libnss3 \
    libxss1 \
    libxtst6 \
    xdg-utils \
    libatspi2.0-0 \
    libuuid1 \
    libsecret-1-0 \
    libasound2

(
    rm -rf ./.build/app/
    mkdir -p ./.build/app/
    cd ./.build/app/ || true

    curl -OL "https://github.com/obsidianmd/obsidian-releases/releases/download/v${VERSION}/Obsidian-${VERSION}.AppImage"
    mv "Obsidian-${VERSION}.AppImage" "obsidian.AppImage"
    chmod +x ./obsidian.AppImage

    ./obsidian.AppImage --appimage-extract
    rm -rf ../obsidian/
    mkdir -p ../obsidian/
    mv ./squashfs-root/* ../obsidian/
    chmod 4755 ../obsidian/chrome-sandbox
)

yarn install
yarn build

export DISPLAY=":99"

export OBSIDIAN_PATH=./.build/obsidian/obsidian
xvfb-run yarn test
