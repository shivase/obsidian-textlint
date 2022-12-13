import type { TextlintResult } from '@textlint/types';
import { Notice } from 'obsidian';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */
// eslint-disable-next-line import/namespace
import Worker from '../../lib/worker/textlint-worker.js';
import textlintrc from '../../scripts/textlintrc.json';

export class TextlintWorker {
  private static instance: TextlintWorker | null;
  private _worker: Worker;

  private constructor() {
    this._worker = new Worker();
    this.setTextlintrc(JSON.stringify(textlintrc));
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new TextlintWorker();
    return this.instance;
  }

  setTextlintrc(textlintrc: string) {
    try {
      this._worker.postMessage({
        command: 'merge-config',
        textlintrc: JSON.parse(textlintrc),
      });
    } catch (e) {
      new Notice('textlintrc Format Error: ' + e);
    }
  }

  startTextlint(text: string, callback: (result: TextlintResult) => void) {
    this.registerTextlintCallback(callback);
    this.postToTextlint(text);
  }

  terminate() {
    this._worker.terminate();
    TextlintWorker.instance = null;
  }

  private registerTextlintCallback(callback: (result: TextlintResult) => void) {
    this._worker.onmessage = (event: any) => {
      if (event.data.command === 'lint:result') {
        callback(event.data.result);
      }
    };
  }

  private postToTextlint = async (text: string) => {
    this._worker.postMessage({
      command: 'lint',
      text: text,
      ext: '.txt',
    });
  };
}
