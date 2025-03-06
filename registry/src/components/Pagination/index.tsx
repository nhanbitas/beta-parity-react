import * as React from 'react';
import './index.css';
import './variables.css';
import classNames from 'classnames';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  totalPage?: number;
  pageSize?: number;
  currentPage?: number;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ className, totalPage = 0, pageSize = 0, currentPage, ...props }, ref) => {
    console.log('rerender');
    console.log(currentPage);
    return (
      <div ref={ref} className={classNames('pagination', className)} role='navigation' {...props}>
        <button aria-label='Go to First Page' className='pagination-item pagination-start'>
          <ChevronsLeft />
        </button>
        <button aria-label='Go to Previous Page' className='pagination-item pagination-prev'>
          <ChevronLeft />
        </button>

        {Array(totalPage)
          .fill('_')
          .map((_, index) => (
            <a
              key={index}
              className={classNames('pagination-item', { active: index + 1 === currentPage })}
              href={`?page=${index + 1}`}
              aria-current={index + 1 === currentPage ? 'page' : undefined}
            >
              {index + 1}
            </a>
          ))}

        <button aria-label='Go to Next Page' className='pagination-item pagination-next'>
          <ChevronRight />
        </button>
        <button aria-label='Go to Last Page' className='pagination-item pagination-end'>
          <ChevronsRight />
        </button>
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';
