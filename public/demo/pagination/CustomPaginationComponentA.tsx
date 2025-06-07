// Auto-generated demo for CustomPagination with component='a', totalPage=5
'use client';

import { Pagination } from 'beta-parity-react/ui/Pagination';
import React from 'react';

type Props = any;

export const CustomPaginationComponentA = (props: Props) => {
  const [page, setPage] = React.useState(1);
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  return (
    <div className='not-prose'>
      <Pagination page={page} totalPage={5} component='a' onPageChange={handlePageChange} {...props} />
    </div>
  );
};
