'use client';
import React from 'react';
import { Table, TableColumn } from 'beta-parity-react/ui/Table';

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

export const BasicTable = () => {
  const data = generateData(5);
  const columns: TableColumn[] = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'category', title: 'Category' },
    { key: 'price', title: 'Price', render: (value) => `$${value}` },
    { key: 'stock', title: 'Stock' }
  ];
  return (
    <div className='demo-section not-prose'>
      <Table data={data} columns={columns} showRowCount={false} />
    </div>
  );
};
