import { tooltips } from '@codemirror/view';

import type TextlintPlugin from '../../';

import { buildTooltipField } from './tooltipField';
import { underlineField } from './underlineStateField';

export const buildUnderlineExtension = (plugin: TextlintPlugin) => {
  return [
    tooltips({
      position: 'absolute',
      tooltipSpace: (view) => {
        const rect = view.dom.getBoundingClientRect();

        return {
          top: rect.top,
          left: rect.left,
          bottom: rect.bottom,
          right: rect.right,
        };
      },
    }),
    underlineField,
    buildTooltipField(plugin),
  ];
};
