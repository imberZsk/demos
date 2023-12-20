import React from 'react';
import { MARK_BOLD } from '@udecode/plate-basic-marks';
import { useEditorReadOnly } from '@udecode/plate-common';

import { MarkToolbarButton } from './mark-toolbar-button';

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex flex-wrap"
        style={{
          transform: 'translateX(calc(-1px))',
        }}
      >
        {!readOnly && (
          <>
            {/* <ToolbarGroup noSeparator></ToolbarGroup> */}

            {/* <ToolbarGroup> */}
            <MarkToolbarButton tooltip="Bold (⌘+B)" nodeType={MARK_BOLD}>
              {/* <Icons.bold /> */}B
            </MarkToolbarButton>
            {/* <MarkToolbarButton tooltip="Italic (⌘+I)" nodeType={MARK_ITALIC}>
                <Icons.italic />
              </MarkToolbarButton>
              <MarkToolbarButton
                tooltip="Underline (⌘+U)"
                nodeType={MARK_UNDERLINE}
              >
                <Icons.underline />
              </MarkToolbarButton>

              <MarkToolbarButton
                tooltip="Strikethrough (⌘+⇧+M)"
                nodeType={MARK_STRIKETHROUGH}
              >
                <Icons.strikethrough />
              </MarkToolbarButton>
              <MarkToolbarButton tooltip="Code (⌘+E)" nodeType={MARK_CODE}>
                <Icons.code />
              </MarkToolbarButton> */}
            {/* </ToolbarGroup> */}
          </>
        )}

        <div className="grow" />

        {/* <ToolbarGroup noSeparator></ToolbarGroup> */}
      </div>
    </div>
  );
}
