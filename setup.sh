#!/usr/bin/sh

set -eax

# Install everything Obsidian needs to run
if command -v sudo && command -v apt-get; then
    sudo apt-get update
    sudo apt-get install -y --no-install-recommends \
        curl \
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
fi

(
    rm -rf ./.build/app/
    mkdir -p ./.build/app/
    cd ./.build/app/ || true

    VERSION="${VERSION:-0.12.19}"
    curl -OL "https://github.com/obsidianmd/obsidian-releases/releases/download/v${VERSION}/Obsidian-${VERSION}.AppImage"
    mv "Obsidian-${VERSION}.AppImage" "obsidian.AppImage"
    chmod +x ./obsidian.AppImage

    ./obsidian.AppImage --appimage-extract
    rm -rf ../obsidian/
    mkdir -p ../obsidian/
    mv ./squashfs-root/* ../obsidian/
    chmod 4755 ../obsidian/chrome-sandbox
)

if [ "${1:-}" = "test" ]; then
    yarn install
    yarn build

    export DISPLAY=":99"
    export OBSIDIAN_PATH=./.build/obsidian/obsidian

    xvfb-run yarn test
fi
