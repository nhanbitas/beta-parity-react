import * as React from 'react';
import './index.css';
import './variables.css';
import classNames from 'classnames';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  totalPage?: number;
  pageSize?: number;
  page?: number;
  bordered?: boolean;
  onlyControl?: boolean;
  color?: 'neutral' | 'accent';
  boundaries?: number;
  onPageChange?: (page: number) => void;
  component: 'button' | 'a' | React.ComponentType<any>;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      className,
      totalPage = 0,
      pageSize = 0,
      page,
      bordered = false,
      onlyControl = false,
      color = 'neutral',
      boundaries = 1,
      onPageChange,
      component = 'button',
      ...props
    },
    ref
  ) => {
    const PaginationItem = component as any;
    const [currentPage, setCurrentPage] = React.useState(page || 1);

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

    React.useEffect(() => {
      setCurrentPage(page || 1);
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
        <button
          aria-label='Go to First Page'
          className='pagination-item pagination-start'
          onClick={() => handleControlClick('start')}
          disabled={currentPage === 1}
        >
          <ChevronsLeft />
        </button>
        <button
          aria-label='Go to Previous Page'
          className='pagination-item pagination-prev'
          onClick={() => handleControlClick('prev')}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </button>

        {Array(totalPage)
          .fill('_')
          .map((_, index) => (
            <PaginationItem
              key={index}
              className={classNames('pagination-item', { active: index + 1 === currentPage })}
              {...(component === 'a'
                ? { href: '#', onClick: () => handlePageChange(index + 1) }
                : { onClick: () => handlePageChange(index + 1) })}
              aria-current={index + 1 === currentPage ? 'page' : undefined}
            >
              {index + 1}
            </PaginationItem>
          ))}

        <button
          aria-label='Go to Next Page'
          className='pagination-item pagination-next'
          onClick={() => handleControlClick('next')}
          disabled={currentPage === totalPage}
        >
          <ChevronRight />
        </button>
        <button
          aria-label='Go to Last Page'
          className='pagination-item pagination-end'
          onClick={() => handleControlClick('end')}
          disabled={currentPage === totalPage}
        >
          <ChevronsRight />
        </button>
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';
