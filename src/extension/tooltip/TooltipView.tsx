import clsx from 'clsx';
import type { FC } from 'react';
import React from 'react';

import type { UnderlineEffect } from './underlineStateField';

export type TooltipViewProps = {
  underline: UnderlineEffect;
};

export const TooltipView: FC<TooltipViewProps> = (props) => {
  const underline = props.underline;
  const lintMessage = underline.match;

  const type = lintMessage.type;
  const ruleId = lintMessage.ruleId;
  const message = lintMessage.message;
  const severity = lintMessage.severity;

  let severityString = 'info';
  switch (severity) {
    case 1:
      severityString = 'warning';
      break;
    case 2:
      severityString = 'error';
      break;
  }

  /* TODO: Add replace and ignore button */
  return (
    <div
      className={clsx(
        severity === 0 && 'tailwind-bg-base-content',
        severity === 1 && 'tailwind-bg-warning-content',
        severity === 2 && 'tailwind-bg-error-content',
        'tailwind-daisy-card tailwind-daisy-card-compact tailwind-absolute tailwind-w-[500px] tailwind-p-1 tailwind-text-left tailwind-shadow-xl',
      )}>
      <div className="tailwind-daisy-card-body">
        <div className="tailwind-daisy-card-title tailwind-text-xs tailwind-text-white">
          <div
            className={clsx(
              severity === 0 && 'tailwind-daisy-badge-info',
              severity === 1 && 'tailwind-daisy-badge-warning',
              severity === 2 && 'tailwind-daisy-badge-error',
              'tailwind-daisy-badge',
            )}>
            {severityString}
          </div>
          {type}:{ruleId}
        </div>
        <p className="tailwind-m-2 tailwind-text-sm tailwind-text-white">
          {message}
        </p>
      </div>
    </div>
  );
};
