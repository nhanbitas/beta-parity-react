import React from 'react';
import classNames from 'classnames';
import './index.css';
import './variables.css';

const colorMap: Record<'neutral' | 'standard', string> = {
  neutral: 'neutral',
  standard: 'standard'
} as const;

const sizeMap: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'small',
  md: 'medium',
  lg: 'large'
} as const;

const underlineClassMap: Record<'always' | 'hover' | 'none', string> = {
  always: 'underline-always',
  hover: 'underline-hover',
  none: 'underline-none'
} as const;

/**
 * Props for the InlineLink component.
 *
 * Extends properties from the `a` element.
 */
export interface InlineLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Defines the color of the link. It should correspond to a key in the `colorMap` object.
   *
   * @default 'standard'
   * @memberof InlineLink
   */
  color?: keyof typeof colorMap;

  /**
   * Defines the size of the link. It should correspond to a key in the `sizeMap` object.
   *
   * @default 'md'
   * @memberof InlineLink
   */
  size?: keyof typeof sizeMap;

  /**
   * Specifies the underline behavior for the link.
   * - `always`: The link is always underlined.
   * - `hover`: The underline is displayed only on hover.
   * - `none`: No underline is displayed.
   *
   * @default 'hover'
   * @memberof InlineLink
   */
  underline?: 'always' | 'hover' | 'none';

  /**
   * If true, the link will display an icon without accompanying text.
   *
   * @default false
   * @memberof InlineLink
   */
  iconOnly?: boolean;

  /**
   * If true, the link will be disabled and non-interactive.
   *
   * @default false
   * @memberof InlineLink
   */
  disabled?: boolean;

  /**
   * If true, the component will render as its child element, inheriting the behavior and appearance of the child element.
   *
   * Useful for customizing the rendered element while preserving the intended features.
   *
   * @default false
   * @memberof InlineLink
   */
  asChild?: boolean;
}

/**
 * **Parity Inline Link**.
 *
 *  @see {@link http://localhost:3005/inline-link Parity Inline Link}
 */
export const InlineLink = React.forwardRef<HTMLAnchorElement, InlineLinkProps>(
  (
    {
      className,
      children,
      color = 'standard',
      size = 'md',
      underline = 'hover',
      iconOnly = false,
      disabled,
      href,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const inlineLinkClasses = classNames(
      'inline-link',
      className,
      colorMap[color],
      sizeMap[size],
      underlineClassMap[underline],
      {
        'icon-only': iconOnly,
        disabled: disabled
      }
    );

    const accessibilityProps = {
      'aria-disabled': disabled,
      tabIndex: disabled ? -1 : 0
    };

    const availableHref = disabled ? undefined : href;

    if (asChild) {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            className: classNames(child.props.className, inlineLinkClasses),
            ...accessibilityProps,
            ...props
          });
        }
        return child;
      });
    }

    return (
      <a className={inlineLinkClasses} ref={ref} href={availableHref} {...accessibilityProps} {...props}>
        {children}
      </a>
    );
  }
);

InlineLink.displayName = 'InlineLink';
