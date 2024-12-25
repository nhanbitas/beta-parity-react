import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import classNames from 'classnames';
import './index.css';

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={classNames('wrapper-label', className)} {...props} />
));
Label.displayName = 'Label';

export { Label };
