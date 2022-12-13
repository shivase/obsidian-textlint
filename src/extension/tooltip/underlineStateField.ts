import { syntaxTree, tokenClassNodeProp } from '@codemirror/language';
import { StateField, StateEffect } from '@codemirror/state';
import { EditorView, Decoration, DecorationSet } from '@codemirror/view';
import type { Tree } from '@lezer/common';
import type { TextlintMessage } from '@textlint/types';

import { ignoreListRegEx } from './helpers';

export interface UnderlineEffect {
  from: number;
  to: number;
  match: TextlintMessage;
  reset?: boolean;
}

export const addUnderline = StateEffect.define<UnderlineEffect>();
export const resetUnderline = StateEffect.define<boolean>();

const filterUnderlines = (
  decorationStart: number,
  decorationEnd: number,
  rangeStart: number,
  rangeEnd: number,
) => {
  // Decoration begins in defined range
  if (decorationStart >= rangeStart && decorationStart <= rangeEnd) {
    return false;
  }

  // Decoration ends in defined range
  if (decorationEnd >= rangeStart && decorationEnd <= rangeEnd) {
    return false;
  }

  // Defined range begins within decoration
  if (rangeStart >= decorationStart && rangeStart <= decorationEnd) {
    return false;
  }

  // Defined range ends within decoration
  if (rangeEnd >= decorationStart && rangeEnd <= decorationEnd) {
    return false;
  }

  return true;
};

export const underlineField = StateField.define<DecorationSet>({
  create: () => {
    return Decoration.none;
  },
  update: (underlines, tr) => {
    const seenRanges = new Set<string>();

    const seenPositions: Record<number, boolean> = {};
    let tree: Tree | null = null;

    underlines = underlines.map(tr.changes);

    const canDecorate = (pos: number) => {
      if (seenPositions[pos] !== undefined) {
        return seenPositions[pos];
      }

      if (!tree) tree = syntaxTree(tr.state);

      const nodeProps = tree.resolveInner(pos, 1).type.prop(tokenClassNodeProp);

      if (nodeProps && ignoreListRegEx.test(nodeProps)) {
        seenPositions[pos] = false;
      } else {
        seenPositions[pos] = true;
      }

      return seenPositions[pos];
    };

    if (tr.docChanged && tr.selection && underlines.size) {
      underlines = underlines.update({
        filter: (from, to) => {
          return filterUnderlines(
            from,
            to,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            tr.selection!.main.from,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            tr.selection!.main.to,
          );
        },
      });
    }

    for (const e of tr.effects) {
      if (e.is(resetUnderline) && e.value) {
        underlines = Decoration.none;
      } else if (e.is(addUnderline)) {
        const { from, to, match } = e.value;
        const key = `${from},${to}`;

        let severityClass = 'info';
        if (match.severity === 1) {
          severityClass = 'warning';
        } else if (match.severity === 2) {
          severityClass = 'error';
        }

        if (!seenRanges.has(key) && canDecorate(from) && canDecorate(to)) {
          seenRanges.add(key);
          underlines = underlines.update({
            add: [
              Decoration.mark({
                class: `textlint-underline ${severityClass}`,
                match,
              }).range(from, to),
            ],
          });
        }
      }
    }

    return underlines;
  },
  provide: (f) => EditorView.decorations.from(f),
});
