'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from 'beta-parity-react/ui/Pagination';
import React from 'react';
import Link from 'next/link';

type Props = any;

export const DemoBasicPagination = (props: Props) => {
  const router = useRouter();
  const currentPage = 1;

  const [page, setPage] = React.useState(Number(currentPage));

  const handlePageChange = (page: number) => {
    // router.push(`?page=${page}`);
    setPage(page);
  };

  return (
    <div className='not-prose'>
      <Pagination pageSize={5} page={page} totalPage={10} onPageChange={handlePageChange} {...props} />
    </div>
  );
};

export const DemoCustomPagination = (props: Props) => {
  const params = useSearchParams();
  const page = params.get('page') || '1';
  return (
    <div className='not-prose'>
      <Pagination
        pageSize={5}
        page={Number(page)}
        totalPage={10}
        component={Link}
        to={(page) => `?page=${page}`}
        {...props}
      />
    </div>
  );
};
