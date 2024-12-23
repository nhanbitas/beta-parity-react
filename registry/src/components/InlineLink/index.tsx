'use client';

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
  color?: keyof typeof colorMap;
  size?: keyof typeof sizeMap;
  underline?: 'always' | 'hover' | 'none';
  iconOnly?: boolean;
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
      href = '#',
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
        'icon-only': iconOnly
      }
    );

    return (
      <a className={inlineLinkClasses} ref={ref} href={href} {...props}>
        {children}
      </a>
    );
  }
);

InlineLink.displayName = 'InlineLink';
