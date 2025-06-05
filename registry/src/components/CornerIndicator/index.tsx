import React from 'react';
import classNames from 'classnames';

import './index.css';
import './variables.css';

import { Badge, BadgeProps } from '../Badge';
import { Dot, DotProps } from '../Dot';

// =========================
// Corner Indicator
// =========================
// Declare and export Corner Indicator type and Corner Indicator component

const sizetoBadgeSize: Record<'xs' | 'sm' | 'md' | 'lg', string> = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg'
} as const;

const sizetoDotSize: Record<'xs' | 'sm' | 'md' | 'lg', string> = {
  xs: 'sm',
  sm: 'md',
  md: 'lg',
  lg: 'xl'
} as const;

const translateXOriginMap: Record<'symmetric' | 'inward' | 'outward', { translatePercent: number; xOffset: number }> = {
  symmetric: { translatePercent: 50, xOffset: 0 },
  inward: { translatePercent: 0, xOffset: 6 },
  outward: { translatePercent: 100, xOffset: 6 }
} as const;

/**
 * Props for the Corner Indicator component.
 *
 * Extends properties from the `Div` element.
 */
export interface CornerIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The label text displayed inside the corner indicator.
   * If the label is undefined, it will return type "dot" for corner indicator
   *
   * @memberof CornerIndicatorProps
   */
  label?: string;

  /**
   * Icon to be displayed inside the corner indicator for type "badge".
   *
   * @memberof CornerIndicatorProps
   */
  icon?: React.ReactNode;

  /**
   * If true, an outline will be applied to the corner indicator.
   *
   * @default false
   * @memberof CornerIndicatorProps
   */
  outline?: boolean;

  /**
   * If true, the corner indicator will have a pulsing animation, for type "dot".
   *
   * @default false
   * @memberof CornerIndicatorProps
   */
  pulse?: boolean;

  /**
   * Offset from the corner of the container in pixels.
   * Defines how far the indicator is placed from the corner.
   * If offset is larger than 0, the corner indicator is translated to outside from current x position
   *
   * @default 0
   * @memberof CornerIndicatorProps
   */
  offset?: number;

  /**
   * xOffset from the corner of the container in pixels.
   * Defines how far the indicator is placed from the corner.
   * If xOffset is larger than 0, the corner indicator is translated to outside from 0px with the side of corner
   * Default value of xOffset is 6px if growDirection is 'inward' | 'outward', is 0px  if growDirection is symmetric
   *
   * @default 0
   * @memberof CornerIndicatorProps
   */
  xOffset?: number;

  /**
   * yOffset from the corner of the container in pixels.
   * Defines how far the indicator is placed from the corner.
   * If yOffset is larger than 0, the corner indicator is translated to outside from current y position
   * Default value of yOffset is 6px if growDirection is 'inward' | 'outward', is 0px  if growDirection is symmetric
   *
   * @default 0
   * @memberof CornerIndicatorProps
   */
  yOffset?: number;

  /**
   * If true, the corner indicator will be displayed.
   *
   * @default false
   * @memberof CornerIndicatorProps
   */
  disable?: boolean;

  /**
   * Position of the corner indicator relative to the container.
   *
   * @default 'top-right'
   * @memberof CornerIndicatorProps
   */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

  /**
   * Color of the corner indicator.
   *
   * @default 'gray'
   * @memberof CornerIndicatorProps
   */
  color?: 'gray' | 'orange' | 'violet' | 'green' | 'red' | 'yellow' | 'blue' | 'lime' | 'cyan';

  /**
   * Size of the corner indicator.
   * "lg" size is just possible for the dot corner indicator
   *
   * @default 'md'
   * @memberof CornerIndicatorProps
   */
  size?: 'md' | 'sm' | 'xs' | 'lg';

  /**
   * The variant of the corner indicator.
   *
   * @default 'solid'
   * @memberof CornerIndicatorProps
   */
  variant?: 'solid' | 'outlined' | 'glass';

  /**
   * The direction of corner indicator when the content of this grow
   *
   * @default 'symmetric'
   * @memberof CornerIndicatorProps
   */
  growDirection?: 'symmetric' | 'inward' | 'outward';

  /**
   * Additional properties for the indicator BadgeProps | DotProps.
   * Combines certain properties from BadgeProps and DotProps, excluding 'size', 'color', and 'variant'.
   *
   * @memberof CornerIndicatorProps
   */
  indicatorProps?: Omit<BadgeProps, 'size' | 'color' | 'variant'> & Omit<DotProps, 'size' | 'color' | 'pulse'>;
}

/**
 * **Parity Corner Indicator**
 *
 *  @see {@link https://beta-parity-react.vercel.app/corner-indicator Parity Corner Indicator}
 */
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
      xOffset = 0,
      yOffset = 0,
      position = 'top-right',
      growDirection = 'symmetric',
      color = 'gray',
      size = 'md',
      variant = 'solid',
      style,
      indicatorProps,
      ...props
    },
    ref
  ) => {
    const addedXOffset = xOffset || translateXOriginMap[growDirection].xOffset;
    const addedYOffset = yOffset;

    const offsetValue = {
      '--par-x-offset': `${offset + (growDirection === 'outward' ? -addedXOffset : addedXOffset)}px`,
      '--par-y-offset': `${offset + addedYOffset}px`
    } as React.CSSProperties;

    const translateXOrigin = {
      '--par-x-origin': `${translateXOriginMap[growDirection].translatePercent}`
    } as React.CSSProperties;

    if (disable) return children;

    return (
      <div
        className={classNames('corner-indicator-container', { bordered: outline }, className, position)}
        ref={ref}
        style={{ ...offsetValue, ...translateXOrigin, ...style }}
        {...props}
      >
        {!label ? (
          <Dot pulse={pulse} size={sizetoDotSize[size] as any} color={color} {...indicatorProps} />
        ) : (
          <Badge
            label={label}
            icon={icon}
            color={color}
            size={sizetoBadgeSize[size] as any}
            variant={variant}
            {...indicatorProps}
          />
        )}
        {children}
      </div>
    );
  }
);

CornerIndicator.displayName = 'CornerIndicator';
