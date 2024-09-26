import React from 'react';
import './index.css';
import classNames from 'classnames';

// =========================
// Dot
// =========================
// Declare and export Dot type and Dot component

export interface DotProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The size of the dot.
   * @default 'md'
   * @memberof DotProps
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /**
   * Whether the dot has a pulsing animation.
   * @default false
   * @memberof DotProps
   */
  pulse?: boolean;

  /**
   * The color of the dot.
   * @default 'gray'
   * @memberof DotProps
   */
  color?: 'gray' | 'orange' | 'violet' | 'green' | 'red' | 'yellow' | 'blue' | 'lime' | 'cyan';
}

const Dot = React.forwardRef<HTMLSpanElement, DotProps>(
  ({ className, size = 'md', pulse = false, color, ...props }, ref) => {
    return <span className={classNames('dot', className, size, color, { pulse: pulse })} ref={ref} {...props}></span>;
  }
);

Dot.displayName = 'Dot';

export default Dot;
