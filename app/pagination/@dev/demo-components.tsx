'use client';

import { useSearchParams } from 'next/navigation';
import { Pagination } from 'beta-parity-react/ui/Pagination';
import React from 'react';

type Props = any;

export const DemoBasicPagination = (props: Props) => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';

  const [page, setPage] = React.useState(Number(currentPage));

  return (
    <div className='not-prose'>
      <Pagination pageSize={10} page={page} totalPage={100} onPageChange={setPage} {...props} />
    </div>
  );
};
