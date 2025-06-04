'use client';

import { useSearchParams } from 'next/navigation';
import { Pagination } from 'beta-parity-react/ui/Pagination';
import React from 'react';
import Link from 'next/link';

type Props = any;

export const CustomPagination = (props: Props) => {
  const params = useSearchParams();
  const page = params.get('page') || '1';
  return (
    <div className='not-prose'>
      <Pagination page={Number(page)} totalPage={10} component={Link} to={(page) => `?page=${page}`} {...props} />
    </div>
  );
};
