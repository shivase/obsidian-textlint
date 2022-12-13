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
  let severityClass = 'bg-info bg-info-content';
  let severityBadge = 'badge-info';
  if (severity === 1) {
    severityString = 'warning';
    severityClass = 'bg-warning bg-warning-content';
    severityBadge = 'badge-warning';
  } else if (severity === 2) {
    severityString = 'error';
    severityClass = 'bg-error bg-error-content';
    severityBadge = 'badge-error';
  }

  /* TODO: Add replace and ignore button */
  return (
    <div
      className={clsx(
        severityClass,
        'card-compact card absolute w-[500px] p-4 text-left shadow-xl',
      )}>
      <div className="card-body">
        <div className="card-title text-sm">
          <div className={clsx('badge', severityBadge)}> {severityString}</div>
          {type}:{ruleId}
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
};
