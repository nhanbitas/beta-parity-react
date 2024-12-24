import { BreadcrumbItem, Breadcrumb } from '@libComponents/Breadcrumb';
import React from 'react';

type Props = {};

export const DemoBreadcrumbBasic = (props: Props) => {
  return (
    <div className='not-prose'>
      <Breadcrumb {...props}>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Docs</BreadcrumbItem>
        <BreadcrumbItem>Components</BreadcrumbItem>
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
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
    href: '#'
  },
  {
    children: 'Docs',
    href: '#'
  },
  {
    children: 'Components',
    href: '#'
  },
  {
    children: 'React',
    href: '#'
  },
  {
    children: 'Breadcrumb',
    href: '#'
  }
];
