'use client';

import React from 'react';
import classNames from 'classnames';
import './index.css';
import './variables.css';
import { InlineLink, InlineLinkProps } from '../InlineLink';
import { Menu, MenuItem, MenuProps } from '../Menu';

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLUListElement> {
  separator?: 'chevron' | 'dash' | 'slash';
  breadcrumbList?: BreadcrumbItemProps[];
  limit?: number;
  menuProps?: Omit<MenuProps, 'children'>;
}

export const Breadcrumb = React.forwardRef<
  HTMLUListElement,
  BreadcrumbProps & Pick<InlineLinkProps, 'size' | 'color' | 'disabled' | 'underline' | 'iconOnly'>
>(({ className, children, separator = 'chevron', breadcrumbList, limit, menuProps, ...props }, ref) => {
  const liList = breadcrumbList ?? ([] as BreadcrumbItemProps[]);

  if (!breadcrumbList || breadcrumbList.length <= 0) {
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        liList.push({
          ...child.props
        });
      }
    });
  }

  if (liList.length === 0) return null;

  const lastItem = liList[liList.length - 1];
  const firstItem = liList[0];
  const menuItems = liList.slice(0, liList.length - 1);

  return (
    <ul className={classNames('breadcrumb', className, separator)} ref={ref} {...props}>
      {limit ? (
        <>
          <BreadcrumbItem {...firstItem} />
          <BreadcrumbMenu items={menuItems} menuProps={menuProps} />
          <BreadcrumbActive item={lastItem} />
        </>
      ) : (
        <>
          <BreadcrumbItem {...firstItem} />
          {menuItems.map((item, index) => {
            const key = index.toString() + (item.href ?? Date.now()).toString();
            return <BreadcrumbItem {...item} key={key} />;
          })}
          <BreadcrumbActive item={lastItem} />
        </>
      )}
    </ul>
  );
});

Breadcrumb.displayName = 'Breadcrumb';

export interface BreadcrumbItemProps extends InlineLinkProps {}

export const BreadcrumbItem = React.forwardRef<HTMLAnchorElement, BreadcrumbItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <li className={classNames('breadcrumb-item')}>
        <InlineLink ref={ref} {...props}>
          {children}
        </InlineLink>
      </li>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

export interface BreadcrumbMenuProps extends React.HTMLAttributes<HTMLButtonElement> {
  items: BreadcrumbItemProps[];
  menuProps?: Omit<MenuProps, 'children'>;
}

export const BreadcrumbMenu = React.forwardRef<HTMLButtonElement, BreadcrumbMenuProps>(
  ({ className, items, menuProps, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    return (
      <>
        <button
          ref={buttonRef}
          className={classNames('breadcrumb-item', className)}
          onClick={() => setOpen((pre) => !pre)}
          {...props}
        >
          . . .
        </button>
        <Menu anchor={buttonRef.current as any} className='breadcrumb-menu' isOpen={open} {...menuProps}>
          {items.map((item, index) => (
            <MenuItem key={item.href ?? Date.now() + index}>
              <BreadcrumbItem {...item} />
            </MenuItem>
            // <BreadcrumbItem key={item.href ?? Date.now() + index} {...item} />
          ))}
        </Menu>
      </>
    );
  }
);

BreadcrumbMenu.displayName = 'BreadcrumbMenu';

export interface BreadcrumbActiveProps extends React.HTMLAttributes<HTMLLIElement> {
  item: BreadcrumbItemProps;
}

export const BreadcrumbActive = React.forwardRef<HTMLLIElement, BreadcrumbActiveProps>(
  ({ className, item, ...props }, ref) => {
    return (
      <li className={classNames('breadcrumb-item breadcrumb-active', className)} ref={ref} {...props}>
        {item.children}
      </li>
    );
  }
);

BreadcrumbActive.displayName = 'BreadcrumbActive';
