import React from 'react';
import classNames from 'classnames';
import './index.css';
import './variables.css';

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'md' | 'sm' | 'xs';
  separator?: 'dash' | 'slash';
}

export const Breadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbProps>(
  ({ className, children, size = 'md', separator = 'dash', ...props }, ref) => {
    return (
      <div className={classNames('breadcrumb', className, size, separator)} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'md' | 'sm' | 'xs';
  seperator?: 'dash' | 'slash';
}

export const BreadcrumbItem = React.forwardRef<HTMLSpanElement, BreadcrumbItemProps>(
  ({ className, children, color = 'gray', size = 'md', ...props }, ref) => {
    return (
      <span className={classNames('breadcrumb-item', className, color, size)} ref={ref} {...props}>
        {children}
      </span>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';
