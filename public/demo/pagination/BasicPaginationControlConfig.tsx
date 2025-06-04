// Auto-generated demo for BasicPagination with controlConfig
'use client';
import { useRouter } from 'next/navigation';
import { Pagination } from 'beta-parity-react/ui/Pagination';
import React from 'react';
type Props = any;
export const BasicPaginationControlConfig = (props: Props) => {
  const router = useRouter();
  const currentPage = 1;
  const [page, setPage] = React.useState(Number(currentPage));
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  return (
    <div className='not-prose'>
      <Pagination
        page={page}
        totalPage={5}
        controlConfig={{
          next: { icon: 'next' },
          prev: { icon: 'prev' },
          first: { isActive: false },
          last: { isActive: false }
        }}
        onPageChange={handlePageChange}
        {...props}
      />
    </div>
  );
};
