import { App, PluginSettingTab, SearchComponent, Setting } from 'obsidian';

import type TextlintPlugin from '..';
import { TextlintWorker } from '../lib/textlint';

export class SettingTab extends PluginSettingTab {
  plugin: TextlintPlugin;
  search: SearchComponent;

  constructor(app: App, plugin: TextlintPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    /* Header */
    const linterHeader = containerEl.createDiv('textlint-setting-title');
    linterHeader.createEl('h1').setText('Textlint Settings');

    /* TODO: Search Bar */
    //const searchSetting = new Setting(containerEl);
    //searchSetting.settingEl.style.border = 'none';
    //this.search.setPlaceholder('Search all settings');

    //searchSetting.addSearch((s: SearchComponent) => {
    //  this.search = s;
    //});

    //this.search.onChange((value: string) => {
    //  this.searchSettings(value.toLowerCase());
    //});

    new Setting(containerEl)
      .setName('Lint on save')
      .setDesc('Lint the file on manual save')
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.lintOnSave)
          .onChange(async (value) => {
            this.plugin.settings.lintOnSave = value;
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName('Folder to ignore')
      .setDesc('Textlintを無効にしたいフォルダを指定して下さい')
      .addTextArea((textarea) => {
        textarea
          .setValue(this.plugin.settings.foldersToIgnore.join('\n'))
          .onChange(async (value) => {
            this.plugin.settings.foldersToIgnore = value.split('\n');
            await this.plugin.saveSettings();
          });
      });

    /* TODO: Allow individual values to be set instead of text areas */
    new Setting(containerEl)
      .setName('Override textlintrc')
      .setDesc(
        'textlintrcの上書きをしたい場合にJSONフォーマットで記載して下さい。',
      )
      .addTextArea((textarea) =>
        textarea
          .setValue(this.plugin.settings.textlintrc)
          .onChange(async (value) => {
            this.plugin.settings.textlintrc = value;
            await this.plugin.saveSettings();

            if (value.trim()) {
              const worker = TextlintWorker.getInstance();
              worker.setTextlintrc(value);
            }
          }),
      );
  }
}
