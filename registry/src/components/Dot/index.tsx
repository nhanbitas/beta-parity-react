import React from 'react';
import './index.css';
import classNames from 'classnames';

export interface DotProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  pulse?: boolean;
}

const Dot = React.forwardRef<HTMLSpanElement, DotProps>(({ className, size = 'md', pulse = false, ...props }, ref) => {
  return <span className={classNames('dot', className, size, { pulse: pulse })} ref={ref} {...props}></span>;
});

Dot.displayName = 'Dot';

export default Dot;
