'use client';
import React, { useState } from 'react';
import { Table, TableColumn, TablePagination } from 'beta-parity-react/ui/Table';
import { SearchInput } from 'beta-parity-react/ui/SearchInput';
import { Button } from 'beta-parity-react/ui/Button';
import { Download, Edit3, PenLine, Trash2 } from 'lucide-react';
import { Pagination } from 'beta-parity-react/ui/Pagination';

const generateData = (count: number) => {
  const categories = ['Electronics', 'Clothing', 'Food', 'Books'];
  return Array.from({ length: count }).map((_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
    category: categories[index % categories.length],
    price: ((index * 17) % 100) + 10,
    stock: (index * 13) % 100,
    rating: (((index * 7) % 50) / 10 + 1).toFixed(1),
    lastUpdated: new Date(2025, 0, ((index * 11) % 31) + 1).toISOString().split('T')[0]
  }));
};

export const AdvancedTable = () => {
  const allData = React.useMemo(() => generateData(1000), []);
  const [data, setData] = useState(allData);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortKey, setSortKey] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const columns: TableColumn[] = [
    { key: 'id', title: 'ID', width: 68, resizable: true, sortable: true },
    { key: 'name', title: 'PRODUCT NAME', sortable: true, resizable: true },
    { key: 'category', title: 'CATEGORY', sortable: true, resizable: true },
    {
      key: 'price',
      title: 'PRICE ($)',
      sortable: true,
      resizable: true,
      render: (value) => <span style={{ fontWeight: 'bold' }}>${value}</span>
    },
    {
      key: 'stock',
      title: 'IN STOCK',
      sortable: true,
      resizable: true,
      render: (value) => (
        <span style={{ color: value < 10 ? 'red' : value < 30 ? 'orange' : 'green' }}>{value} units</span>
      )
    },
    {
      key: 'rating',
      title: 'RATING',
      sortable: true,
      resizable: true,
      render: (value) => {
        const stars = '★'.repeat(Math.floor(value)) + '☆'.repeat(5 - Math.floor(value));
        return <span title={`${value}/5`}>{stars}</span>;
      }
    },
    { key: 'lastUpdated', title: 'LAST UPDATED', sortable: true, resizable: true }
  ];

  const clearSelection = () => setSelectedRows([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setCurrentPage(1);
    if (!event.target.value.trim()) {
      setData(allData);
      return;
    }
    const filtered = allData.filter((item) =>
      Object.values(item).some((val) => String(val).toLowerCase().includes(event.target.value.toLowerCase()))
    );
    setData(filtered);
  };

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortKey(key);
    setSortDirection(direction);
    const sortedData = [...data].sort((a, b) => {
      const valueA = a[key as keyof typeof a];
      const valueB = b[key as keyof typeof b];
      if (valueA === valueB) return 0;
      if (valueA == null) return 1;
      if (valueB == null) return -1;
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
      return direction === 'asc' ? (valueA < valueB ? -1 : 1) : valueA > valueB ? -1 : 1;
    });
    setData(sortedData);
  };

  const handleSelect = (selectedRows: any[]) => {
    setSelectedRows(selectedRows);
    console.log('Selected rows:', selectedRows);
  };

  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleBatchAction = (text: string) => {
    const result = confirm(`Are you sure you want to ${text} the selected items?`);
    if (result) {
      clearSelection();
      alert(`Selected items ${text} successfully!`);
    } else {
      alert(`Cancelled ${text} action.`);
    }
  };

  return (
    <div className='demo-section not-prose'>
      <Table
        data={paginatedData}
        columns={columns}
        title='Product Inventory'
        description='Complete inventory with advanced table features'
        selectable
        selectOnRowClick={true}
        freezeColumns={3}
        maxHeight={400}
        selectedRows={selectedRows}
        onSelect={handleSelect}
        onSort={handleSort}
        sortKey={sortKey}
        sortDirection={sortDirection}
        actions={
          <div className='flex w-full items-center justify-between'>
            <div className='w-1/4'>
              <SearchInput
                value={searchValue}
                onChange={handleSearch}
                placeholder='Search products...'
                theme='alternative'
              />
            </div>
            <div className='flex gap-2'>
              <Button kind='glass' iconOnly>
                <Download />
              </Button>
              <Button kind='glass' iconOnly>
                <PenLine />
              </Button>
              <Button>Create</Button>
            </div>
          </div>
        }
        batchActions={
          <div className='flex w-fit items-center justify-between gap-2'>
            <Button onClick={() => handleBatchAction('edit')} kind='ghost'>
              Edit <Edit3 className='ml-1' />
            </Button>
            <Button onClick={() => handleBatchAction('export')} kind='ghost'>
              Export <Download className='ml-1' />
            </Button>
            <Button onClick={() => handleBatchAction('delete')} kind='ghost'>
              Delete <Trash2 className='ml-1' />
            </Button>
            <div className='h-6 w-px bg-[var(--par-color-text-button-ghost-neutral-enabled)]'></div>
            <Button onClick={() => clearSelection()} kind='ghost'>
              Cancel
            </Button>
          </div>
        }
        footer={
          <div className='flex w-full items-center justify-between'>
            <TablePagination
              currentPage={currentPage}
              pageSize={pageSize}
              total={data.length}
              pageSizeOptions={[5, 10, 20, 50, 100]}
              onPageSizeChange={setPageSize}
            />
            <Pagination
              page={currentPage}
              totalPage={Math.ceil(data.length / pageSize)}
              onPageChange={setCurrentPage}
            />
          </div>
        }
        emptyState={undefined}
      />
    </div>
  );
};
