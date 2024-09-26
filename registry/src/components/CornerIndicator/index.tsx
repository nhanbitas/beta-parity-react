import React from 'react';
import classNames from 'classnames';
import './index.css';
import Badge, { BadgeProps } from '../Badge';
import Dot, { DotProps } from '../Dot';

// =========================
// Corner Indicator
// =========================
// Declare and export Corner Indicator type and Corner Indicator component

export interface CornerIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The label text displayed inside the corner indicator.
   * If the label is undefined, it will return type "dot" for corner indicator
   * @memberof CornerIndicatorProps
   */
  label?: string;

  /**
   * Icon to be displayed inside the corner indicator for type "badge".
   * @memberof CornerIndicatorProps
   */
  icon?: React.ReactNode;

  /**
   * If true, an outline will be applied to the corner indicator.
   * @default false
   * @memberof CornerIndicatorProps
   */
  outline?: boolean;

  /**
   * If true, the corner indicator will have a pulsing animation, for type "dot".
   * @default false
   * @memberof CornerIndicatorProps
   */
  pulse?: boolean;

  /**
   * Offset from the corner of the container in pixels.
   * Defines how far the indicator is placed from the corner.
   * If offset larger than 0, the corner indicator is translated to outside
   * @memberof CornerIndicatorProps
   */
  offset?: number;

  /**
   * If true, the corner indicator will be displayed.
   * @default false
   * @memberof CornerIndicatorProps
   */
  disable?: boolean;

  /**
   * Position of the corner indicator relative to the container.
   * @default 'top-right'
   * @memberof CornerIndicatorProps
   */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

  /**
   * Color of the corner indicator.
   * @default 'gray'
   * @memberof CornerIndicatorProps
   */
  color?: 'gray' | 'orange' | 'violet' | 'green' | 'red' | 'yellow' | 'blue' | 'lime' | 'cyan' | '';

  /**
   * Size of the corner indicator.
   * "lg" size is just possible for the dot corner indicator
   * @default 'md'
   * @memberof CornerIndicatorProps
   */
  size?: 'md' | 'sm' | 'xs' | 'lg';

  /**
   * The variant of the corner indicator.
   * @default 'filled'
   * @memberof CornerIndicatorProps
   */
  variant?: 'filled' | 'outlined' | 'glass' | '';

  /**
   * Additional properties for the indicator BadgeProps | DotProps.
   * Combines certain properties from BadgeProps and DotProps, excluding 'size', 'color', and 'variant'.
   * @memberof CornerIndicatorProps
   */
  indicatorProps?: Omit<BadgeProps, 'size' | 'color' | 'variant'> & Omit<DotProps, 'size' | 'color' | 'pulse'>;
}

export const CornerIndicator = React.forwardRef<HTMLDivElement, CornerIndicatorProps>(
  (
    {
      className,
      children,
      label,
      icon,
      pulse = false,
      outline = false,
      disable = false,
      offset = 0,
      position = 'top-right',
      color = 'gray',
      size = 'md',
      variant = 'filled',
      indicatorProps,
      ...props
    },
    ref
  ) => {
    const offsetValue = { '--par-offset': `${offset}px` } as React.CSSProperties;

    if (disable) return children;

    return (
      <div
        className={classNames('corner-indicator-container', { bordered: outline }, className, position)}
        ref={ref}
        style={{ ...offsetValue }}
        {...props}
      >
        {!label ? (
          <Dot pulse={pulse} size={size} color={color as any} {...indicatorProps} />
        ) : (
          <Badge label={label} icon={icon} color={color} size={size as any} variant={variant} {...indicatorProps} />
        )}
        {children}
      </div>
    );
  }
);

CornerIndicator.displayName = 'CornerIndicator';
