'use client';

import React, { useState } from 'react';
import { Table, TableColumn, TableSearchInput, TablePagination } from '../../../registry/src/components/Table';

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
      title: 'ID',
      sortable: true
    },
    {
      key: 'name',
      title: 'Name',
      sortable: true
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
    <div className='demo-section'>
      <h2>Basic Table</h2>
      <Table data={data} columns={columns} title='Products' description='A simple table showing product data' />
    </div>
  );
};

export const AdvancedTable = () => {
  const allData = generateData(50);
  const [data, setData] = useState(allData);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
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
      width: 80,
      frozen: true,
      sortable: true,
      resizable: true
    },
    {
      key: 'name',
      title: 'Product Name',
      width: 200,
      sortable: true,
      resizable: true,
      frozen: true
    },
    {
      key: 'category',
      title: 'Category',
      width: 150,
      sortable: true,
      resizable: true
    },
    {
      key: 'price',
      title: 'Price ($)',
      width: 120,
      sortable: true,
      resizable: true,
      render: (value) => <span style={{ fontWeight: 'bold' }}>${value}</span>
    },
    {
      key: 'stock',
      title: 'In Stock',
      width: 120,
      sortable: true,
      resizable: true,
      render: (value) => (
        <span style={{ color: value < 10 ? 'red' : value < 30 ? 'orange' : 'green' }}>{value} units</span>
      )
    },
    {
      key: 'rating',
      title: 'Rating',
      width: 120,
      sortable: true,
      resizable: true,
      render: (value) => {
        const stars = '★'.repeat(Math.floor(value)) + '☆'.repeat(5 - Math.floor(value));
        return <span title={`${value}/5`}>{stars}</span>;
      }
    },
    {
      key: 'lastUpdated',
      title: 'Last Updated',
      width: 150,
      sortable: true,
      resizable: true
    }
  ];

  // Handle search
  const handleSearch = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);

    if (!value.trim()) {
      setData(allData);
      return;
    }

    const filtered = allData.filter((item) =>
      Object.values(item).some((val) => String(val).toLowerCase().includes(value.toLowerCase()))
    );

    setData(filtered);
  };

  // Handle sorting
  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortKey(key);
    setSortDirection(direction);
    console.log('sorting by', key, direction);
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
  };

  // Calculate paginated data
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Batch action handlers
  const handleDeleteSelected = () => {
    alert(`Deleting ${selectedRows.length} items`);
  };

  const handleExportSelected = () => {
    alert(`Exporting ${selectedRows.length} items`);
  };

  return (
    <div className='demo-section'>
      <h2>Advanced Table</h2>
      <Table
        data={paginatedData}
        columns={columns}
        title='Product Inventory'
        description='Complete inventory with advanced table features'
        selectable
        selectOnRowClick={false}
        maxHeight={400}
        onSelect={handleSelect}
        onSort={handleSort}
        sortKey={sortKey}
        sortDirection={sortDirection}
        actions={
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <TableSearchInput value={searchValue} onChange={handleSearch} placeholder='Search products...' />
            <button className='par-button'>Add Product</button>
          </div>
        }
        batchActions={
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className='par-button par-button-danger' onClick={handleDeleteSelected}>
              Delete Selected
            </button>
            <button className='par-button' onClick={handleExportSelected}>
              Export Selected
            </button>
          </div>
        }
        footer={
          <TablePagination
            currentPage={currentPage}
            pageSize={pageSize}
            total={data.length}
            onChange={setCurrentPage}
            pageSizeOptions={[5, 10, 20, 50]}
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
    </div>
  );
}
