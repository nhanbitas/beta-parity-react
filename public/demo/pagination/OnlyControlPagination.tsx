'use client';

import { Pagination } from 'beta-parity-react/ui/Pagination';
import React from 'react';

type Props = any;

export const OnlyControlPagination = (props: Props) => {
  const currentPage = 1;
  const [page, setPage] = React.useState(Number(currentPage));

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className='not-prose flex items-center gap-2'>
      <Pagination onlyControl page={page} totalPage={10} onPageChange={handlePageChange} {...props} />
      <p>Page: {page}</p>
    </div>
  );
};
