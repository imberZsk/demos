import { createBoldPlugin, MARK_BOLD } from '@udecode/plate-basic-marks';
import { createPlugins, PlateLeaf, withProps } from '@udecode/plate-common';

export const plugins = createPlugins([createBoldPlugin()], {
  components: {
    [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
  },
});
