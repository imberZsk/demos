import { AutoformatRule } from '@udecode/plate-autoformat';
import { ELEMENT_DEFAULT, insertNodes, setNodes } from '@udecode/plate-common';

export const ELEMENT_SHOPCARD = 'shopCard';

export const autoformatBlocks: AutoformatRule[] = [
  {
    mode: 'block',
    // type: ELEMENT_SHOPCARD,
    type: 'shopCard',
    match: ['***', '**'],
    format: (editor) => {
      setNodes(editor, { type: ELEMENT_SHOPCARD });
      insertNodes(editor, {
        type: ELEMENT_DEFAULT,
        children: [{ text: '' }],
      });
    },
  },
];
