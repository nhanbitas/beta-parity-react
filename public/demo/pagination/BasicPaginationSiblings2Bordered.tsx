// Auto-generated demo for BasicPagination with totalPage=20, siblings=2, bordered
'use client';
import { useRouter } from 'next/navigation';
import { Pagination } from 'beta-parity-react/ui/Pagination';
import React from 'react';
type Props = any;
export const BasicPaginationSiblings2Bordered = (props: Props) => {
  const router = useRouter();
  const currentPage = 1;
  const [page, setPage] = React.useState(Number(currentPage));
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  return (
    <div className='not-prose'>
      <Pagination page={page} totalPage={20} siblings={2} bordered onPageChange={handlePageChange} {...props} />
    </div>
  );
};
