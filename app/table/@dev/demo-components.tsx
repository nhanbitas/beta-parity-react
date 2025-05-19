'use client';

import React, { useState } from 'react';
import { Table, TableColumn, TablePagination } from 'beta-parity-react/ui/Table';
import { SearchInput } from 'beta-parity-react/ui/SearchInput';
import { Button } from 'beta-parity-react/ui/Button';

// Sample data for the table - using deterministic generation to avoid hydration mismatch
const generateData = (count: number) => {
  const categories = ['Electronics', 'Clothing', 'Food', 'Books'];

  return Array.from({ length: count }).map((_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
    category: categories[index % categories.length],
    price: ((index * 17) % 100) + 10, // Deterministic but varied prices
    stock: (index * 13) % 100, // Deterministic stock values
    rating: (((index * 7) % 50) / 10 + 1).toFixed(1), // Ratings between 1.0 and 6.0
    lastUpdated: new Date(2025, 0, ((index * 11) % 31) + 1).toISOString().split('T')[0] // Different dates in Jan 2025
  }));
};

export const BasicTable = () => {
  const data = generateData(5);

  // Define columns
  const columns: TableColumn[] = [
    {
      key: 'id',
      title: 'ID'
    },
    {
      key: 'name',
      title: 'Name'
    },
    {
      key: 'category',
      title: 'Category'
    },
    {
      key: 'price',
      title: 'Price',
      render: (value) => `$${value}`
    },
    {
      key: 'stock',
      title: 'Stock'
    }
  ];

  return (
    <div className='demo-section not-prose'>
      <h2>Basic Table</h2>
      <Table
        data={data}
        columns={columns}
        showRowCount={false}
        title='Products'
        description='A simple table showing product data'
      />
    </div>
  );
};

export const AdvancedTable = () => {
  const allData = React.useMemo(() => generateData(1000), []);
  const [data, setData] = useState(allData);
  const [selectedRows, setSelectedRows] = useState<any[]>([{ id: 1 }, { id: 3 }]); // Pre-select some rows for demo
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortKey, setSortKey] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Define columns with more features
  const columns: TableColumn[] = [
    {
      key: 'id',
      title: 'ID',
      width: 68,
      resizable: true,
      sortable: true
    },
    {
      key: 'name',
      title: 'PRODUCT NAME',
      sortable: true,
      resizable: true
    },
    {
      key: 'category',
      title: 'CATEGORY',
      sortable: true,
      resizable: true
    },
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
    {
      key: 'lastUpdated',
      title: 'LAST UPDATED',
      sortable: true,
      resizable: true
    }
  ];

  const handleClearSeclection = () => setSelectedRows([]);

  // Handle search
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

  // Handle sorting
  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortKey(key);
    setSortDirection(direction);
    const sortedData = [...data].sort((a, b) => {
      // Using type-safe approach to compare values
      const valueA = a[key as keyof typeof a];
      const valueB = b[key as keyof typeof b];

      // Handle different value types (string, number, date)
      if (valueA === valueB) return 0;

      if (valueA == null) return 1;
      if (valueB == null) return -1;

      // Compare based on value type
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }

      // For numbers and other comparable types
      return direction === 'asc' ? (valueA < valueB ? -1 : 1) : valueA > valueB ? -1 : 1;
    });

    setData(sortedData);
  };

  // Handle row selection
  const handleSelect = (selectedRows: any[]) => {
    setSelectedRows(selectedRows);
    console.log('Selected rows:', selectedRows);
  };

  // Calculate paginated data
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Batch action handlers
  const handleDeleteSelected = () => {
    alert(`Deleting ${selectedRows.length} items`);
    handleClearSeclection();
    console.log('Deleting items:', selectedRows);
  };

  const handleExportSelected = () => {
    alert(`Exporting ${selectedRows.length} items`);
    handleClearSeclection();
    console.log('Exporting items:', selectedRows);
  };

  return (
    <div className='demo-section not-prose'>
      <h2>Advanced Table</h2>
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
              <SearchInput value={searchValue} onChange={handleSearch} placeholder='Search products...' />
            </div>
            <Button className='par-button'>Add Product</Button>
          </div>
        }
        batchActions={
          <div className='flex w-fit items-center justify-between gap-2'>
            <Button onClick={handleDeleteSelected} color='adverse'>
              Delete
            </Button>
            <Button onClick={handleExportSelected}>Export</Button>
          </div>
        }
        footer={
          <TablePagination
            currentPage={currentPage}
            pageSize={pageSize}
            total={data.length}
            onChange={(page) => {
              setCurrentPage(page);
              handleClearSeclection();
            }}
            pageSizeOptions={[5, 10, 20, 50, 100]}
            onPageSizeChange={setPageSize}
          />
        }
        emptyState={
          <div style={{ padding: '32px', textAlign: 'center' }}>
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        }
      />
    </div>
  );
};

export function TableDemos() {
  return (
    <div className='table-demos not-prose'>
      <BasicTable />
      <div style={{ height: '32px' }} />
      <AdvancedTable />
      <div style={{ height: '32px' }} />
    </div>
  );
}
