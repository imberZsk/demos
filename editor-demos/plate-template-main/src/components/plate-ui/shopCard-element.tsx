import React from 'react';
import { PlateElement, PlateElementProps } from '@udecode/plate-common';
import { useFocused, useSelected } from 'slate-react';

import { cn } from '@/lib/utils';

const ShopCardElement = React.forwardRef<
  React.ElementRef<typeof PlateElement>,
  PlateElementProps
>(({ className, nodeProps, ...props }, ref) => {
  const { children } = props;

  const selected = useSelected();
  const focused = useFocused();

  return (
    <PlateElement ref={ref} {...props}>
      <div className="py-6" contentEditable={false}>
        <div
          {...nodeProps}
          className={cn(
            'h-1 cursor-pointer rounded-sm border-none bg-muted bg-clip-content',
            selected && focused && 'ring-2 ring-ring ring-offset-2',
            className
          )}
        />
        {/* <div className="h-[200px] w-full bg-pink-300">
          <div>666</div>
        </div> */}
      </div>
      {children}
    </PlateElement>
  );
});
ShopCardElement.displayName = 'ShopCardElement';

export { ShopCardElement };
