'use client';

import { useRouter } from 'next/navigation';
import { Pagination } from 'beta-parity-react/ui/Pagination';
import React from 'react';

type Props = any;

export const BasicPagination = (props: Props) => {
  const router = useRouter();
  const currentPage = 1;
  const [page, setPage] = React.useState(Number(currentPage));

  const handlePageChange = (page: number) => {
    // router.push(`?page=${page}`);
    setPage(page);
  };

  return (
    <div className='not-prose'>
      <Pagination page={page} totalPage={10} onPageChange={handlePageChange} {...props} />
    </div>
  );
};
