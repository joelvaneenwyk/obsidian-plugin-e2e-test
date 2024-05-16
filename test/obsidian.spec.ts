import { test, expect, _electron as electron } from '@playwright/test';
import { existsSync } from 'fs';

test('obsidian launch test', async () => {
  // find the root of the repository by going up from current directory until finding 'manifest.json'
  let rootPath = process.cwd();
  while (!existsSync(`${rootPath}/manifest.json`)) {
    rootPath = `${rootPath}/..`;
  }

  let obsidianPaths = [
    process.env.OBSIDIAN_PATH,
    '/obsidian/obsidian',
    `${rootPath}/.build/obsidian/obsidian`
  ];

  let obsidianPath = null;
  for (let path of obsidianPaths) {
    if (existsSync(path)) {
      obsidianPath = path;
      break;
    }
  }

  const electronApp = await electron.launch({
    executablePath: obsidianPath,
    args: ['test/empty_vault']
  });
  const isPackaged = await electronApp.evaluate(async ({ app }) => {
    // This runs in Electron's main process, parameter here is always
    // the result of the require('electron') in the main app script.
    return app.isPackaged;
  });

  expect(isPackaged).toBe(true);

  // Wait for the first BrowserWindow to open
  // and return its Page object
  const window = await electronApp.firstWindow();
  await window.screenshot({ path: './.build/obsidian_start_page.png' });

  // close app
  await electronApp.close();
});
