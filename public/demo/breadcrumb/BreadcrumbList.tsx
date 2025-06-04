'use client';
import { Breadcrumb } from 'beta-parity-react/ui/Breadcrumb';
import React from 'react';

const mockItems = [
  {
    children: 'Home',
    href: '#home'
  },
  {
    children: 'Docs',
    href: '#docs'
  },
  {
    children: 'Components',
    href: '#components'
  },
  {
    children: 'React',
    href: '#react'
  },
  {
    children: 'V.1.0',
    href: '#v-1-0'
  },
  {
    children: 'Breadcrumb',
    href: '#breadcrumb'
  }
];

type Props = {};

export const BreadcrumbList = (props: Props) => {
  return (
    <div className='not-prose'>
      <Breadcrumb breadcrumbList={mockItems} {...props} />
    </div>
  );
};
