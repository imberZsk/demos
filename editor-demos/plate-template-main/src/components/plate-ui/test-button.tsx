'use client';

// import React from 'react';
import {
  useMarkToolbarButton,
  useMarkToolbarButtonState,
} from '@udecode/plate-common';

/**
 * Toolbar button to toggle the mark of the leaves in selection.
 */
export function TestButton({ clear, nodeType, ...props }: any) {
  const state = useMarkToolbarButtonState({ clear, nodeType });
  const { props: buttonProps } = useMarkToolbarButton(state);

  // return <ToolbarButton {...buttonProps} {...props} />;
  return <div {...buttonProps}>666</div>;
}
