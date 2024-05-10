#!/usr/bin/env bash

set -eaE

# Install everything Obsidian needs to run
if command -v sudo >/dev/null 2>&1 && command -v apt-get >/dev/null 2>&1 && command -v dpkg-query >/dev/null 2>&1; then
    pkgs=(
        curl xvfb libgtk-3-0 libnotify4 libnss3
        libxss1 libxtst6 xdg-utils libatspi2.0-0
        libuuid1 libsecret-1-0 libasound2
    )
    pkgs_to_install=()
    for pkg in "${pkgs[@]}"; do
        if ! status="$(dpkg-query -W --showformat='${db:Status-Status}' "$pkg" 2>&1)" || [ ! "${status:-}" = "installed" ]; then
            pkgs_to_install+=("$pkg")
        fi
    done

    if ((${#pkgs_to_install[@]} != 0)); then
        sudo apt-get update &&
            sudo apt-get install --yes --no-install-recommends "${pkgs_to_install[@]}"
    else
        echo "All required packages are already installed."
    fi
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
