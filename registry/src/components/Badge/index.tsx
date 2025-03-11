import React from 'react';
import classNames from 'classnames';
import './index.css';
import './variables.css';
import { Dot } from '../Dot';

// =========================
// Badge
// =========================
// Declare and export Badge type and Badge component

const sizeMap = {
  xs: 'extra-small',
  sm: 'small',
  md: 'medium'
};

/**
 * Props for the Badge component.
 *
 * Extends properties from the `span` element.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The label text for the badge.
   * If provided, it will display as the main content of the badge.
   *
   * @memberof BadgeProps
   */
  label?: string;

  /**
   * Icon to be displayed alongside the label or content.
   *
   * @memberof BadgeProps
   */
  icon?: React.ReactNode;

  /**
   * Color of the badge.
   *
   * @default 'gray'
   * @memberof BadgeProps
   */
  color?: 'gray' | 'orange' | 'violet' | 'green' | 'red' | 'yellow' | 'blue' | 'lime' | 'cyan' | '';

  /**
   * Size of the badge.
   * Available options are 'md' (medium), 'sm' (small), and 'xs' (extra small).
   *
   * @default 'md'
   * @memberof BadgeProps
   */
  size?: keyof typeof sizeMap;

  /**
   * Whether to display a small dot in the badge.
   * If `true`, a small dot will be rendered (override icon).
   *
   * @default false
   * @memberof BadgeProps
   */
  dot?: boolean;

  /**
   * The variant of the badge.
   *
   * @default 'outlined'
   * @memberof BadgeProps
   */
  variant?: 'outlined' | 'solid' | 'glass';
}

/**
 * **Parity Badge**

 *  @see {@link http://localhost:3005/badge Parity Badge}
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, children, label, icon, color = 'gray', size = 'md', variant = 'outlined', dot = false, ...props },
    ref
  ) => {
    return (
      <span
        className={classNames('badge', { dotted: dot }, className, variant, color, sizeMap[size])}
        ref={ref}
        {...props}
      >
        {dot ? (
          <>
            <Dot size={size} /> {label || children}
          </>
        ) : (
          <>
            {icon} {label || children}
          </>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
