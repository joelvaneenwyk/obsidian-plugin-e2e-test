/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/

'use strict';

var obsidian = require('obsidian');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P
      ? value
      : new P(function (resolve) {
          resolve(value);
        });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator['throw'](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

typeof SuppressedError === 'function'
  ? SuppressedError
  : function (error, suppressed, message) {
      var e = new Error(message);
      return (e.name = 'SuppressedError'), (e.error = error), (e.suppressed = suppressed), e;
    };

/**
 *
 * obsidian-plugin-e2e-test | main source file
 *
 */
const DEFAULT_SETTINGS = {
  mySetting: 'default'
};
class MyPlugin extends obsidian.Plugin {
  constructor() {
    const _manifest = {
      id: 'my-plugin',
      name: 'My Plugin',
      author: 'Author Name',
      version: '0.0.1',
      minAppVersion: '0.9.0',
      description: 'My awesome plugin for Obsidian!'
    };
    super(app, _manifest);
    this.settings = Object.assign({}, DEFAULT_SETTINGS);
  }
  onload() {
    return __awaiter(this, void 0, void 0, function* () {
      console.log('loading plugin');
      yield this.loadSettings();
      this.addRibbonIcon('dice', 'Sample Plugin', () => {
        new obsidian.Notice('This is a notice!');
      });
      this.addStatusBarItem().setText('Status Bar Text');
      this.addCommand({
        id: 'open-sample-modal',
        name: 'Open Sample Modal',
        // callback: () => {
        // 	console.log('Simple Callback');
        // },
        checkCallback: (checking) => {
          const leaf = this.app.workspace.activeLeaf;
          if (leaf) {
            if (!checking) {
              new SampleModal(this.app).open();
            }
            return true;
          }
          return false;
        }
      });
      this.addSettingTab(new SampleSettingTab(this.app, this));
      // #todo No longer available or may have been renamed/moved.
      //this.registerCodeMirror((cm: CodeMirror.Editor) => {
      //    console.log('codemirror', cm);
      //});
      this.registerDomEvent(document, 'click', (evt) => {
        console.log('click', evt);
      });
      this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
    });
  }
  onunload() {
    console.log('unloading plugin');
  }
  loadSettings() {
    return __awaiter(this, void 0, void 0, function* () {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
    });
  }
  saveSettings() {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.saveData(this.settings);
    });
  }
}
class SampleModal extends obsidian.Modal {
  constructor(app) {
    super(app);
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.setText('Woah!');
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}
class SampleSettingTab extends obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl('h2', { text: 'Settings for my awesome plugin.' });
    new obsidian.Setting(containerEl)
      .setName('Setting #1')
      .setDesc("It's a secret")
      .addText((text) =>
        text
          .setPlaceholder('Enter your secret')
          .setValue('')
          .onChange((value) =>
            __awaiter(this, void 0, void 0, function* () {
              console.log('Secret: ' + value);
              this.plugin.settings.mySetting = value;
              yield this.plugin.saveSettings();
            })
          )
      );
  }
}

module.exports = MyPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uLy4uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6WyJQbHVnaW4iLCJOb3RpY2UiLCJNb2RhbCIsIlBsdWdpblNldHRpbmdUYWIiLCJTZXR0aW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWtHQTtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FB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
