import * as React from 'react';
import './index.css';
import './variables.css';
import classNames from 'classnames';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Menu, MenuProps } from '../Menu';
import { useOutsideClick } from '../hooks/useOutsideClick';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { deepMerge } from '../utils';

// TODO: wrapper by unordered list and move separator to inside li

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
export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
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

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
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
    const [currentPage, setCurrentPage] = React.useState<number>(page);

    const updatedControlConfig = deepMerge(
      defaultControlConfig as controlConfigType,
      controlConfig as controlConfigType
    );

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      onPageChange?.(page);
    };

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

    // define all props for ControlButtons
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

    const items = Array.from({ length: totalPage }, (_, index) => index + 1);
    // get middle active, ensure 2 < index < items.length - 3 ( 0 is first => plus 1 for start of array, items.length - 1 is last => minus 1 for end of array)
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

    // define all props for RenderItems
    const renderProps = {
      currentPage,
      handlePageChange,
      component: Component,
      bordered,
      componentProps,
      generateHref
    };

    React.useEffect(() => {
      setCurrentPage(page);
    }, [page]);

    return (
      <div
        ref={ref}
        className={classNames('pagination', className, color, {
          bordered: bordered,
          'only-control': onlyControl
        })}
        role='navigation'
        {...props}
      >
        {updatedControlConfig.first?.isActive && (
          <>
            <ControlButton component={Component} {...controlProps.start} />
            {bordered && <div className='pagination-separator'></div>}
          </>
        )}

        {updatedControlConfig.prev?.isActive && (
          <>
            <ControlButton component={Component} {...controlProps.prev} />
            {bordered && <div className='pagination-separator'></div>}
          </>
        )}

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

        {updatedControlConfig.next?.isActive && (
          <>
            <ControlButton component={Component} {...controlProps.next} />
            {/* is not show separator if bordered is false and the last control is not active */}
            {bordered && updatedControlConfig.last?.isActive && <div className='pagination-separator'></div>}
          </>
        )}

        {updatedControlConfig.last?.isActive && (
          <>
            <ControlButton component={Component} {...controlProps.end} />
          </>
        )}
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';

export interface PaginationItemProps extends React.HTMLAttributes<HTMLElement>, Pick<PaginationProps, 'component'> {
  page: number;
  active?: boolean;
}

export const PaginationItem = React.forwardRef<HTMLElement, PaginationItemProps>(
  ({ className, component: Component = 'button', page, active = false, ...props }, ref) => {
    return (
      <Component
        ref={ref as any}
        aria-label={`Go to Page ${page}`}
        className={classNames('pagination-item', className, { active: active })}
        aria-current={active ? 'page' : undefined}
        {...props}
      >
        <span className='pagination-page-number'>{page}</span>
      </Component>
    );
  }
);

PaginationItem.displayName = 'PaginationItem';

export interface ControlButtonProps extends React.HTMLAttributes<HTMLElement>, Pick<PaginationProps, 'component'> {
  disabled?: boolean;
}

export const ControlButton = React.forwardRef<HTMLElement, ControlButtonProps>(
  ({ className, component = 'button', children, disabled = false, ...props }, ref) => {
    const Component = disabled ? 'button' : component;
    return (
      <Component ref={ref as any} disabled={disabled} className={classNames('pagination-item', className)} {...props}>
        {children}
      </Component>
    );
  }
);

ControlButton.displayName = 'ControlButton';

type renderProps = {
  items: number[];
  currentPage: number;
  handlePageChange: (page: number) => void;
  component: 'button' | 'a' | React.ComponentType;
  bordered: boolean;
  componentProps?: any;
  generateHref?: (page: number) => string;
  flag?: string;
  isMenu?: boolean;
};

const RenderItem = ({
  items,
  currentPage,
  handlePageChange,
  component,
  bordered,
  componentProps,
  generateHref,
  flag,
  isMenu = false
}: renderProps) => {
  if (!items || items.length === 0) return null;

  if (isMenu) {
    return (
      <PaginationMenu
        items={items}
        component={component}
        componentProps={componentProps}
        generateHref={generateHref}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
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
          component={component}
          page={page}
          active={page === currentPage}
          {...(component !== 'button'
            ? { href: generateHref?.(page) || '#', onClick: () => handlePageChange(page) }
            : { onClick: () => handlePageChange(page) })}
          {...componentProps}
        />

        {bordered && <div className='pagination-separator'></div>}
      </React.Fragment>
    );
  });
};

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
      generateHref,
      currentPage,
      handlePageChange,
      bordered,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const conbineButtonRef = useCombinedRefs(buttonRef, ref);

    const refOutsideClick = useOutsideClick(() => setOpen(false), ['click', 'touchstart']);

    React.useEffect(() => {
      const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false);
        }
      };

      window.addEventListener('keydown', handleGlobalKeyDown);
      return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, []);

    return (
      <>
        <button
          ref={conbineButtonRef}
          className={classNames('pagination-item', className, { active: items.includes(currentPage) })}
          onClick={() => setOpen(true)}
          {...props}
        >
          ...
        </button>
        {bordered && <div className='pagination-separator'></div>}

        <Menu
          {...menuProps}
          ref={refOutsideClick}
          anchor={buttonRef.current as any}
          className='pagination-menu'
          isOpen={open}
        >
          {items.map((page) => (
            <PaginationItem
              className='menu-item'
              key={page}
              page={page}
              component={component}
              active={page === currentPage}
              {...(component !== 'button'
                ? { href: generateHref?.(page) || '#', onClick: () => handlePageChange(page) }
                : { onClick: () => handlePageChange(page) })}
              {...componentProps}
            />
          ))}
        </Menu>
      </>
    );
  }
);

PaginationMenu.displayName = 'PaginationMenu';
