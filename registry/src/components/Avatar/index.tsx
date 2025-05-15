import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { CornerIndicator } from '../CornerIndicator';

import './index.css';
import './variables.css';

// =========================
// Avatar
// =========================
// Declare and export Avatar type and Avatar component

const sizeMap = {
  '2extra-small': '2xs',
  'extra-small': 'xs',
  small: 'sm',
  medium: 'md',
  large: 'lg',
  'extra-large': 'xl'
} as const;

export type AvatarSize = keyof typeof sizeMap;

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
    type?: 'dot' | 'border' | 'badge';

    /**
     * Color of the status indicator.
     */
    color: 'gray' | 'orange' | 'violet' | 'green' | 'red' | 'yellow' | 'blue' | 'lime' | 'cyan';

    /**
     * Whether the status indicator should pulse.
     *
     * @default false
     */
    pulse?: boolean;

    /**
     * Size of the status indicator.
     *
     * @default 'md'
     */
    size?: 'xs' | 'sm' | 'md' | 'lg';

    /**
     * Optional label for badge status type.
     */
    label?: string;

    /**
     * Optional icon for badge status type.
     */
    icon?: React.ReactNode;

    /**
     * Position of the indicator.
     *
     * @default 'bottom-right'
     */
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

    /**
     * Offset for the indicator from the edge.
     *
     * @default 0
     */
    offset?: number;
  };

  /**
   * Border style for the avatar.
   * 'default' uses the border color defined in variables.css.
   * 'alternative' uses the alternative border color defined in variables.css.
   * 'none' removes the border.
   *
   * @default 'default'
   * @memberof AvatarProps
   */
  borderStyle?: 'default' | 'alternative' | 'none';
}

/**
 * **Parity Avatar**.
 *
 * @see {@link http://localhost:3005/avatar Parity Avatar}
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt,
      initials,
      size = 'medium',
      disabled = false,
      status,
      borderStyle = 'default',
      style,
      ...props
    },
    ref
  ) => {
    const [imgError, setImgError] = React.useState(false);

    const handleImgError = () => {
      setImgError(true);
    };

    const avatarContent =
      src && !imgError ? (
        <Image
          src={src}
          alt={alt || ''}
          onError={handleImgError}
          className='avatar-img'
          width={100}
          height={100}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      ) : initials ? (
        <span className='avatar-initials'>{initials}</span>
      ) : (
        <span className='avatar-placeholder' aria-hidden='true'>
          <svg viewBox='0 0 128 128' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M103 102.139C93.094 111.92 79.3994 118 64.1641 118C48.9287 118 35.2339 111.92 25.3281 102.139C26.9542 95.1136 31.7734 89.0087 38.6641 85.2919C45.0748 81.8501 52.995 80 64 80C75.005 80 82.9253 81.8501 89.336 85.2919C96.2267 89.0087 101.046 95.1136 103 102.139ZM64 99C77.2548 99 88 88.2548 88 75C88 61.7452 77.2548 51 64 51C50.7452 51 40 61.7452 40 75C40 88.2548 50.7452 99 64 99Z'
            />
          </svg>
        </span>
      );

    // Use border status type if specified
    if (status?.type === 'border') {
      return (
        <div
          className={classNames(
            'avatar',
            sizeMap[size],
            {
              disabled,
              'border-alternative': borderStyle === 'alternative',
              'border-none': borderStyle === 'none',
              'status-border': true
            },
            className
          )}
          ref={ref}
          style={
            status?.type === 'border'
              ? {
                  ['--avatar-status-color' as any]: `var(--par-color-bg-dot-solid-${status.color})`,
                  ...style
                }
              : style
          }
          data-status-color={status.color}
          {...props}
        >
          {avatarContent}
        </div>
      );
    }

    // Use CornerIndicator for dot and badge status types
    return status && (status.type === 'dot' || status.type === 'badge' || !status.type) ? (
      <CornerIndicator
        position={status.position || 'bottom-right'}
        color={status.color}
        size={status.size || 'md'}
        pulse={status.pulse}
        offset={status.offset || -6}
        label={status.type === 'badge' ? status.label : undefined}
        icon={status.type === 'badge' ? status.icon : undefined}
        outline={status.type === 'badge' ? false : true}
      >
        <div
          className={classNames(
            'avatar',
            sizeMap[size],
            {
              disabled,
              'border-alternative': borderStyle === 'alternative',
              'border-none': borderStyle === 'none'
            },
            className
          )}
          ref={ref}
          style={style}
          {...props}
        >
          {avatarContent}
        </div>
      </CornerIndicator>
    ) : (
      <div
        className={classNames(
          'avatar',
          sizeMap[size],
          {
            disabled,
            'border-alternative': borderStyle === 'alternative',
            'border-none': borderStyle === 'none'
          },
          className
        )}
        ref={ref}
        style={style}
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
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
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
  borderStyle?: 'default' | 'alternative' | 'none';

  /**
   * Function to render a custom overflow indicator.
   *
   * @memberof AvatarGroupProps
   */
  renderOverflow?: (overflowCount: number) => React.ReactNode;

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
 * @see {@link http://localhost:3005/avatar Parity AvatarGroup}
 */
export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      children,
      className,
      max = 5,
      direction = 'row',
      spacing = '-0.5rem',
      size = 'medium',
      borderStyle = 'default',
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
              borderStyle: (child as React.ReactElement<AvatarProps>).props.borderStyle || borderStyle,
              className: classNames((child as React.ReactElement<AvatarProps>).props.className, 'avatar-group-item')
            });
          }
          return child;
        })}

        {overflowCount > 0 &&
          (renderOverflow ? (
            renderOverflow(overflowCount)
          ) : (
            <Avatar
              size={size}
              borderStyle={borderStyle}
              className='avatar-group-item avatar-group-overflow'
              onClick={onOverflowClick}
            >
              <span className='avatar-overflow-text'>+{overflowCount}</span>
            </Avatar>
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
   * Callback triggered when the avatar is clicked.
   *
   * @memberof AvatarTriggerProps
   */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;

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
 * @see {@link http://localhost:3005/avatar Parity AvatarTrigger}
 */
export const AvatarTrigger = React.forwardRef<HTMLDivElement, AvatarTriggerProps>(
  ({ className, active = false, onClick, ...props }, ref) => {
    return (
      <Avatar ref={ref} className={classNames('avatar-trigger', { active }, className)} onClick={onClick} {...props} />
    );
  }
);

AvatarTrigger.displayName = 'AvatarTrigger';
