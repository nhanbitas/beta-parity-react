import * as React from 'react';
import './index.css';
import './variables.css';
import classNames from 'classnames';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Menu, MenuProps } from '../Menu';
import { useOutsideClick } from '../hooks/useOutsideClick';
import useCombinedRefs from '../hooks/useCombinedRefs';

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  totalPage?: number;
  pageSize?: number;
  page?: number;
  bordered?: boolean;
  onlyControl?: boolean;
  color?: 'neutral' | 'accent';

  // nghiên cứu lại rules sử dụng chung với totalPage
  // bật/tắt 4 nút start/end
  // only control
  siblings?: number;
  onPageChange?: (page: number) => void;
  component?: 'button' | 'a' | React.ComponentType;
  componentProps?: Record<string, any>;
  renderItem: (props: PaginationItemProps) => React.ReactNode;
  renderControl: (props: ControlButtonProps) => React.ReactNode;
  to?: (page: number) => string;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      className,
      totalPage = 0,
      siblings = 0,
      pageSize = 0,
      page = 1,
      bordered = false,
      onlyControl = false,
      color = 'neutral',
      component: Component = 'button',
      componentProps,
      onPageChange,
      to: generateHref,
      ...props
    },
    ref
  ) => {
    const [currentPage, setCurrentPage] = React.useState(page);

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

    const controlProps = {
      start: {
        onClick: () => handleControlClick('start'),
        disabled: currentPage === 1,
        'aria-label': 'Go to First Page',
        ...(Component !== 'button' && { href: generateHref?.(1) || '#' })
      },
      prev: {
        onClick: () => handleControlClick('prev'),
        disabled: currentPage === 1,
        'aria-label': 'Go to Previous Page',
        ...(Component !== 'button' && { href: generateHref?.(currentPage - 1) || '#' })
      },
      next: {
        onClick: () => handleControlClick('next'),
        disabled: currentPage === totalPage,
        'aria-label': 'Go to Next Page',
        ...(Component !== 'button' && { href: generateHref?.(currentPage + 1) || '#' })
      },
      end: {
        onClick: () => handleControlClick('end'),
        disabled: currentPage === totalPage,
        'aria-label': 'Go to Last Page',
        ...(Component !== 'button' && { href: generateHref?.(totalPage) || '#' })
      }
    };

    const items = Array.from({ length: totalPage }, (_, index) => index + 1);

    // get middle active, ensure 1 < index < items.length -2 ( 0 is first => plus 1 for start of array, items.length - 1 is last => minus 1 for end of array)
    const middleIndex = Math.min(items.length - 1 - siblings - 1, Math.max(siblings + 1, currentPage - 1));
    const paginationParts = {
      firstItems: items.slice(0, 1),
      preMenuItems: items.slice(1, middleIndex - siblings),
      preActiveItems: items.slice(middleIndex - siblings, middleIndex),
      middleItems: items[middleIndex] ? [items[middleIndex]] : [],
      postActiveItems: items.slice(middleIndex + 1, middleIndex + 1 + siblings),
      postMenuItems: items.slice(middleIndex + siblings + 1, items.length - 1),
      lastItems: items.slice(-1)
    };

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
        <ControlButton className=' pagination-start' component={Component} {...controlProps.start}>
          <ChevronsLeft />
        </ControlButton>

        {bordered && <div className='pagination-separator'></div>}

        <ControlButton className=' pagination-prev' component={Component} {...controlProps.prev}>
          <ChevronLeft />
        </ControlButton>

        {bordered && <div className='pagination-separator'></div>}

        {items.length === 1 ? (
          <RenderItem items={paginationParts.firstItems} flag='firstItems' {...renderProps} />
        ) : (
          <>
            <RenderItem items={paginationParts.firstItems} flag='firstItems' {...renderProps} />
            <RenderItem items={paginationParts.preMenuItems} flag='preMenuItems' {...renderProps} isMenu />

            <RenderItem items={paginationParts.preActiveItems} flag='preActiveItems' {...renderProps} />
            <RenderItem items={paginationParts.middleItems} flag='activeItems' {...renderProps} />
            <RenderItem items={paginationParts.postActiveItems} flag='postActiveItems' {...renderProps} />

            <RenderItem items={paginationParts.postMenuItems} flag='postMenuItems' {...renderProps} isMenu />
            <RenderItem items={paginationParts.lastItems} flag='lastItems' {...renderProps} />
          </>
        )}

        <ControlButton className='pagination-next' component={Component} {...controlProps.next}>
          <ChevronRight />
        </ControlButton>

        {bordered && <div className='pagination-separator'></div>}

        <ControlButton className='pagination-end' component={Component} {...controlProps.end}>
          <ChevronsRight />
        </ControlButton>
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
  console.log(flag, ':', items);
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
