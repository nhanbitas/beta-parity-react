'use client';
import { BreadcrumbItem, Breadcrumb } from 'beta-parity-react/ui/Breadcrumb';
import React from 'react';

type Props = {};

export const BreadcrumbBasicSlashNeutral = (props: Props) => {
  return (
    <div className='not-prose'>
      <Breadcrumb separator='slash' color='neutral' {...props}>
        <BreadcrumbItem href='#home'>Home</BreadcrumbItem>
        <BreadcrumbItem href='#docs'>Docs</BreadcrumbItem>
        <BreadcrumbItem href='#components'>Components</BreadcrumbItem>
        <BreadcrumbItem href='#breadcrumb'>Breadcrumb</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};
