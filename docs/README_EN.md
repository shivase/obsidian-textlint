# Obsidian Textlint Plugin

This is a [textlint](https://github.com/textlint/textlint) plugin for Obsidian.

By installing this plugin, you can proofread Japanese text.
(textlint itself targets not only Japanese but also natural languages in general, but at the moment it is mainly a textlint plugin for Japanese.)

[sample image](./images/sample_image.png)

## How to install

At this time, it is not registered as a community plugin, so it must be installed manually.

## Manually installing the plugin

1. Download the [latest release](https://github.com/shivase/obsidian-textlint/releases/latest)
1. Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/obsidian-textlint/`.
1. Reload Obsidian

## Usage

Press `COMMAND + P` to call up the command input screen, enter `textlint` and run it.

## Activated textlint plugin

Here are the default plugins for textlint that work with this plugin.

- [@textlint-ja/no-synonyms](https://github.com/textlint-ja/textlint-rule-no-synonyms)
- [@textlint-ja/textlint-rule-no-dropping-i](https://github.com/textlint-ja/textlint-rule-no-dropping-i)
- [@textlint-ja/textlint-rule-no-insert-dropping-sa](https://github.com/textlint-ja/textlint-rule-no-insert-dropping-sa)
- [abbr-within-parentheses](https://github.com/azu/textlint-rule-abbr-within-parentheses)
- [footnote-order](https://github.com/textlint-rule/textlint-rule-footnote-order)
- [ja-hiragana-keishikimeishi](https://github.com/lostandfound/textlint-rule-ja-hiragana-keishikimeishi)
- [no-mixed-zenkaku-and-hankaku-alphabet](https://github.com/textlint-ja/textlint-rule-no-mixed-zenkaku-and-hankaku-alphabet)
- [period-in-list-item](https://github.com/textlint-rule/textlint-rule-period-in-list-item)
- [prefer-tari-tari](https://github.com/textlint-ja/textlint-rule-prefer-tari-tari)
- [preset-ja-spacing](https://github.com/textlint-ja/textlint-rule-preset-ja-spacing)
- [preset-ja-technical-writing](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing)
- [preset-jtf-style](https://github.com/textlint-ja/textlint-rule-preset-JTF-style)
- [textlint-rule-date-weekday-mismatch](https://github.com/textlint-rule/textlint-rule-date-weekday-mismatch)
- [textlint-rule-ja-no-inappropriate-words](https://github.com/textlint-ja/textlint-rule-ja-no-inappropriate-words)
- [textlint-rule-ja-no-orthographic-variants](https://github.com/textlint-ja/textlint-rule-ja-no-orthographic-variants)
- [textlint-rule-use-si-units](https://github.com/kn1cht/textlint-rule-use-si-units)
- [textlint-rule-write-good](https://github.com/textlint-rule/textlint-rule-write-good)

## Plugin settings

Currently, the following settings are available

- Lint on save  
  If ON, Textlint will be automatically executed when the file is saved.
- Folder to ignore  
  You can set exclude folders
- Override textlintrc  
  If you want to override the textlint settings, please describe in **textlintrc.json** format. The default values are merged with the default settings.
  The default values are here -> [textlintrc.json](https://github.com/shivase/obsidian-textlint/blob/master/scripts/textlintrc.json)

## Requests and bug reports

Please feel free to comment at [issue](https://github.com/shivase/obsidian-textlint/issues)

Some textlint plugins are not web-supported, so we may not be able to fulfill your request.

## How to Plugin Development

1. cd `VaultFolder/.obsidian/plugins/`
1. Clone this repo.
1. `yarn` to install dependencies
1. `yarn build:dev` to build main program
1. `yarn generate-worker:dev` to build textlint worker.  
   command this after installing textlint plugins or updating scripts/textlintrc.json.

use [pjeby/hot-reload: Automatically reload Obsidian plugins in development when their files are changed](https://github.com/pjeby/hot-reload) is recommended to develop plugins
