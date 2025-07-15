/* eslint-disable @next/next/no-img-element */
import React from 'react';
import classNames from 'classnames';

import './index.css';
import './variables.css';

import { Dot } from '../Dot';
import { UserRound } from 'lucide-react';

// =========================
// Avatar
// =========================
// Declare and export Avatar type and Avatar component

const sizeAvatarMap = {
  xxs: 'xxs',
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl'
} as const;

const sizeAvatarToDot = {
  xxs: 'xs',
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl'
} as const;

export type borderStyle = 'default' | 'alternative' | 'none' | 'inherit';

export type AvatarSize = keyof typeof sizeAvatarMap;

/**
 * Props for the Avatar component.
 *
 * Extends properties from the `div` element.
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The URL of the image to display.
   *
   * @memberof AvatarProps
   */
  src?: string;

  /**
   * Alt text for the image.
   *
   * @memberof AvatarProps
   */
  alt?: string;

  /**
   * The initials to display when no image is available.
   * If not provided and src fails to load, a placeholder icon will be used.
   *
   * @memberof AvatarProps
   */
  initials?: string;

  /**
   * The size of the avatar.
   *
   * @default 'medium'
   * @memberof AvatarProps
   */
  size?: AvatarSize;

  /**
   * Modifies the padding of the avatar frame (the gap between the avatar and the border).
   *
   * Unit is in pixels.
   *
   * @default 1
   * @memberof AvatarProps
   */
  framePadding?: number;

  /**
   * Whether the avatar should be disabled.
   *
   * @default false
   * @memberof AvatarProps
   */
  disabled?: boolean;

  /**
   * The status to display in the avatar. Can be a dot or a border.
   *
   * @memberof AvatarProps
   */
  status?: {
    /**
     * Type of indicator to show status.
     *
     * @default 'dot'
     */
    type?: 'dot' | 'border';

    /**
     * Color of the status indicator.
     *
     * @default 'gray'
     */
    color?: 'gray' | 'green' | 'red' | 'yellow';

    /**
     * Whether the status indicator should pulse.
     *
     * @default false
     */
    pulse?: boolean;

    /**
     * Border style for the avatar.
     * 'default' uses the border color.
     * 'alternative' uses the alternative border color.
     * 'none' removes the border.
     *
     * @default 'default'
     * @memberof AvatarProps
     */
    borderStyle?: borderStyle;
  };

  /**
   * Custom styles for the wrapper element of the avatar.
   *
   * @memberof AvatarProps
   */
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
}

/**
 * **Parity Avatar**.
 *
 * @see {@link https://beta-parity-react.vercel.app/avatar Parity Avatar}
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt,
      initials,
      size = 'md',
      disabled = false,
      framePadding = 1,
      status: statusProp,
      style,
      children,
      wrapperProps,
      ...props
    },
    ref
  ) => {
    const status = {
      type: 'border',
      color: undefined,
      pulse: false,
      borderStyle: 'default',
      ...statusProp
    } as AvatarProps['status'];

    const [imgError, setImgError] = React.useState(false);

    const handleImgError = () => {
      setImgError(true);
    };

    const avatarContent = children ? (
      <div className='avatar-img'>{children}</div>
    ) : src && !imgError ? (
      <img
        src={src}
        alt={alt || ''}
        onError={handleImgError}
        className='avatar-img'
        style={{ objectFit: 'cover', width: '100%', height: '100%', ...style }}
      />
    ) : initials ? (
      <span className='avatar-initials'>{initials}</span>
    ) : (
      <span className='avatar-placeholder' aria-hidden='true'>
        <UserRound className='avatar-placeholder-icon' />
      </span>
    );

    // Use border status type if specified
    if (status?.type === 'border') {
      const hasColor = !!status.color;
      const isHasGapFrame = status.borderStyle === 'inherit' || hasColor;
      const showBorder = !['none', 'inherit'].includes(status.borderStyle || '');

      const borderStyleVars = hasColor
        ? {
            ['--par-avatar-status-color' as any]: `var(--par-color-border-avatar-${status.color})`
          }
        : {};

      const frameGap = isHasGapFrame ? `${framePadding}px` : '0px';

      return (
        <div {...wrapperProps} className={classNames('avatar-wrapper', wrapperProps?.className)}>
          {/* Border layer */}
          {showBorder && (
            <div
              className={classNames('avatar-border', {
                'border-alternative': status.borderStyle === 'alternative',
                'status-border': hasColor,
                pulse: status.pulse
              })}
              style={{ ...borderStyleVars }}
              data-status-color={status.color}
            />
          )}

          {/* Avatar frame */}
          <div
            className={classNames('avatar-frame', sizeAvatarMap[size as AvatarSize])}
            style={{ ['--avatar-frame-gap' as any]: frameGap }}
          >
            {/* Main avatar content */}
            <div
              className={classNames('avatar', sizeAvatarMap[size as AvatarSize], { disabled }, className)}
              ref={ref}
              {...props}
            >
              {avatarContent}
            </div>
          </div>
        </div>
      );
    }

    // Use CornerIndicator for dot status types
    if (status && (status.type === 'dot' || !status.type)) {
      return (
        <div {...wrapperProps} className={classNames('avatar-wrapper', wrapperProps?.className)}>
          {/* Avatar frame */}
          <div className={classNames('avatar-frame', sizeAvatarMap[size as AvatarSize])}>
            {/* Main avatar content */}
            <div
              className={classNames('avatar', sizeAvatarMap[size as AvatarSize], { disabled }, className)}
              ref={ref}
              style={style}
              {...props}
            >
              {avatarContent}
            </div>
          </div>

          {/* Status dot */}
          <div className='avatar-dot-wrapper'>
            {/* Dot border layer */}
            <div
              className={classNames('avatar-dot-border', {
                'border-alternative': status.borderStyle === 'alternative'
              })}
            />

            {/* Dot frame */}
            {status.borderStyle === 'inherit' && <div className={classNames('avatar-dot-frame')} />}

            {/* dot */}
            {status.type === 'dot' && (
              <Dot className='avatar-dot' color={status.color} size={sizeAvatarToDot[size]} pulse={status.pulse} />
            )}
          </div>
        </div>
      );
    }

    return (
      <div
        className={classNames('avatar', sizeAvatarMap[size as AvatarSize], { disabled }, className)}
        ref={ref}
        {...props}
      >
        {avatarContent}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

/**
 * Props for the AvatarGroup component.
 */
export interface AvatarGroupProps extends Pick<AvatarProps, 'framePadding'>, React.HTMLAttributes<HTMLDivElement> {
  /**
   * The maximum number of avatars to display before showing a "+X" overflow avatar.
   *
   * @default 5
   * @memberof AvatarGroupProps
   */
  max?: number;

  /**
   * The direction to stack avatars. 'row' stacks horizontally, 'column' stacks vertically.
   *
   * @default 'row'
   * @memberof AvatarGroupProps
   */
  direction?: 'row' | 'column';

  /**
   * The spacing between avatars.
   *
   * @default '-0.5rem'
   * @memberof AvatarGroupProps
   */
  spacing?: string;

  /**
   * Size for all avatars in the group.
   *
   * @default 'medium'
   * @memberof AvatarGroupProps
   */
  size?: AvatarSize;

  /**
   * Border style for all avatars in the group.
   *
   * @default 'default'
   * @memberof AvatarGroupProps
   */
  borderStyle?: borderStyle;

  /**
   * Function to render a custom overflow indicator.
   *
   * @memberof AvatarGroupProps
   */
  renderOverflow?: (overflowCount: number, hiddenAvatars: React.ReactNode[]) => React.ReactNode;

  /**
   * Handler for when the overflow avatar is clicked.
   *
   * @memberof AvatarGroupProps
   */
  onOverflowClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * **Parity AvatarGroup**.
 *
 * @see {@link https://parity-react.vercel.app/avatar Parity AvatarGroup}
 */
export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      children,
      className,
      max = 5,
      direction = 'row',
      spacing = '-0.5rem',
      size = 'md',
      borderStyle = 'default',
      framePadding,
      renderOverflow,
      onOverflowClick,
      style,
      ...props
    },
    ref
  ) => {
    const childrenArray = React.Children.toArray(children);
    const totalAvatars = childrenArray.length;
    const visibleAvatars = max ? childrenArray.slice(0, max) : childrenArray;
    const hiddenAvatars = childrenArray.slice(max || 0, totalAvatars);
    const overflowCount = Math.max(0, totalAvatars - (max || 0));

    const groupStyle = {
      '--avatar-group-spacing': spacing,
      ...style
    } as React.CSSProperties;

    return (
      <div
        className={classNames('avatar-group', `direction-${direction}`, className)}
        style={groupStyle}
        ref={ref}
        {...props}
      >
        {visibleAvatars.map((child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<AvatarProps>, {
              key: index,
              size: (child as React.ReactElement<AvatarProps>).props.size || size,
              framePadding: framePadding,
              status:
                (child as React.ReactElement<AvatarProps>).props.status ||
                ({
                  borderStyle: borderStyle
                } as AvatarProps['status']),
              wrapperProps: {
                className: classNames((child as React.ReactElement<AvatarProps>).props.className, 'avatar-group-item')
              }
            });
          }
          return child;
        })}

        {overflowCount > 0 &&
          (renderOverflow ? (
            renderOverflow(overflowCount, hiddenAvatars)
          ) : (
            <AvatarTrigger
              size={size}
              status={{ type: 'border', pulse: false, borderStyle }}
              className='avatar-group-overflow'
              onClick={onOverflowClick}
              initials={`+${overflowCount}`}
              framePadding={framePadding}
              wrapperProps={{ className: 'avatar-group-item' }}
            />
          ))}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

// =========================
// AvatarTrigger
// =========================

/**
 * Props for the AvatarTrigger component.
 *
 * Extends properties from the `AvatarProps`.
 */
export interface AvatarTriggerProps extends AvatarProps {
  /**
   * Whether the trigger is active.
   *
   * @default false
   * @memberof AvatarTriggerProps
   */
  active?: boolean;
}

/**
 * **Parity AvatarTrigger**.
 *
 * @see {@link https://parity-react.vercel.app/avatar Parity AvatarTrigger}
 */
export const AvatarTrigger = React.forwardRef<HTMLDivElement, AvatarTriggerProps>(
  ({ className, active = false, ...props }, ref) => {
    return <Avatar tabIndex={0} ref={ref} className={classNames('avatar-trigger', { active }, className)} {...props} />;
  }
);

AvatarTrigger.displayName = 'AvatarTrigger';
