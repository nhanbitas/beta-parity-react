import React from 'react';
import './index.css';
import classNames from 'classnames';

export interface DotProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'gray' | 'orange' | 'cyan' | 'violet' | 'green' | 'red' | 'yellow' | 'blue' | 'lime';
  kind?: 'glass' | 'filled';
  pulse?: boolean;
}

const Dot = React.forwardRef<HTMLSpanElement, DotProps>(
  ({ className, size = 'md', color = 'gray', pulse = false, kind = 'filled', ...props }, ref) => {
    return (
      <span className={classNames('dot', className, color, size, kind, { pulse: pulse })} ref={ref} {...props}></span>
    );
  }
);

Dot.displayName = 'Dot';

export default Dot;
