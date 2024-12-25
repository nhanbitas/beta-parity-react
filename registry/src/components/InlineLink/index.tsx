import React from 'react';
import classNames from 'classnames';
import './index.css';
import './variables.css';

const colorMap = {
  neutral: 'neutral',
  standard: 'standard'
} as const;

const sizeMap = {
  sm: 'small',
  md: 'medium',
  lg: 'large'
} as const;

const underlineClassMap = {
  always: 'underline-always',
  hover: 'underline-hover',
  none: 'underline-none'
} as const;

export interface InlineLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Defines the color of the link. It should correspond to a key in the `colorMap` object.
   * Default: `standard`.
   *
   * @memberof InlineLink
   */
  color?: keyof typeof colorMap;

  /**
   * Defines the size of the link. It should correspond to a key in the `sizeMap` object.
   * Default: `medium`.
   *
   * @memberof InlineLink
   */
  size?: keyof typeof sizeMap;

  /**
   * Specifies the underline behavior for the link.
   * - `always`: The link is always underlined.
   * - `hover`: The underline is displayed only on hover.
   * - `none`: No underline is displayed.
   *
   * @memberof InlineLink
   */
  underline?: 'always' | 'hover' | 'none';

  /**
   * If true, the link will display an icon without accompanying text.
   *
   * @memberof InlineLink
   */
  iconOnly?: boolean;

  /**
   * If true, the link will be disabled and non-interactive.
   *
   * @memberof InlineLink
   */
  disabled?: boolean;

  /**
   * If true, the component will render as its child element, inheriting the behavior and appearance of the child element.
   *
   * Useful for customizing the rendered element while preserving the intended features.
   *
   * @memberof InlineLink
   */
  asChild?: boolean;
}

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
      href = '#',
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

    const acessibilityProps = {
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
            ...acessibilityProps,
            ...props
          });
        }
        return child;
      });
    }

    return (
      <a className={inlineLinkClasses} ref={ref} href={availableHref} {...acessibilityProps} {...props}>
        {children}
      </a>
    );
  }
);

InlineLink.displayName = 'InlineLink';
