import type { StateEffect } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';
import type { TextlintResult } from '@textlint/types';
import { MarkdownView, Plugin, TFile } from 'obsidian';

import { buildUnderlineExtension } from './extension/tooltip/underlineExtension';
import {
  addUnderline,
  UnderlineEffect,
  resetUnderline,
} from './extension/tooltip/underlineStateField';
import { TextlintWorker } from './lib/textlint';
import type { TextlintSettings } from './rules';
import { SettingTab } from './settings';

import './lib/sentry';

const DEFAULT_SETTINGS: Partial<TextlintSettings> = {
  lintOnSave: false,
  foldersToIgnore: [],
};

export default class TextlintPlugin extends Plugin {
  settings: TextlintSettings;
  private isEnabled = true;
  private worker: TextlintWorker;

  async onload() {
    console.log('Loading Textlint plugin');
    this.isEnabled = true;
    await this.loadSettings();

    this.worker = TextlintWorker.getInstance();
    if (this.settings.textlintrc) {
      this.worker.setTextlintrc(this.settings.textlintrc);
    }

    this.registerEditorExtension(buildUnderlineExtension(this));
    this.registerCommands();

    this.addSettingTab(new SettingTab(this.app, this));
    this.registerEventsAndSaveCallback();
  }

  onunload() {
    console.log('Unloading Textlint plugin');
    this.isEnabled = false;
    this.worker.terminate();
  }

  registerCommands() {
    this.addCommand({
      id: 'textlint-text',
      name: 'TextLint Text',
      editorCallback: (editor, view) => {
        this.runTextlint((editor as any).cm as EditorView, view).catch((e) => {
          console.log(e);
        });
      },
    });
  }

  registerEventsAndSaveCallback() {
    const saveCommandDefinition = (this.app as any).commands?.commands?.[
      'editor:save-file'
    ];
    const save = saveCommandDefinition?.callback;
    if (typeof save === 'function') {
      saveCommandDefinition.callback = () => {
        if (this.settings.lintOnSave && this.isEnabled) {
          const view = this.app.workspace.getActiveViewOfType(MarkdownView);
          if (!view) {
            return;
          }
          const editor = (view.editor as any).cm as EditorView;
          editor.dispatch({});

          const file = this.app.workspace.getActiveFile();

          if (file && !this.shouldIgnoreFile(file)) {
            this.runTextlint(editor, view);
          }
        }
      };
    }
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async runTextlint(editor: EditorView, view: MarkdownView) {
    const text = view.data;

    this.worker.startTextlint(text, (result: TextlintResult) => {
      const effects: StateEffect<UnderlineEffect | boolean>[] = [];

      // clear all underlines
      effects.push(resetUnderline.of(true));

      if (result.messages) {
        for (const message of result.messages) {
          const start = message.range[0];
          const end = message.range[1];
          effects.push(
            addUnderline.of({
              from: start,
              to: end,
              match: message,
            }),
          );
        }
      }

      if (effects.length) {
        editor.dispatch({
          effects,
        });
      }
    });
  }

  shouldIgnoreFile(file: TFile) {
    for (const folder of this.settings.foldersToIgnore) {
      if (folder.length > 0 && file.path.startsWith(folder)) {
        return true;
      }
    }

    return false;
  }
}
