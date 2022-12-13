import { StateField, EditorState } from '@codemirror/state';
import { Tooltip, showTooltip } from '@codemirror/view';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import type TextlintPlugin from '../..';

import { TooltipView } from './TooltipView';
import { UnderlineEffect, underlineField } from './underlineStateField';

const constructTooltipView = (underline: UnderlineEffect) => {
  return createDiv('', (element) => {
    /* TODO: this rendering way is not good. need to fix */
    const staticElement = renderToStaticMarkup(
      React.createElement(TooltipView, { underline: underline }),
    );
    element.innerHTML = staticElement;
  });
};

const getTooltip = (
  tooltips: readonly Tooltip[],
  plugin: TextlintPlugin,
  state: EditorState,
): readonly Tooltip[] => {
  const underlines = state.field(underlineField);

  if (underlines.size === 0 || state.selection.ranges.length > 1) {
    return [];
  }

  let primaryUnderline: UnderlineEffect | null = null;

  underlines.between(
    state.selection.main.from,
    state.selection.main.to,
    (from, to, value) => {
      primaryUnderline = {
        from,
        to,
        match: value.spec.match,
      } as UnderlineEffect;
    },
  );

  if (primaryUnderline !== null) {
    const { from, to } = primaryUnderline as UnderlineEffect;

    if (tooltips.length) {
      const tooltip = tooltips[0];

      if (tooltip.pos === from && tooltip.end === to) {
        return tooltips;
      }
    }

    return [
      {
        pos: from,
        end: to,
        above: false,
        strictSide: false,
        arrow: false,
        create: (_) => {
          return {
            dom: constructTooltipView(primaryUnderline as UnderlineEffect),
          };
        },
      },
    ];
  }

  return [];
};

export const buildTooltipField = (plugin: TextlintPlugin) => {
  return StateField.define<readonly Tooltip[]>({
    create: (state) => getTooltip([], plugin, state),
    update: (tooltips, tr) => getTooltip(tooltips, plugin, tr.state),
    provide: (f) => showTooltip.computeN([f], (state) => state.field(f)),
  });
};
