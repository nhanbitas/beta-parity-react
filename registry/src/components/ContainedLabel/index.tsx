import * as React from 'react';
import classNames from 'classnames';
import './index.css';

export interface ContainedLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  isActive?: boolean;
}

const ContainedLabel = React.forwardRef<React.ForwardedRef<HTMLLabelElement>, ContainedLabelProps>(
  ({ isActive, children, className, ...props }, ref) => (
    <label className={classNames('contained-label', className, { active: isActive })} {...props}>
      {children}
    </label>
  )
);

ContainedLabel.displayName = 'ContainedLabel';

export { ContainedLabel };
