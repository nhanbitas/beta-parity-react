import React from 'react';
import classNames from 'classnames';

import './index.css';
import './variables.css';

import { InlineLink, InlineLinkProps } from '../InlineLink';
import { Menu, MenuProps } from '../Menu';
import { useOutsideClick } from '../hooks/useOutsideClick';
import useCombinedRefs from '../hooks/useCombinedRefs';

// =========================
// Breadcrumb
// =========================
// Declare and export select type and Breadcrumb component

/**
 * Props for the Breadcrumb component.
 *
 * Extends properties from the `ul` element.
 */
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Specifies the separator style to use between breadcrumb items.
   * - `'chevron'`: Uses a chevron (e.g., `>`).
   * - `'dash'`: Uses a dash (e.g., `-`).
   * - `'slash'`: Uses a slash (e.g., `/`).
   *
   * @default 'chevron'
   * @memberof Breadcrumb
   *
   */
  separator?: 'chevron' | 'dash' | 'slash';

  /**
   * An array of breadcrumb items to render in the breadcrumb trail.
   * Each item should conform to the `BreadcrumbItemProps` interface.
   *
   * If the breadcrumbList is not empty, the component will be prioritized over other components.
   *
   * @memberof Breadcrumb
   */
  breadcrumbList?: BreadcrumbItemProps[];

  /**
   * Limits the number of visible breadcrumb items. If the number of items exceeds this value,
   * a truncation mechanism will be applied (e.g., showing a menu for overflowed items).
   *
   * @default 'undefined' -> infinite
   * @memberof Breadcrumb
   */
  limit?: number;

  /**
   * Additional properties for the overflow menu when the breadcrumb items exceed the limit.
   * This excludes the `children` property, which is managed internally.
   *
   * @memberof Breadcrumb
   */
  menuProps?: Omit<MenuProps, 'children'>;
}

/**
 * **Parity Breadcrumb**.
 *
 *  @see {@link http://localhost:3005/breadcrumb Parity Breadcrumb}
 */

export const Breadcrumb = React.forwardRef<
  HTMLUListElement,
  BreadcrumbProps & Pick<InlineLinkProps, 'size' | 'color' | 'disabled' | 'underline' | 'iconOnly'>
>(({ className, children, separator = 'chevron', breadcrumbList, limit, menuProps, ...props }, ref) => {
  let liList = breadcrumbList ?? ([] as BreadcrumbItemProps[]);

  if (!breadcrumbList || breadcrumbList.length <= 0) {
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === BreadcrumbItem) {
        liList.push({
          ...child.props,
          size: props.size ?? 'md',
          color: props.color ?? 'standard',
          disabled: props.disabled ?? false,
          underline: props.underline ?? 'hover',
          iconOnly: props.iconOnly ?? false
        });
      }
    });
  } else {
    liList = liList.map((item) => {
      return {
        ...item,
        size: props.size ?? 'md',
        color: props.color ?? 'standard',
        disabled: props.disabled ?? false,
        underline: props.underline ?? 'hover',
        iconOnly: props.iconOnly ?? false
      };
    });
  }

  if (liList.length === 0) return null;

  const lastItem = liList[liList.length - 1];
  const firstItem = liList[0];
  const menuItems = liList.slice(1, liList.length - 1);

  const accessibility = {
    'aria-label': 'Breadcrumb'
  };

  return (
    <nav className={classNames('breadcrumb', className, separator)} ref={ref} {...props} {...accessibility}>
      <ol>
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
      </ol>
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';

// =========================
// BreadcrumbItem
// =========================
// Declare and export select type and BreadcrumbItem component

/**
 * Props for the BreadcrumbItem component.
 *
 * Extends properties from the `a` element.
 */
export interface BreadcrumbItemProps extends InlineLinkProps {
  isMenuItem?: boolean;
}

/**
 * **Parity BreadcrumbItem**.
 *
 *  @see {@link http://localhost:3005/breadcrumb Parity BreadcrumbItem}
 */
export const BreadcrumbItem = React.forwardRef<HTMLAnchorElement, BreadcrumbItemProps>(
  ({ children, isMenuItem = false, ...props }, ref) => {
    const menuProps = {
      ...(isMenuItem && {
        role: 'menuitem',
        underline: 'none' as const
      })
    };

    return (
      <li className={classNames('breadcrumb-item')}>
        <InlineLink ref={ref} {...props} {...menuProps}>
          {children}
        </InlineLink>
      </li>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

// =========================
// BreadcrumbMenu
// =========================
// Declare and export select type and BreadcrumbMenu component

/**
 * Props for the BreadcrumbMenu component.
 *
 * Extends properties from the `button` element.
 */
export interface BreadcrumbMenuProps extends React.HTMLAttributes<HTMLButtonElement> {
  items: BreadcrumbItemProps[];
  menuProps?: Omit<MenuProps, 'children'>;
}

/**
 * **Parity BreadcrumbMenu**.
 *
 *  @see {@link http://localhost:3005/breadcrumb Parity BreadcrumbMenu}
 */
export const BreadcrumbMenu = React.forwardRef<HTMLButtonElement, BreadcrumbMenuProps>(
  ({ className, items, menuProps, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);

    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const conbineButtonRef = useCombinedRefs(buttonRef, ref);

    const refOutsideClick = useOutsideClick(() => setOpen(false), ['click', 'touchstart']);

    React.useEffect(() => {
      const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false);
          conbineButtonRef.current?.focus();
        }
      };

      window.addEventListener('keydown', handleGlobalKeyDown);
      return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [conbineButtonRef.current]);

    return (
      <>
        <button
          ref={conbineButtonRef}
          className={classNames('breadcrumb-item', className)}
          onClick={() => setOpen(true)}
          {...props}
        >
          . . .
        </button>

        <Menu
          {...menuProps}
          ref={refOutsideClick}
          anchor={buttonRef.current as any}
          className='breadcrumb-menu'
          isOpen={open}
        >
          {items.map((item, index) => (
            <BreadcrumbItem className='menu-item' key={index} {...item} isMenuItem />
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
        <span>{item.children}</span>
      </li>
    );
  }
);

BreadcrumbActive.displayName = 'BreadcrumbActive';
