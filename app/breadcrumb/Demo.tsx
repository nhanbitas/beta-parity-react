import { BreadcrumbItem, Breadcrumb } from '@libComponents/Breadcrumb';
import React from 'react';

type Props = {};

export const DemoBreadcrumbBasic = (props: Props) => {
  return (
    <div className='flex flex-col gap-4'>
      <Breadcrumb {...props}>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Docs</BreadcrumbItem>
        <BreadcrumbItem>Components</BreadcrumbItem>
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};
