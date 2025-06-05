import React from 'react';
import classNames from 'classnames';

import './index.css';
import './variables.css';

const sizeMap: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string> = {
  xs: 'extra-small',
  sm: 'small',
  md: 'medium',
  lg: 'large',
  xl: 'extra-large'
} as const;

// =========================
// Dot
// =========================
// Declare and export Dot type and Dot component

/**
 * Props for the Dot component.
 *
 * Extends properties from the `span` element.
 */
export interface DotProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The size of the dot.
   *
   * @default 'md'
   * @memberof DotProps
   */
  size?: keyof typeof sizeMap;

  /**
   * Whether the dot has a pulsing animation.
   *
   * @default false
   * @memberof DotProps
   */
  pulse?: boolean;

  /**
   * The color of the dot.
   *
   * @default 'gray'
   * @memberof DotProps
   */
  color?: 'gray' | 'orange' | 'violet' | 'green' | 'red' | 'yellow' | 'blue' | 'lime' | 'cyan';
}

/**
 * **Parity Dot**.
 *
 *  @see {@link https://beta-parity-react.vercel.app/dot Parity Dot}
 */
export const Dot = React.forwardRef<HTMLSpanElement, DotProps>(
  ({ className, size = 'md', pulse = false, color, ...props }, ref) => {
    return (
      <span
        className={classNames('dot', className, sizeMap[size], color, { pulse: pulse })}
        ref={ref}
        {...props}
      ></span>
    );
  }
);

Dot.displayName = 'Dot';
