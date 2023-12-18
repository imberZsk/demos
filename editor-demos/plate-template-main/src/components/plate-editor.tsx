'use client';

import { Plate } from '@udecode/plate-common';

import { plugins } from '@/lib/plate/plate-plugins';
import { Editor } from '@/components/plate-ui/editor';

const initialValue = [
  {
    id: 1,
    type: 'p',
    children: [{ text: '' }],
  },
];

export function PlateEditor() {
  return (
    <Plate
      plugins={plugins}
      initialValue={initialValue}
      onChange={(newValue) => {
        console.log(newValue);
      }}
    >
      <Editor placeholder="Type your message here." />
    </Plate>
  );
}
