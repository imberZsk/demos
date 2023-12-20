'use client';

// import React from 'react';
import {
  useEditorRef,
  useMarkToolbarButton,
  useMarkToolbarButtonState,
} from '@udecode/plate-common';

import { formatText } from '@/lib/plate/autoformatUtils';

/**
 * Toolbar button to toggle the mark of the leaves in selection.
 */
export function TestButton2({ clear, nodeType, ...props }: any) {
  const state = useMarkToolbarButtonState({ clear, nodeType });
  const { props: buttonProps } = useMarkToolbarButton(state);

  const editor = useEditorRef();

  // return <ToolbarButton {...buttonProps} {...props} />;
  return <div onClick={() => formatText(editor, '666666')}>6662</div>;
}
