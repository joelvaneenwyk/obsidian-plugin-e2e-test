# Obsidian Plugin E2E Test

This is a sample repo demonstrating how to write test cases that interact with Obsidian.

## Notable files

- `test/spec.mjs` - This is a mocha test case that is using [spectron](https://www.electronjs.org/spectron) to control obsidian
- `Dockerfile` - This will let you run your tests inside CI
- `.github/workflows/action.yml` - CI setup so your tests run in github

## Running the test cases

If you are on a computer Docker you can run `make e2e`. If you want to write test cases against your local version of Obsidian you need to set `OBSIDIAN_PATH` to be the path to your obsidian executable. Then run the tests `yarn test`

### macOS

```bash
export OBSIDIAN_PATH=/Applications/Obsidian.app/Contents/MacOS/Obsidian
```

### Linux

This is the most tested environment.

```bash
version="0.11.13"
filename="Obsidian-${version}.AppImage"
curl -LO https://github.com/obsidianmd/obsidian-releases/releases/download/v${version}/${filename}
chmod +x ${filename}
./${filename} --appimage-extract
export OBSIDIAN_PATH=$(pwd)/squashfs-root/obsidian
# You might want to look into the Dockerfile to see what things you need to apt-install to get obsidian to run
```

### Windows

> [!WARNING]
> Not yet working.

## Tips

- [Spectrons documentation](https://github.com/electron-userland/spectron)
- [this.app.client is a webdriver browser](https://webdriver.io/docs/api/browser/$)
