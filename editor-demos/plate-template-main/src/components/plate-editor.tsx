'use client';

import {
  Plate,
  useEditorReadOnly,
  useMarkToolbarButton,
  useMarkToolbarButtonState,
} from '@udecode/plate-common';

import { plugins } from '@/lib/plate/plate-plugins';
import { Editor } from '@/components/plate-ui/editor';

import { TestButton } from './plate-ui/test-button';
import { TestButton2 } from './plate-ui/test-button2';

const initialValue = [
  {
    id: 1,
    type: 'p',
    children: [{ text: '' }],
  },
];

export function PlateEditor() {
  const readOnly = useEditorReadOnly();

  const state = useMarkToolbarButtonState({
    nodeType: 'bold',
  });

  const { props: buttonProps } = useMarkToolbarButton(state);

  return (
    <Plate
      plugins={plugins}
      initialValue={initialValue}
      onChange={(newValue) => {
        // console.log(newValue);
      }}
    >
      <div className="h-[100px] w-full bg-pink-200">
        {/* <button onClick={buttonProps.onClick}>B</button> */}
        {/* <TestButton tooltip="Bold (⌘+B)" nodeType={MARK_BOLD}></TestButton> */}
        <TestButton2 tooltip="Bold (⌘+B)" nodeType={'shopCard'}></TestButton2>
        <TestButton tooltip="Bold (⌘+B)" nodeType={'bold'}></TestButton>

        {/* <FixedToolbar> */}
        {/* <FixedToolbarButtons /> */}
        {/* <MarkToolbarButton tooltip="Bold (⌘+B)" nodeType={MARK_BOLD}>
        </MarkToolbarButton> */}
        {/* </FixedToolbar> */}

        {/* {!readOnly && (
          <Toolbar.Root
            className="flex w-full rounded-[6px] bg-white p-[10px]"
            aria-label="Formatting options"
          >
            <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
              <Toolbar.ToggleItem
                className="text-pink-200"
                value="bold"
                aria-label="Bold"
                // {...testProps}
                // onClick={() => {
                //   console.log('ok');
                // }}
              >
                <FontBoldIcon />
              </Toolbar.ToggleItem>
            </Toolbar.ToggleGroup>
          </Toolbar.Root>
        )} */}
      </div>
      <Editor placeholder="Type your message here." />
    </Plate>
  );
}
