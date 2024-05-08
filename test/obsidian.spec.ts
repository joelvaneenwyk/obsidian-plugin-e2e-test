import { test, expect, _electron as electron } from '@playwright/test';

test('example test', async () => {
  let path = process.env.OBSIDIAN_PATH;
  if (!path) {
    path = "/obsidian/obsidian";
  }
  const electronApp = await electron.launch({
    executablePath: path,
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
