'use client';

import { BreadcrumbItem, Breadcrumb } from '@libComponents/Breadcrumb';
import React from 'react';

type Props = {};

export const DemoBreadcrumbBasic = (props: Props) => {
  return (
    <div className='not-prose'>
      <Breadcrumb {...props}>
        <BreadcrumbItem href='#home'>Home</BreadcrumbItem>
        <BreadcrumbItem href='#docs'>Docs</BreadcrumbItem>
        <BreadcrumbItem href='#components'>Components</BreadcrumbItem>
        <BreadcrumbItem href='#breadcrumb'>Breadcrumb</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

export const DemoBreadcrumbList = (props: Props) => {
  return (
    <div className='not-prose'>
      <Breadcrumb breadcrumbList={mockItems} {...props} />
    </div>
  );
};

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
