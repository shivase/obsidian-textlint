# Obsidian Textlint Plugin

Obsidian 用の[textlint](https://github.com/textlint/textlint)プラグインです。

## Manually installing the plugin

1. Download the [latest release](https://github.com/shivase/obsidian-textlint-plugin/releases/latest)
1. Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/obsidian-textlint/`.
1. Reload Obsidian

## Build plugin

1. Clone this repo.
1. `yarn` to install dependencies
1. `yarn build:dev` to build main program
1. `yarn generate-worker:dev` to build textlint worker.
