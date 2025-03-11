import * as React from 'react';
import './index.css';
import './variables.css';
import classNames from 'classnames';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

// ** TODO: Controls as links

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  totalPage?: number;
  pageSize?: number;
  page?: number;
  bordered?: boolean;
  onlyControl?: boolean;
  color?: 'neutral' | 'accent';
  boundaries?: number;
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
      pageSize = 0,
      page = 1,
      bordered = false,
      onlyControl = false,
      color = 'neutral',
      boundaries = 1,
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

        {Array(totalPage)
          .fill('_')
          .map((_, index) => {
            const page = index + 1;
            return (
              <React.Fragment key={`page-${index}`}>
                <PaginationItem
                  component={Component}
                  page={page}
                  active={page === currentPage}
                  {...(Component !== 'button'
                    ? { href: generateHref?.(page) || '#', onClick: () => handlePageChange(page) }
                    : { onClick: () => handlePageChange(page) })}
                  {...componentProps}
                />

                {bordered && <div className='pagination-separator'></div>}
              </React.Fragment>
            );
          })}

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
