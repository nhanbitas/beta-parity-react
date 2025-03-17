import * as React from 'react';
import classNames from 'classnames';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import './index.css';
import './variables.css';

import { Menu, MenuProps } from '../Menu';
import { useOutsideClick } from '../hooks/useOutsideClick';
import useCombinedRefs from '../hooks/useCombinedRefs';
import useDidMountEffect from '../hooks/useDidMountEffect';
import { deepMerge } from '../utils';

export type controlType = {
  className?: string;
  isActive?: boolean;
  icon?: React.ReactNode;
};

export type controlConfigType = {
  first?: controlType;
  last?: controlType;
  prev?: controlType;
  next?: controlType;
};

const defaultControlConfig = {
  first: { icon: <ChevronsLeft />, isActive: true, className: '' },
  last: { icon: <ChevronsRight />, isActive: true, className: '' },
  prev: { icon: <ChevronLeft />, isActive: true, className: '' },
  next: { icon: <ChevronRight />, isActive: true, className: '' }
} as const;

// Combination rules of total page and siblings
const totalPageOfSiblingRules = [5, 7, 9, 12] as const;

// =========================
// Pagination
// =========================
// Declare and export select type and Pagination component

/**
 * Props for the Pagination component.
 *
 */
export interface PaginationProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * The total number of pages.
   *
   * @default 0
   */
  totalPage: number;

  /**
   * The current active page.
   *
   * @default undefined
   */
  page: 1;

  /**
   * Whether the pagination component should have a border.
   *
   * @default false
   */
  bordered?: boolean;

  /**
   * If true, only navigation controls are shown, without page numbers.
   *
   * @default false
   */
  onlyControl?: boolean;

  /**
   * Configuration for the pagination controls (first, previous, next, last).
   *
   * @default undefined
   * @see controlConfigType
   */
  controlConfig?: controlConfigType;

  /**
   * Defines the color theme of the pagination component.
   *
   * @default "neutral"
   */
  color?: 'neutral' | 'accent';

  /**
   * The number of sibling page numbers to display around the current page.
   *
   * @default 0
   */
  siblings?: 0 | 1 | 2 | 3;

  /**
   * Callback function triggered when the page changes.
   *
   * @param {number} page - The new page number.
   */
  onPageChange?: (page: number) => void;

  /**
   * The type of component used for page links.
   *
   * @default "button"
   */
  component?: 'button' | 'a' | React.ComponentType;

  /**
   * Additional props to pass to the component (pagination item).
   *
   * @default undefined
   */
  componentProps?: Record<string, any>;

  /**
   * Function to generate the URL for a given page.
   *
   * @param {number} page - The page number.
   * @returns {string} The URL for the given page.
   */
  to?: (page: number) => string;
}

/**
 * **Parity Pagination**.
 *
 * @see {@link http://localhost:3005/pagination Parity Pagination}
 */
export const Pagination = React.forwardRef<HTMLUListElement, PaginationProps>(
  (
    {
      className,
      totalPage = 0,
      siblings = 0,
      page = 1,
      bordered = false,
      onlyControl = false,
      color = 'neutral',
      component: Component = 'button',
      componentProps,
      controlConfig = defaultControlConfig,
      onPageChange,
      to: generateHref,
      ...props
    },
    ref
  ) => {
    const paginationRef = React.useRef<HTMLUListElement>(null);
    const combinedRef = useCombinedRefs(paginationRef, ref);
    const pageRefs = React.useRef<(HTMLElement | null)[]>([]);
    const [currentPage, setCurrentPage] = React.useState<number>(page);

    // Overwrite new control configs
    const updatedControlConfig = deepMerge(
      defaultControlConfig as controlConfigType,
      controlConfig as controlConfigType
    );

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      onPageChange?.(page);
    };

    // Define action when clicking to controls
    const handleControlClick = (type: 'prev' | 'next' | 'start' | 'end') => {
      switch (type) {
        case 'prev':
          if (currentPage > 1) handlePageChange(currentPage - 1);
          break;
        case 'next':
          if (currentPage < totalPage) handlePageChange(currentPage + 1);
          break;
        case 'start':
          handlePageChange(1);
          break;
        case 'end':
          handlePageChange(totalPage);
          break;
      }
    };

    // Define all props for ControlButtons
    const controlProps = {
      start: {
        className: classNames('pagination-start', updatedControlConfig?.first?.className),
        onClick: () => handleControlClick('start'),
        disabled: currentPage === 1,
        'aria-label': 'Go to First Page',
        children: updatedControlConfig?.first?.icon,
        ...(Component !== 'button' && { href: generateHref?.(1) || '#' })
      },
      prev: {
        className: classNames('pagination-prev', updatedControlConfig?.prev?.className),
        onClick: () => handleControlClick('prev'),
        disabled: currentPage === 1,
        'aria-label': 'Go to Previous Page',
        children: updatedControlConfig?.prev?.icon,
        ...(Component !== 'button' && { href: generateHref?.(currentPage - 1) || '#' })
      },
      next: {
        className: classNames('pagination-next', updatedControlConfig?.next?.className),
        onClick: () => handleControlClick('next'),
        disabled: currentPage === totalPage,
        'aria-label': 'Go to Next Page',
        children: updatedControlConfig?.next?.icon,
        ...(Component !== 'button' && { href: generateHref?.(currentPage + 1) || '#' })
      },
      end: {
        className: classNames('pagination-end', updatedControlConfig?.last?.className),
        onClick: () => handleControlClick('end'),
        disabled: currentPage === totalPage,
        'aria-label': 'Go to Last Page',
        children: updatedControlConfig?.last?.icon,
        ...(Component !== 'button' && { href: generateHref?.(totalPage) || '#' })
      }
    };

    // Get middle active, ensure 2 < index < items.length - 3 ( 0 is first => plus 1 for start of array, items.length - 1 is last => minus 1 for end of array)
    const items = Array.from({ length: totalPage }, (_, index) => index + 1);
    const middleIndex = Math.min(items.length - 1 - siblings - 2, Math.max(siblings + 2, currentPage - 1));
    const paginationParts = {
      firstItems: items.slice(0, 1),
      preMenuItems: items.slice(1, middleIndex - siblings),
      preActiveItems: items.slice(middleIndex - siblings, middleIndex),
      middleItems: items[middleIndex] ? [items[middleIndex]] : [],
      postActiveItems: items.slice(middleIndex + 1, middleIndex + 1 + siblings),
      postMenuItems: items.slice(middleIndex + siblings + 1, items.length - 1),
      lastItems: items.slice(-1)
    };

    // Define all props for RenderItems
    const renderProps = {
      currentPage,
      handlePageChange,
      component: Component,
      bordered,
      componentProps,
      generateHref,
      pageRefs
    };

    // If page props is changed, reset current page
    React.useEffect(() => {
      setCurrentPage(page);
    }, [page]);

    // Focus on current page after current page is changed
    useDidMountEffect(() => {
      pageRefs.current[currentPage]?.focus();
    }, [currentPage]);

    // Support keyboard navigation
    // ArrowLeft - set current page to prev page
    // ArrowRight - set current page to next page
    React.useEffect(() => {
      const handleLeftRightKey = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          handleControlClick('prev');
        }
        if (e.key === 'ArrowRight') {
          handleControlClick('next');
        }
      };

      paginationRef.current?.addEventListener('keydown', handleLeftRightKey);

      return () => paginationRef.current?.removeEventListener('keydown', handleLeftRightKey);
    }, [paginationRef.current, handleControlClick]);

    return (
      <ul
        ref={combinedRef}
        className={classNames('pagination', className, color, {
          bordered: bordered,
          'only-control': onlyControl
        })}
        role='navigation'
        {...props}
      >
        {updatedControlConfig.first?.isActive && <ControlButton component={Component} {...controlProps.start} />}

        {updatedControlConfig.prev?.isActive && <ControlButton component={Component} {...controlProps.prev} />}

        {/* onlyControl => null */}
        {/* items.length is not fit with siblings rules => do not show menu */}
        {/* items.length is fit with siblings rules => show menu */}

        {onlyControl ? null : items.length <= totalPageOfSiblingRules[siblings] ? (
          <RenderItem items={items} flag='firstItems' {...renderProps} />
        ) : (
          <>
            <RenderItem items={paginationParts.firstItems} flag='firstItems' {...renderProps} />
            <RenderItem
              items={paginationParts.preMenuItems}
              flag='preMenuItems'
              isMenu={paginationParts.preMenuItems.length > 1}
              {...renderProps}
            />

            <RenderItem items={paginationParts.preActiveItems} flag='preActiveItems' {...renderProps} />
            <RenderItem items={paginationParts.middleItems} flag='middleItems' {...renderProps} />
            <RenderItem items={paginationParts.postActiveItems} flag='postActiveItems' {...renderProps} />

            <RenderItem
              items={paginationParts.postMenuItems}
              flag='postMenuItems'
              isMenu={paginationParts.postMenuItems.length > 1}
              {...renderProps}
            />
            <RenderItem items={paginationParts.lastItems} flag='lastItems' {...renderProps} />
          </>
        )}

        {updatedControlConfig.next?.isActive && <ControlButton component={Component} {...controlProps.next} />}

        {updatedControlConfig.last?.isActive && <ControlButton component={Component} {...controlProps.end} />}
      </ul>
    );
  }
);

Pagination.displayName = 'Pagination';

// =========================
// PaginationItem
// =========================
// Declare and export select type and PaginationItem component

export interface PaginationItemProps extends React.HTMLAttributes<HTMLElement>, Pick<PaginationProps, 'component'> {
  page: number;
  active?: boolean;
  isMenuItem?: boolean;
}

export const PaginationItem = React.forwardRef<HTMLElement, PaginationItemProps>(
  ({ className, component: Component = 'button', page, active = false, isMenuItem = false, ...props }, ref) => {
    const menuProps = {
      ...(isMenuItem && {
        role: 'menuitem'
      })
    };

    return (
      <li>
        <Component
          ref={ref as any}
          aria-label={`${page}`}
          data-page={page}
          className={classNames('pagination-item', className, { active: active })}
          aria-current={active ? 'page' : undefined}
          {...props}
          {...menuProps}
        >
          <span className='pagination-page-number'>{page}</span>
        </Component>
      </li>
    );
  }
);

PaginationItem.displayName = 'PaginationItem';

// =========================
// ControlButton
// =========================
// Declare and export select type and ControlButton component

export interface ControlButtonProps extends React.HTMLAttributes<HTMLElement>, Pick<PaginationProps, 'component'> {
  disabled?: boolean;
}

export const ControlButton = React.forwardRef<HTMLElement, ControlButtonProps>(
  ({ className, component = 'button', children, disabled = false, ...props }, ref) => {
    const Component = disabled ? 'button' : component;
    return (
      <li>
        <Component ref={ref as any} disabled={disabled} className={classNames('pagination-item', className)} {...props}>
          {children}
        </Component>
      </li>
    );
  }
);

ControlButton.displayName = 'ControlButton';

// =========================
// RenderItem
// =========================
// Declare and export select type and RenderItem component

type renderProps = {
  items: number[];
  currentPage: number;
  handlePageChange: (page: number) => void;
  component: 'button' | 'a' | React.ComponentType;
  bordered: boolean;
  componentProps?: any;
  generateHref?: (page: number) => string;
  pageRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  flag?: string;
  isMenu?: boolean;
};

export const RenderItem = React.forwardRef<HTMLElement, renderProps>(
  (
    {
      items,
      currentPage,
      handlePageChange,
      component,
      bordered,
      componentProps,
      generateHref,
      pageRefs,
      flag,
      isMenu = false
    },
    ref
  ) => {
    if (!items || items.length === 0) return null;

    if (isMenu) {
      return (
        <PaginationMenu
          items={items}
          component={component}
          componentProps={componentProps}
          currentPage={currentPage}
          generateHref={generateHref}
          handlePageChange={handlePageChange}
          pageRefs={pageRefs}
          bordered={bordered}
          flag={flag}
        />
      );
    }

    return items.map((item) => {
      const page = item;
      return (
        <React.Fragment key={`page-${flag}-${item}`}>
          <PaginationItem
            ref={(el) => (pageRefs.current[page] = el)}
            component={component}
            page={page}
            active={page === currentPage}
            {...(component !== 'button'
              ? { href: generateHref?.(page) || '#', onClick: () => handlePageChange(page) }
              : { onClick: () => handlePageChange(page) })}
            {...componentProps}
          />
        </React.Fragment>
      );
    });
  }
);

RenderItem.displayName = 'RenderItem';
export interface PaginationMenuProps extends React.HTMLAttributes<HTMLButtonElement>, renderProps {
  menuProps?: Omit<MenuProps, 'children'>;
}

export const PaginationMenu = React.forwardRef<HTMLButtonElement, PaginationMenuProps>(
  (
    {
      className,
      items,
      menuProps,
      component,
      componentProps,
      currentPage,
      generateHref,
      handlePageChange,
      pageRefs,
      bordered,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    const buttonRef = React.useRef<HTMLButtonElement | null>(null);

    const refOutsideClick = useOutsideClick(() => setOpen(false), ['click', 'touchstart']);

    const handleClick = (page: number) => {
      handlePageChange(page);
    };

    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false);
          buttonRef.current?.focus();
        }
      };

      refOutsideClick.current?.addEventListener('keydown', handleEscape);
      return () => refOutsideClick.current?.removeEventListener('keydown', handleEscape);
    }, [refOutsideClick.current]);

    return (
      <>
        <li>
          <button
            ref={buttonRef}
            className={classNames('pagination-item', className, { active: items.includes(currentPage) })}
            onClick={() => setOpen(true)}
            {...props}
          >
            ...
          </button>
        </li>

        <Menu
          {...menuProps}
          ref={refOutsideClick}
          anchor={buttonRef.current as any}
          className='pagination-menu'
          isOpen={open}
        >
          <ul>
            {items.map((page) => (
              <PaginationItem
                ref={(el) => (pageRefs.current[page] = el)}
                className='menu-item'
                key={page}
                page={page}
                component={component}
                active={page === currentPage}
                isMenuItem
                {...(component !== 'button'
                  ? { href: generateHref?.(page) || '#', onClick: () => handleClick(page) }
                  : { onClick: () => handleClick(page) })}
                {...componentProps}
              />
            ))}
          </ul>
        </Menu>
      </>
    );
  }
);

PaginationMenu.displayName = 'PaginationMenu';
