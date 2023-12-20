import { createAutoformatPlugin } from '@udecode/plate-autoformat';
import { createBoldPlugin, MARK_BOLD } from '@udecode/plate-basic-marks';
import {
  createPluginFactory,
  createPlugins,
  PlateLeaf,
  withProps,
} from '@udecode/plate-common';

import { autoformatPlugin } from '@/lib/plate/autoformatPlugin';
import { ShopCardElement } from '@/components/plate-ui/shopCard-element';

import { ELEMENT_SHOPCARD } from './autoformatBlocks';

const createTestPlugin = createPluginFactory({
  key: ELEMENT_SHOPCARD,
  isElement: true,
  isVoid: true,
  deserializeHtml: {
    rules: [
      {
        validNodeName: 'shopCard',
      },
    ],
  },
});

export const plugins = createPlugins(
  [
    createBoldPlugin(),
    createTestPlugin(),
    createAutoformatPlugin(autoformatPlugin),
  ],
  {
    components: {
      [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
      [ELEMENT_SHOPCARD]: ShopCardElement,
    },
  }
);
