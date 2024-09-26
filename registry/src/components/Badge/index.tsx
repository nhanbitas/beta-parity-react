import React from 'react';
import classNames from 'classnames';
import './index.css';
import Dot from '../Dot';

// =========================
// Badge
// =========================
// Declare and export Badge type and Badge component

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The label text for the badge.
   * If provided, it will display as the main content of the badge.
   * @memberof BadgeProps
   */
  label?: string;

  /**
   * Icon to be displayed alongside the label or content.
   * @memberof BadgeProps
   */
  icon?: React.ReactNode;

  /**
   * Color of the badge.
   * @default 'gray'
   * @memberof BadgeProps
   */
  color?: 'gray' | 'orange' | 'violet' | 'green' | 'red' | 'yellow' | 'blue' | 'lime' | 'cyan' | '';

  /**
   * Size of the badge.
   * Available options are 'md' (medium), 'sm' (small), and 'xs' (extra small).
   * @default 'md'
   * @memberof BadgeProps
   */
  size?: 'md' | 'sm' | 'xs';

  /**
   * Whether to display a small dot in the badge.
   * If `true`, a small dot will be rendered (override icon).
   * @default false
   * @memberof BadgeProps
   */
  dot?: boolean;

  /**
   * The variant of the badge.
   * @default 'outlined'
   * @memberof BadgeProps
   */
  variant?: 'filled' | 'outlined' | 'glass' | '';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, children, label, icon, color = 'gray', size = 'md', variant = 'outlined', dot = false, ...props },
    ref
  ) => {
    return (
      <span className={classNames('badge', { dotted: dot }, className, variant, color, size)} ref={ref} {...props}>
        {dot ? (
          <>
            <Dot size={size == 'xs' ? 'xs' : 'sm'} /> {label || children}
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

export default Badge;
